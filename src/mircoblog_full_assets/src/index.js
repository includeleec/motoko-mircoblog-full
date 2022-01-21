import { createActor, canisterId, microblog } from "../../declarations/microblog";
import {
  siblings
} from "./utils";

function InitMicroblog(cid) {
  let mb = microblog;
  if(cid) {
    mb = createActor(cid);
  }
  return mb;
}

async function getBlogName() {
  // let blogName = await microblog.get_name();
  return await microblog.get_name();
}

async function getPosts(cid) {
  let mb = InitMicroblog(cid);


  let posts = await mb.posts(0);
  console.log('posts', posts);
  return posts;
}

async function loadBlogName() {
  let blogName = await getBlogName();
  // console.log({blogName})
  document.getElementById("blog-name").innerText = blogName;
  document.getElementById("my-blog-name").innerText = blogName;
}

async function loadBlogCanisterID() {
  document.getElementById("my-blog-cid").innerText = canisterId;
}


async function loadPosts(cid) {
  try {
    let posts = await getPosts(cid);
    let postsTable = document
      .getElementById("posts-tbody");

    // let postsTableRows = postsTable.rows.length;

    // console.log(postsTableRows, posts.length)

    // if(postsTableRows >= posts.length) {
    //    return;
    // }
    postsTable.innerHTML = "";

    for (let i=0; i<posts.length; i++) {
      let row = postsTable.insertRow(-1);
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      let cell3 = row.insertCell(2);

      let post = posts[i];

      let time = dayjs(Number(post.time / 1000000n))
      // console.log({time})
      cell1.innerHTML = post.author;
      cell2.innerHTML = post.text;
      cell3.innerHTML = time.toDate()
    }

    
  } catch (err) {
    console.log(err);
  }
}

async function submitPost(e) {
  document.getElementById("form-alert").classList.add('hidden');

  e.preventDefault();
  const button = document.getElementById("post-btn");

  const message = document.getElementById("message").value.toString();
  const author = document.getElementById("author").value.toString();

  if(message === "" || author === "") {
    window.alert("message, author can't empty!");
    return;
  }

  button.setAttribute("disabled", true);

  // get current blog canister id

  let blogTabs = document.getElementById("blog-tabs").children;
  let cid;
  for(let bt of blogTabs) {
    if(bt.classList.contains("tab-active")) {
      cid = bt.getAttribute("data-pid");
    }
  }

  console.log(cid);


  // return;

  let mb = InitMicroblog(cid);

  await mb.post(message, author);

  button.removeAttribute("disabled");

  document.getElementById("form-alert").classList.remove('hidden');


  // clear input
  document.getElementById("message").value = "";
  document.getElementById("author").value = "";

  // update posts
  loadPosts(cid);

  // update timeline
  loadTimeline(cid);

  return false;

}

async function follows() {
  let follows = await microblog.follows();
  console.log({follows});
  let followsFull = []
  for(let pid of follows) {
    let mb = createActor(pid);
    let blogName = await mb.get_name();
    followsFull.push({pid, blogName});

  }

  console.log({followsFull})

  return followsFull;

}

async function loadFollows() {
  let followFull = await follows();
  let blogTabs = document.getElementById("blog-tabs")

  for(let i=0; i<followFull.length; i++) {
    let follow = followFull[i]
    let div = document.createElement("a");
    div.classList.add("tab","tab-lifted");
    div.setAttribute("data-pid", follow.pid);
    div.innerText = follow.blogName;
    blogTabs.appendChild(div)

  }


}

async function getTimeline(cid) {
  let mb = InitMicroblog(cid);
  let timeline = await mb.timeline(0);
  console.log("timeline", timeline);
  return timeline;
}


async function loadTimeline(cid) {
  try {
    let timelines = await getTimeline(cid);
    let tbody = document
      .getElementById("timeline-tbody");

    // let postsTableRows = postsTable.rows.length;

    // console.log(postsTableRows, posts.length)

    // if(postsTableRows >= posts.length) {
    //    return;
    // }
    tbody.innerHTML = "";

    for (let i=0; i<timelines.length; i++) {
      let row = tbody.insertRow(-1);
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      let cell3 = row.insertCell(2);

      let timeline = timelines[i];

      let time = dayjs(Number(timeline.time / 1000000n))
      // console.log({time})
      cell1.innerHTML = timeline.author;
      cell2.innerHTML = timeline.text;
      cell3.innerHTML = time.toDate()
    }

    
  } catch (err) {
    console.log(err);
  }
}




async function load() {
  loadBlogCanisterID();
  loadBlogName();
  loadPosts();
  loadFollows();
  loadTimeline();

  // setInterval(loadPosts, 3000);
}

// load first
load();

// bind post botton
document
.getElementById("post-btn").addEventListener("click", submitPost);


function onClickBlogTab(e) {
  let dom = e.target;
  let pid = dom.getAttribute("data-pid");
  // console.log(e.target, pid);

  console.log(siblings(dom))
  for(let sb of siblings(dom)) {
    sb.classList.remove("tab-active");
  }
  dom.classList.add("tab-active");

  // load blog posts
  loadPosts(pid);


}

// bind blog tabs
document.getElementById("blog-tabs").addEventListener("click", onClickBlogTab)
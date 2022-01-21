// get all sibling nodes
export function siblings(elem) {
    // create an empty array
    let siblings = [];
  
    // if no parent, return empty list
    if (!elem.parentNode) {
        return siblings;
    }
  
    // first child of the parent node
    let sibling = elem.parentNode.firstElementChild;
  
    // loop through next siblings until `null`
    do {
        // push sibling to array
        if (sibling != elem) {
            siblings.push(sibling);
        }
    } while (sibling = sibling.nextElementSibling);
    
    return siblings;
  };
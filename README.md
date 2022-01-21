
dfx start
dfx deploy --no-wallet
dfx canister call microblog installer
dfx canister call microblog set_name "(\"leec's blog\")"
dfx canister call microblog get_name
dfx canister call microblog post "(\"first blog from microblog\",\"leec\")"
dfx canister call microblog post "(\"second blog from microblog\",\"alice\")"
dfx canister call microblog post "(\"thrid blog from microblog\",\"bob\")"
dfx canister call microblog posts "(0)"


dfx canister call microblog follow "(principal \"r7inp-6aaaa-aaaaa-aaabq-cai\")"
dfx canister call microblog2 set_name "(\"alice's blog\")"
dfx canister call microblog2 post "(\"1st post from alice's blog\",\"alice\")"
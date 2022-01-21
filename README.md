# Microblog


## local 

deploy
```
dfx start
dfx deploy --no-wallet

Installing code for canister microblog, with canister_id rwlgt-iiaaa-aaaaa-aaaaa-cai
Installing code for canister microblog2, with canister_id rrkah-fqaaa-aaaaa-aaaaq-cai
Installing code for canister microblog3, with canister_id ryjl3-tyaaa-aaaaa-aaaba-cai
```

test
```
dfx canister call microblog installer
dfx canister call microblog set_name "(\"leec's blog\")"
dfx canister call microblog get_name
dfx canister call microblog post "(\"1st blog from microblog\",\"leec\")"
dfx canister call microblog posts "(0)"

dfx canister call microblog follow "(principal \"rrkah-fqaaa-aaaaa-aaaaq-cai\")"
dfx canister call microblog follow "(principal \"ryjl3-tyaaa-aaaaa-aaaba-cai\")"

dfx canister call microblog2 set_name "(\"alice's blog\")"
dfx canister call microblog2 post "(\"1st post from alice's blog\",\"alice\")"

dfx canister call microblog3 set_name "(\"bob's blog\")"
dfx canister call microblog3 post "(\"1st post from bob's blog\",\"bob\")"
```


## ic network

deploy
```
dfx deploy --network ic

Installing code for canister microblog, with canister_id rmfb3-vaaaa-aaaai-qfjma-cai
Installing code for canister microblog2, with canister_id rchmt-oqaaa-aaaai-qfjna-cai
Installing code for canister microblog3, with canister_id rfgkh-diaaa-aaaai-qfjnq-cai
Installing code for canister microblog_full_assets, with canister_id rlehp-yyaaa-aaaai-qfjmq-cai

dfx canister --network ic call rmfb3-vaaaa-aaaai-qfjma-cai set_name "(\"leec's blog\")"
dfx canister --network ic call rchmt-oqaaa-aaaai-qfjna-cai set_name "(\"alice's blog\")"
dfx canister --network ic call rfgkh-diaaa-aaaai-qfjnq-cai set_name "(\"bob's blog\")"

dfx canister --network ic call rmfb3-vaaaa-aaaai-qfjma-cai follow "(principal \"rchmt-oqaaa-aaaai-qfjna-cai\")"
dfx canister --network ic call rmfb3-vaaaa-aaaai-qfjma-cai follow "(principal \"rfgkh-diaaa-aaaai-qfjnq-cai\")"

```
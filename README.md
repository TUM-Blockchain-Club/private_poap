# eth.b3rlin
eth.berlin 2022 repo of the TUM Blockchain Club
dfsa
# Run

### Collecting all your POAPs (DUNE)
In order to display all your POAPs you first need to collect them from your wallets. We do this by querying the token ids, which uniquely identify POAPs, from the DUNE database. We used the following query to get all POAP token ids that belong to a certain address: 
```sql
select
  "tokenId"
from
  erc721."ERC721_evt_Transfer"
where
  erc721."ERC721_evt_Transfer"."contract_address" =
  '\x22c1f6050e56d2876009903609a2cc3fef83b415'
  and 
  erc721."ERC721_evt_Transfer"."to" =
    CONCAT('\x', substring('{{Address}}' from 3):: bytea
```
You can test it for your own address at https://dune.com/queries/1279140


npm start
# eth.b3rlin 2022 - *Private POAP*
This repository holds the eth.berlin 2022 hackathon project of the TEAM *TUM Blockchain Club*. The project tackles POAP related privacy concerns and tries to improve way of collecting POAPs.

## How To
To use the prototypic *Private POAP* wallet you have to:
### Supply API keys
To have a working solution, you require API keys for the Dune and POAP APIs. Once received, supply your API keys to the *wallet.service.ts* file in the */poap-it/src/services/* directory.

### Setup
1. Load required packages
```bash
npm install
```

### Running the project
```bash
npm start
```

## Concept
[POAPs](https://poap.xyz) are a trend that gained large traction in the last couple of years of the crypto scene developments. These days, many events and booths on events allow visitors to mint a POAP in recognition of their presence. While that motivates people to move around and collect those NFTs, it also results in privacy related problems.

Overall, we see three dimensions of potential issues:
1. Link of identity and location based on people's Ethereum wallet address - possibly linked with ENS, UD or Twitter - and POAPs that indicate where they were at a certain point.
1. Link of relationships, based on POAPs' timestamp property, which allows to determine the likelihood of people to have a real-life relationship
1. Learning and forging profiles of identities based on POAP collection analytics and dusting attacks on publicly known Ethereum wallet addresses

## Design
The Private POAP PoC implements a four-step user-flow:
1. Initialize a HD wallet based on the BIP39 standard
1. Derive wallets by incrementing the Path property; determine empty Ethereum wallets with a POAP count of 0
   - [Dune Query](https://dune.com/queries/1279140)
1. Mint POAP via POAP API
   - [Claim GET](https://documentation.poap.tech/reference/getactionsclaim-qr-2) and [Claim POST](https://documentation.poap.tech/reference/postactionsclaim-qr-2)
1. Display POAP Collection based on used Ethereum wallet list
   - [Dune Query](https://dune.com/queries/1279140)

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
You can test it for your own address at [Dune Query](https://dune.com/queries/1279140)

## Outlook
1. POAP based communities with zkp of POAP ownership
2. Private POAP collection with curation feature

![TBC](tbc_logo.png)
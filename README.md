<div align="center">  
  <h1>Factory</h1>
</div>

Star Atlas Factory for constructing Transactions targeting Solana on-chain programs

This library is published to NPM: https://www.npmjs.com/package/@staratlas/factory

## Setup

```
nvm use

npm i
```

## Mainnet Pubkeys
Tokens:
* ATLAS: ATLASXmbPQxBUYbxPsV97usA3fPQYEqzQBUHgiFCUsXx
* POLIS: poLisWXnNRwC6oBu1vHiuKQzFjGL4XDSu4g9qjz9qVk'

Programs:
* Faction Enlistment: FACTNmq2FhA2QNTnGM2aWJH3i7zT3cND5CgvjYTjyVYe
* SCORE: FLEET1qqzpexyaDpqb2DGsSzE2sDCizewCg9WjrA6DBW
* Global Marketplace: traderDnaR5w6Tcoi3NFm53i48FTDNbGjBSZwWXDRrg
* DAO POLIS Locker (See Notes Below):
    * Proxy & Rewarder = gateVwTnKyFrE8nxUUgfzoZTPKgJQZUbLsEidpG4Dp2
    * Locked Voter = Lock7kBijGCQLEFAmXcengzXKA88iDNQPriQ7TbgeyG
    * Snapshot = snapNQkxsiqDWdbNfz8KVB7e3NPzLwtHHA6WV8kKgUc
* DAO ATLAS Locker: ATLocKpzDbTokxgvnLew3d7drZkEzLzDpzwgrgWKDbmc

R4: 
* ATMTA 'NPC' Sales account: NPCxfjPxh6pvRJbGbWZjxfkqWfGBvKkqPbtiJar3mom
* FUEL: fueL3hBZjLLLJHiFH9cqZoozTG3XQZ53diwFPwbzNim
* FOOD: foodQJAztMzX1DKpLaiounNe2BDMds5RNuPC6jsNrDG
* AMMO: ammoK8AkX2wnebQb35cDAZtTkvsXQbi82cGeTnUvvfK
* TOOL: tooLsNYLiVqzg8o4m3L2Uetbn62mvMWRqkog6PQeYKL

Canonical source of NFT metadata, including mints: https://galaxy.staratlas.com/nfts Pull this data to create maps of mints to asset names, for example. Can also be used to query token mint directly, e.g. https://galaxy.staratlas.com/nfts/BrzwWsG845VttbTsacZMLKhyc2jAZU12MaPkTYrJHoqm

## DAO POLIS Locker Notes:
The locked voter program is not meant to be called directly, all clients should use the proxy-rewarder (GATE) program to call proxy-lock, claim rewards, and exit. After any lock creation or update operation, clients must call the snapshot sync function to update the history accounts, else their pro rata rewards calculations will be incorrect. 


## Packages

| Package | Description | Version | Docs |
| :-- | :-- | :--| :-- |
| `@staratlas/factory` | TypeScript interface for Star Atlas programs | [![npm](https://img.shields.io/npm/v/@staratlas/factory.svg?color=blue)](https://www.npmjs.com/package/@staratlas/factory) | [![Docs](https://img.shields.io/badge/docs-typedoc-blue)](https://staratlasmeta.github.io/factory/index.html) |

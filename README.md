# Top Content

This project is built with Solidity and React. Project is on rinkeby testnet

### Features

- Content creator can upload file / image
- File gets stored into IPFS
- Other users can tip the content creator if they wish

### Run the app

- Clone this repo and run **npm install**
- Create a .env file at the root of the project and add **ALCHEMY_URL** and **PRIVATE_KEY**
- Grab ALCHEMY_URL from your alchemy a/c and PRIVATE_KEY from your metamask a/c and store in .env file
- Run **npx hardhat run scripts/deploy.js --network rinkeby**, copy the contract address from terminal and in App.js replace the existing contract address

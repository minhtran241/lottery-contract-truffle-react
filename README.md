<h3 align="center">Truffle and React.js - Lottery Contract</h3> <br>
<p align="center">
  <img alt="comet" src="https://user-images.githubusercontent.com/943555/35969146-a360d406-0d11-11e8-8224-2efdde6fb888.png" width="120">
</p>
<p align="center">Rapid Ethereum Dapp Development</p>

<p align="center">
  <img alt="made for ethereum" src="https://img.shields.io/badge/made_for-ethereum-771ea5.svg">
  <img alt="MIT license" src="https://img.shields.io/badge/license-MIT-blue.svg">
</p>

---

## Smart Contract Lottery Development with Create-React-App

How does this differ from the official React Truffle Box?

- **No ejection** required;
- **React frontend** is located in its own separate folder (i.e. `/client`);
- **Babel** is included so you can use ES6 module import statements;
- Uses **Truffle 5.6**
- Uses **Web3 1.6**

If you have Truffle installed, run the following to get started (more detailed instructions below):

---

**Note:** This Truffle project works by creating a symlink in the `client/src` directory to the `build/contracts` folder generated by Truffle compiled JSON files (i.e. when `truffle compile` is run). Because of this, we cannot support Windows machines at this time. Windows users can still use this Truffle box, but they will have to make the symlink themselves (as per the `link-contracts` npm script located inside `client/package.json`). If anyone can integrate Windows support for this project, feel free to discuss in the issues and submit a PR.

You can explore this contract on TESTNET Goerli (GTH) Blockchain Explorer (Etherscan) at [here](https://goerli.etherscan.io/address/0xDDb2acDeAfDdA6063ADF6D1D19ECe28F9c9A278D)

## Install Truffle globally

    ```
    npm install -g truffle
    ```

## Testing

First, make sure Ganache is running

    ```
    yarn ganache
    ```

Compile

    ```
    yarn compile
    ```

Run all tests

    ```
    yarn test
    ```

To run tests in a specific file, run

    ```
    yarn test [path/to/file]
    ```

Deploy by connecting to Infura node (specific provider)

**Note:** You have to set up all the environment variables before doing this step

    ```
    yarn deploy
    ```

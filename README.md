# PocDApp
## To run this project follow the steps below
First we'll need to instal dependencies for truffle template, angular and etherum-bridge

## 1 - Install dependencies for etherum-bridge
* $ cd etherum-bridge
* $ npm install

## 2 - Install dependencies for truffle template 
* $ cd ..
* $ cd src
* $ npm install

## 3 - Install dependencies for angular project
* $ cd dapp
* $ npm install

## 4 - Edit truffle.js file located in src folder to point to etherum node like Ganache geth or truffle develop. The code sample is below.
```javascript
    module.exports = {
        networks: {
            ganache: {
                host: "127.0.0.1",//your etherum node ip address
                port: 7545,//port where rpc is running on your etherum node
                network_id: "*"       
            }
        }
    }
```
## 5 - Run your etherun node, in my case i'm using ganache, the link to download ganache for windows is below
    [Downdload Ganache for windows](https://truffleframework.com/ganache)


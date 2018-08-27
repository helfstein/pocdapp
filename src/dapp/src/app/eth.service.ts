import { Injectable } from '@angular/core';
import * as Web3 from 'web3';
import * as TruffleContract from 'truffle-contract';

declare let require: any;
declare let window: any;
declare let web3: any;

const tokenAbi = require('../../../build/contracts/PocDapp.json');

@Injectable({
  providedIn: 'root'
})
export class EthService {
  private web3Provider: null;
  private contract: TruffleContract;
  private account: any;
  public callbackreceived: Function;
  public callbackValueSended: Function;

  constructor() {
    if (typeof window.web3 !== 'undefined') {
      this.web3Provider = window.web3.currentProvider;
    } else {
      this.web3Provider = new Web3["providers"].HttpProvider('http://localhost:7545'); // tslint:disable-line
    }
    const TWeb3: any = Web3;
    window.web3 = new TWeb3(this.web3Provider); // tslint:disable-line
    this.contract = TruffleContract(tokenAbi);
    this.contract.setProvider(this.web3Provider);
    this.getAccountInfo();
    this.addEventListeners();
  }

  private getAccountInfo() {
    const that = this;
    return new Promise((resolve, reject) => {
      web3.eth.getAccounts(function(err, accs) {
        if (err != null) {
          reject(err);
        }
        if (accs.length === 0) {
          reject('no accounts found');
        }
        that.account = accs[0];
        resolve(accs[0]);
      });
    });

  }

  getAccountBalance() {
    const that = this;
    return new Promise((resolve, reject) => {
      web3.eth.getAccounts(function(err, accs) {
        if (err != null) {
          reject(err);
        }
        if (accs.length === 0) {
          reject('no accounts found');
        }

        web3.eth.getBalance(accs[0], (err2, res) => {
          if (err2 === null) {
            resolve(parseFloat(web3.fromWei(res, 'ether').toString()).toFixed(8));
          } else {
            reject(err2);
          }
        });
      });


    });
  }

  private addEventListeners() {
    const that = this;
    this.contract.deployed().then(instance => {
      let CallbackReceived: any = instance.CallbackReceived({}, {fromBlock: 0, toBlock: 'latest'});
      let ValueSended: any = instance.ValueSended({}, {fromBlock: 0, toBlock: 'latest'});
      CallbackReceived.watch((err, result) => {
        if (!err && that.callbackreceived !== null) {
          that.callbackreceived(result.args.result);
        }
      });
      ValueSended.watch((err, result) => {
        if (!err && that.callbackValueSended !== null) {
          that.callbackValueSended(result);
        }
      });

    });
  }

  getBalance() {
    const that = this;
    return new Promise((resolve, reject) => {
      that.contract.deployed().then(instance => {
        return instance.getBalance.call( {from: that.account});
      }).then(function(value) {
        if (value) {
          return resolve(parseFloat(web3.fromWei(value, 'ether').toString()).toFixed(8));
        }
      }).catch(function(error) {
        console.log(error);

        return reject('Error in transferEther service call');
      });
    });
  }

  testar() {
    const that = this;
    return new Promise((resolve, reject) => {
      that.contract.deployed().then(instance => {
        return instance.refreshEthPrice({
          from: that.account,
          value: web3.toWei('1', 'ether')
        });
      }).then(function(value) {
        if (value) {
          return resolve(value);
        }
      }).catch(function(error) {
        console.log(error);

        return reject('Error in transferEther service call');
      });
    });
  }


}

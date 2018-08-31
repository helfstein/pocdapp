import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
  public etherPrice: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public dappBalance: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public accountBalance: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() {

    if (typeof window.web3 !== 'undefined') {
      this.web3Provider = window.web3.currentProvider;
    } else {
      this.web3Provider = new Web3["providers"].HttpProvider('http://localhost:7545');
    }
    const TWeb3: any = Web3;
    window.web3 = new TWeb3(this.web3Provider);
    this.contract = TruffleContract(tokenAbi);
    this.contract.setProvider(this.web3Provider);



    this.getAccountInfo();
    this.addEventListeners();
  }

  private getAccountInfo() {
    const self = this;
    return new Promise((resolve, reject) => {
      web3.eth.getAccounts(function(err, accs) {
        if (err != null) {
          return reject(err);
        }
        if (accs.length === 0) {
          return reject('no accounts found');
        }
        self.account = accs[0];
        return resolve(accs[0]);
      });
    });

  }

  getAccountBalance() {

    return new Promise((resolve, reject) => {
      web3.eth.getAccounts(function(err, accs) {
        if (err != null) {
          return reject(err);
        }
        if (accs.length === 0) {
          return reject('no accounts found');
        }

        web3.eth.getBalance(accs[0], (err2, res) => {
          if (err2 === null) {
            return resolve(parseFloat(web3.fromWei(res, 'ether').toString()).toFixed(8));
          } else {
            return reject(err2);
          }
        });
      });


    });
  }

  private addEventListeners() {
      const self = this;
      this.contract.deployed().then(instance => {

      const CallbackReceived: any = instance.CallbackReceived({}, {fromBlock: 0, toBlock: 'latest'});

      CallbackReceived.watch((err, result) => {
        if (!err) {
          const res: string = result.args.result.toString();
          self.etherPrice.next(res);
        }
      });

    });
  }

  getBalance() {
    const self = this;
    return new Promise((resolve, reject) => {
      self.contract.deployed().then(instance => {
        return instance.getBalance.call( {from: self.account});
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
    const self = this;
    return new Promise((resolve, reject) => {
      self.contract.deployed().then(instance => {
        return instance.refreshEthPrice({
          from: self.account,
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

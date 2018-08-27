import { Component } from '@angular/core';
import { EthService } from './eth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  accounts: any;
  accountBalance: any = '........';
  etherPrice: any = '.......';
  dappBalance: any = 0;

  constructor(private ethcontractService: EthService) {
    const that = this;
    this.ethcontractService.callbackreceived = (result) => {
      //console.log('Resultado Callback');
      that.etherPrice = result;

    };
    this.ethcontractService.callbackValueSended = (result) => {
      //console.log('Resultado Callback');
      //console.log(result);
    };
    this.initDisplay();
  }

  initDisplay() {
    const self = this;
    this.ethcontractService.getBalance().then(function(balance) {
      self.dappBalance = balance;
    }).catch(function(error) {
      console.log(error);
    });
    this.ethcontractService.getAccountBalance().then(function(balance) {
      self.accountBalance = balance;
    }).catch(function(error) {
      console.log(error);
    });

  }
  testar(event) {
    const self = this;
    this.ethcontractService.testar().then(function(status) {
      console.log(status);
      self.initDisplay();
    }).catch(function(error) {
      console.log(error);
    });
  }

}

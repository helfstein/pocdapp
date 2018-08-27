# How to use Ethereum-Bridge

## 1. Add Oraclize to Truffle

  * $ truffle install oraclize-api
  * $ truffle develop

## 2. Creating a Ethereum-Bridge project in your local machine

  * $ mkdir ethereum-bridge
  
  * $ git clone https://github.com/oraclize/ethereum-bridge ethereum-bridge
  
  * $ cd ethereum-bridge
  
  * $ npm install

## 3. Run Ethereum-Bridge

	_node bridge -a 9 to start_ (-a 9 argument is to reference the account where you are going to deploy the Oraclize contract)
	
  ### In case it doesn't find the ethereum node, make sure that you informe the right host (-H) and port (-p) argument
	_node bridge -a 9 -H 127.0.0.1 -p 9545 --dev_
  
4. If everything run smoother your Ethereum-Bridge will start listening your network for requests. After the Ethereum-Bridge node initilize it will create a new 'OAR = OraclizeAddrResolverI(<address>)' that you can copy and past to your contract constructor.

5. Now you can use Oraclize in your Ethereum Private Blockchain.




	
	

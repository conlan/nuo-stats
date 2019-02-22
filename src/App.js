import React from 'react';
import './App.css';

import { useWeb3Context } from 'web3-react'

const NuoConstants = require('./constants/Nuo.js');

var kernelOrders;

var web3 = null;
var app = null;

async function LoadOpenOrders() {
  var kernelContract = new web3.eth.Contract(NuoConstants.KERNEL_ABI, NuoConstants.KERNEL_ADDRESS);

  var allOrdersRaw = await kernelContract.methods.getAllOrders().call();

  console.log("Received " + allOrdersRaw.length + " orders");

  var DAI = 0;
  var totalLoans = 0;

  for (var i = 0; i < allOrdersRaw.length; i++) {
    var order = await kernelContract.methods.getOrder(allOrdersRaw[i]).call();

    var account = order["_account"];
    var user = order["_byUser"];
    var collateralAmount = order["_collateralAmount"];
    var collateralToken = order["_collateralToken"];
    var createdTime = order["_createdTimestamp"];
    var expirationTime = order["_expirationTimestamp"];
    var premium = order["_premium"];
    var principalAmount = order["_principalAmount"];
    var principalToken = order["_principalToken"];

    if (principalToken == "0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2") {
      DAI += (premium / 1e18);
      console.log(premium / 1e18);
      totalLoans+=1;
    }

    console.log("-->" + i);
    break;
  }

  console.log(totalLoans);
  console.log(DAI);

  kernelOrders = [];
  
  app.setState({});
}

function App(props) {
  app = props.app;

  const context = useWeb3Context();

  // set the connector for web3 based on availability
  if (context.connectorName === undefined) {
    if (window.web3 === undefined) {
      context.setConnector("Infura");
    } else {
      context.setConnector("MetaMask");
    }
  } else {
    if (web3 === null) {
      web3 = context.library;

      LoadOpenOrders();
    }
  }

  if (kernelOrders === undefined) {
    return (
      <div>
      <p>Loading...</p>
      </div>
    )
  } else {
    return (
      <div>
      <p>Done</p>
      </div>
    )
  }
}

export default App;
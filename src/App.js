import React from 'react';
import './App.css';

import { useWeb3Context } from 'web3-react'

import OrdersTable from "./components/OrdersTable/index.js";
import Footer from "./components/Footer/index.js";

const NuoConstants = require('./constants/Nuo.js');

var kernelOrders;

var currentProgress = "";

var web3 = null;
var app = null;

function TokenSymbol(address) {
  return NuoConstants.TOKEN_DATA[address].Symbol;
}

function TokenDecimals(address) {
  return NuoConstants.TOKEN_DATA[address].Decimals;
}

function ParseDate(timestamp) {
  var date = new Date(timestamp * 1000);

  var month = date.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }

  var day = date.getDate();
  if (day < 10) {
    day = "0" + day;
  }

  return month + "-" + day + "-" + date.getFullYear();
}

async function LoadOpenOrders() {
  var kernelContract = new web3.eth.Contract(NuoConstants.KERNEL_ABI, NuoConstants.KERNEL_ADDRESS);

  var allOrdersRaw = await kernelContract.methods.getAllOrders().call();

  allOrdersRaw.reverse();

  console.log("Received " + allOrdersRaw.length + " orders");

  var orderList = [];

  for (var i = 0; i < allOrdersRaw.length; i++) {
    var order = await kernelContract.methods.getOrder(allOrdersRaw[i]).call();

    currentProgress = "(" + i + " / " + allOrdersRaw.length + ")";

    var createdTimestamp = order["_createdTimestamp"];    
    var creationDate = ParseDate(createdTimestamp);

    var expiredTimestamp = order["_expirationTimestamp"];    
    var expiredDate = ParseDate(expiredTimestamp);

    var collateralAddress = order["_collateralToken"];
    var collateralDecimals = TokenDecimals(collateralAddress)
    var collateralAmount = parseFloat((order["_collateralAmount"] / 10**collateralDecimals).toFixed(4));    

    var principalAddress = order["_principalToken"];
    var principalDecimals = TokenDecimals(principalAddress);
    var principalAmount = parseFloat((order["_principalAmount"] / 10**principalDecimals).toFixed(4));
    var premium = ((order["_premium"] / 1e17) * 100).toFixed(2) + "%";

    orderList.push({
      account : order["_account"],
      user : order["_byUser"],
      collateralAmount : collateralAmount,
      collateralToken : TokenSymbol(collateralAddress),
      createdTime : creationDate,
      expirationTime : expiredDate,
      premium : premium,
      principalAmount : principalAmount,
      principalToken : TokenSymbol(principalAddress)
    });

    app.setState({});

    console.log(order);
  }

  kernelOrders = orderList;
  
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
        <p><b>Reserves</b></p>
        <p><b>Loans</b></p>
        <p>Loading Loans... {currentProgress}</p>
        <Footer/>
      </div>
    )
  } else {
    return (
      <div>
        <p><b>Reserves</b></p>
        <p><b>Loans</b></p>
        <OrdersTable orders={kernelOrders}/>
        <Footer/>
      </div>
    )
  }
}

export default App;
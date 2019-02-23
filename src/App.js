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

var loadingState = "";

var activeLoanBalances = {}
var activeLoanText = " "

function TokenSymbol(address) {
  return NuoConstants.TOKEN_DATA[address].Symbol;
}

function TokenDecimals(address) {
  return NuoConstants.TOKEN_DATA[address].Decimals;
}

function UpdateActiveLoanText() {
	var sb = [];

	Object.keys(activeLoanBalances).forEach(function(token) {
		sb.push(activeLoanBalances[token].toFixed(2));
		sb.push(" ");
		sb.push(token);
		sb.push(" - ");
	});

	// delete trailing comma if found
	if (sb.length > 0) {
		delete sb[sb.length - 1];
	}

	activeLoanText = sb.join("");
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

  kernelOrders = [];

  for (var i = 0; i < allOrdersRaw.length; i++) {
    var orderId = allOrdersRaw[i];

    loadingState = "(State = fetching order " + (i + 1)+ " / " + allOrdersRaw.length + ")";

    var order = await kernelContract.methods.getOrder(orderId).call();

    currentProgress = "(" + i + " / " + allOrdersRaw.length + ")";

    var createdTimestamp = order["_createdTimestamp"];    
    var creationDate = ParseDate(createdTimestamp);

    var expiredTimestamp = order["_expirationTimestamp"];    
    var expiredDate = ParseDate(expiredTimestamp);

    var collateralAddress = order["_collateralToken"];
    var collateralDecimals = TokenDecimals(collateralAddress)
    var collateralAmount = parseFloat((order["_collateralAmount"] / 10**collateralDecimals).toFixed(4));    
    
    var principalAddress = order["_principalToken"];
    var principalToken = TokenSymbol(principalAddress);
    var principalDecimals = TokenDecimals(principalAddress);
    var principalAmount = parseFloat((order["_principalAmount"] / 10**principalDecimals).toFixed(4));
    var premium = (order["_premium"] / 1e17);

    // initialize a default 0
    if ((principalToken in activeLoanBalances) == false) {
		activeLoanBalances[principalToken] = 0;
	}

    kernelOrders.push({
      id : orderId,
      account : order["_account"],
      user : order["_byUser"],
      collateralAmount : collateralAmount,
      collateralToken : TokenSymbol(collateralAddress),
      createdTime : creationDate,
      expirationTime : expiredDate,
      rawExpirationTime : expiredTimestamp,
      premium : premium,
      principalAmount : principalAmount,     
      principalToken : principalToken,
      status : "-",
      isActive : false
    });

    app.setState({});

    console.log(order);

    // if (i > 10) break; // TODO remove
  }

  loadingState = "";

  app.setState({});

  LoadOrderStatuses();
}

async function LoadOrderStatuses() {
  var kernelContract = new web3.eth.Contract(NuoConstants.KERNEL_ABI, NuoConstants.KERNEL_ADDRESS);

  for (var i = 0; i < kernelOrders.length; i++) {
    var order = kernelOrders[i];

    loadingState = "(State = fetching repay status " + (i + 1)+ " / " + kernelOrders.length + ")";
    
    let isRepaid = await kernelContract.methods.isRepaid(order.id).call();
    let isDefaulted = false;

    if (isRepaid === false) {
      isDefaulted = await kernelContract.methods.isDefaulted(order.id).call();
    }
	
	order["status"] = isRepaid ? "Repaid" : isDefaulted ? "Default" : "Active";

	// add this order to the active loans object if it hasn't been repaid or defaulted yet
	if ((isRepaid == false) && (isDefaulted == false)) {		
		activeLoanBalances[order.principalToken] = activeLoanBalances[order.principalToken] + order.principalAmount;

		UpdateActiveLoanText();
	}

    app.setState({});
  }

  loadingState = "";

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
        <p class="center"><b>Total Active Loans:</b></p>
        
        <p class="center">{activeLoanText}</p>        
        
        <p class="center"><b>Expected Premium Repay:</b></p>

        <p class="center"><i>{loadingState}</i></p>

        <OrdersTable orders={kernelOrders}/>
        <Footer/>
      </div>
    )
  }
}

export default App;
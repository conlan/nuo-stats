import React from 'react';
import './App.css';

import { useWeb3Context } from 'web3-react'

import OrdersTable from "./components/OrdersTable/index.js";
import ReservesTable from "./components/ReservesTable/index.js";

import Footer from "./components/Footer/index.js";

const NuoConstants = require('./constants/Nuo.js');

var kernelOrders = [];

var reserveBalanceData = [];
var reserveBalances = {};

var currentProgress = "";

var web3 = null;
var app = null;

var loadingState = "";

var activeLoanBalances = {};
var expectedPremiumRepays = {};

var activeLoanText = "-"
var expectedPremiumRepayText = "-";
var currentReserveROIText = "-";

function TokenSymbol(address) {
  return NuoConstants.TOKEN_DATA[address].Symbol;
}

function TokenDecimals(address) {
  return NuoConstants.TOKEN_DATA[address].Decimals;
}

function UpdateActiveLoanAndRepayText() {
	var loanBalanceSB = [];
	var expectedPremiumRepaySB = [];
  var currentReserveROISB = [];

	Object.keys(activeLoanBalances).forEach(function(token) {
    var balance = activeLoanBalances[token].toFixed(4);

    if (balance > 0) {
  		loanBalanceSB.push(balance);
  		loanBalanceSB.push(" ");
  		loanBalanceSB.push(token);
  		loanBalanceSB.push(" - ");
    }

    var repay = expectedPremiumRepays[token].toFixed(4);

    if (repay > 0) {
  		expectedPremiumRepaySB.push(repay);
  		expectedPremiumRepaySB.push(" ");
  		expectedPremiumRepaySB.push(token);
  		expectedPremiumRepaySB.push(" - " );
    }

    var currentROI = repay / reserveBalances[token].toFixed(4);
    currentROI = (currentROI * 100).toFixed(2);

    console.log(reserveBalances);

    if (currentROI > 0) {
      currentReserveROISB.push(currentROI);
      currentReserveROISB.push("%");
      currentReserveROISB.push(" ");
      currentReserveROISB.push(token);
      currentReserveROISB.push(" - " ); 
    }
	});

	// delete trailing comma if found
	if (loanBalanceSB.length > 0) {
		delete loanBalanceSB[loanBalanceSB.length - 1];		
	}

	if (expectedPremiumRepaySB.length > 0) {
		delete expectedPremiumRepaySB[expectedPremiumRepaySB.length - 1];
	}

  if (currentReserveROISB.length > 0) {
    delete currentReserveROISB[currentReserveROISB.length - 1];
  }

	activeLoanText = loanBalanceSB.join("");
	expectedPremiumRepayText = expectedPremiumRepaySB.join("");
  currentReserveROIText = currentReserveROISB.join("");
}

function ParseDate(timestamp) {
  var date = new Date(timestamp * 1000);

  var month = date.getUTCMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }

  var day = date.getUTCDate();
  if (day < 10) {
    day = "0" + day;
  }

  return month + "-" + day + "-" + date.getUTCFullYear();
}

async function LoadReserves() {
  var reserveContract = new web3.eth.Contract(NuoConstants.RESERVE_ABI, NuoConstants.RESERVE_ADDRESS);

  var keys = Object.keys(NuoConstants.TOKEN_DATA);

  reserveBalanceData = [];

  for (var i = 0; i < keys.length; i++) {
    var token = keys[i];

    loadingState = "(Fetching reserve details for " + TokenSymbol(token) + ")";

    var lastReserveUpdateTime = await reserveContract.methods.lastReserveRuns(token).call();

    var reserveBalanceForToken = await reserveContract.methods.reserves(lastReserveUpdateTime, token).call();
    reserveBalanceForToken = reserveBalanceForToken / 10**NuoConstants.TOKEN_DATA[token].Decimals;

    var profitsForToken = await reserveContract.methods.profits(lastReserveUpdateTime, token).call(); 
    profitsForToken = profitsForToken / 10**NuoConstants.TOKEN_DATA[token].Decimals;

    var lossesForToken = await reserveContract.methods.losses(lastReserveUpdateTime, token).call(); 
    lossesForToken = lossesForToken / 10**NuoConstants.TOKEN_DATA[token].Decimals;

    var reserveBalanceObj = {
      token : NuoConstants.TOKEN_DATA[token].Symbol,
      balance : reserveBalanceForToken,
      lastUpdated : ParseDate(lastReserveUpdateTime),
      lastUpdatedTimestamp : lastReserveUpdateTime,
      profits : profitsForToken,
      losses : lossesForToken
    };

    console.log(reserveBalanceObj);

    reserveBalanceData.push(reserveBalanceObj);
    reserveBalances[NuoConstants.TOKEN_DATA[token].Symbol] = reserveBalanceForToken;

    app.setState({});
  }

  app.setState({});

  LoadOpenOrders();
}

async function LoadOpenOrders() {
  var kernelContract = new web3.eth.Contract(NuoConstants.KERNEL_ABI, NuoConstants.KERNEL_ADDRESS);

  var allOrdersRaw = await kernelContract.methods.getAllOrders().call();

  allOrdersRaw.reverse();

  console.log("Received " + allOrdersRaw.length + " orders");

  kernelOrders = [];

  for (var i = 0; i < allOrdersRaw.length; i++) {
    var orderId = allOrdersRaw[i];

    loadingState = "(Fetching loan details " + (i + 1)+ " / " + allOrdersRaw.length + ")";

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
		expectedPremiumRepays[principalToken] = 0;
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
  }

  loadingState = "";

  app.setState({});

  LoadOrderStatuses();
}

async function LoadOrderStatuses() {
  var kernelContract = new web3.eth.Contract(NuoConstants.KERNEL_ABI, NuoConstants.KERNEL_ADDRESS);

  for (var i = 0; i < kernelOrders.length; i++) {
    var order = kernelOrders[i];

    loadingState = "(Fetching loan status " + (i + 1)+ " / " + kernelOrders.length + ")";
    
    let isRepaid = await kernelContract.methods.isRepaid(order.id).call();
    let isDefaulted = false;

    if (isRepaid === false) {
      isDefaulted = await kernelContract.methods.isDefaulted(order.id).call();
    }
	
	order["status"] = isRepaid ? "Repaid" : isDefaulted ? "Default" : "Active";

	// add this order to the active loans object if it hasn't been repaid or defaulted yet
	if ((isRepaid == false) && (isDefaulted == false)) {		
		activeLoanBalances[order.principalToken] = activeLoanBalances[order.principalToken] + order.principalAmount;

		// add to the expected premium payout
		var expectedPremium = order.premium * order.principalAmount;

		expectedPremiumRepays[order.principalToken] = expectedPremiumRepays[order.principalToken] + expectedPremium;

		UpdateActiveLoanAndRepayText();
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
      
      LoadReserves();
    }
  }

  return (
    <div>
      <p><i>{loadingState}</i></p>

      <p><b>Active Loans:</b></p>
      
      <p>{activeLoanText}</p>
      
      <p><b>Expected Premium Repay:</b></p>

      <p>{expectedPremiumRepayText}</p>

      <p><b>Current Reserve ROI:</b></p>

      <p>{currentReserveROIText}</p>

      <ReservesTable reserves={reserveBalanceData}/>

      <OrdersTable orders={kernelOrders}/>
      <Footer/>
    </div>
  )
}

export default App;
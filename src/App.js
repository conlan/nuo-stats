import React from 'react';
import './App.css';

import { useWeb3Context } from 'web3-react'

import OrdersTable from "./components/OrdersTable/index.js";
import TradeOrdersTable from "./components/TradeOrdersTable/index.js";
import ReservesTable from "./components/ReservesTable/index.js";

import Footer from "./components/Footer/index.js";

const NuoConstants = require('./constants/Nuo.js');

var kernelOrders = [];
var mkernelOrders = [];
var reserveBalanceData = [];

var reserveBalances = {};

var web3 = null;
var app = null;

var loadingState = "";

var activeLoanBalances = {};
var expectedPremiumRepays = {};

function TokenSymbol(address) {
	return NuoConstants.TOKEN_DATA[address].Symbol;
}

function TokenDecimals(address) {
	return NuoConstants.TOKEN_DATA[address].Decimals;
}

function UpdateActiveLoanAndRepayData() {
	Object.keys(activeLoanBalances).forEach(function(token) {
		var activeLoanTotal = activeLoanBalances[token].toFixed(4);

		if (activeLoanTotal > 0) {
			reserveBalances[token].activeLoanTotal = activeLoanTotal;
		}

		var expectedPremiumRepay = expectedPremiumRepays[token].toFixed(4);

		if (expectedPremiumRepay > 0) {
			reserveBalances[token].expectedPremiumRepay = expectedPremiumRepay;
		}

		var currentROI = 0;

		if (reserveBalances[token].balance > 0) {
			currentROI = expectedPremiumRepay / reserveBalances[token].balance.toFixed(4);
			currentROI = (currentROI * 100).toFixed(2);
		}

		if (expectedPremiumRepay > 0) {
			reserveBalances[token].currentROI = currentROI + "%";
		}
	});
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

		var reserveBalanceObj = {
			token : NuoConstants.TOKEN_DATA[token].Symbol,
			balance : reserveBalanceForToken,
			lastUpdated : ParseDate(lastReserveUpdateTime),
			lastUpdatedTimestamp : lastReserveUpdateTime,
			activeLoanTotal : "-",
			expectedPremiumRepay : "-",
			currentROI : "-"
		};

		console.log(reserveBalanceObj);

		reserveBalanceData.push(reserveBalanceObj);

		reserveBalances[NuoConstants.TOKEN_DATA[token].Symbol] = reserveBalanceObj;

		app.setState({});
	}

	app.setState({});

	LoadTradeOrders(LoadLoanOrders);
}

async function LoadLoanOrders() {
	var kernelContract = new web3.eth.Contract(NuoConstants.KERNEL_ABI, NuoConstants.KERNEL_ADDRESS);

	var allOrderIds = await kernelContract.methods.getAllOrders().call();

	allOrderIds.reverse();

	console.log("Received " + allOrderIds.length + " orders");

	kernelOrders = [];

	for (var i = 0; i < allOrderIds.length; i++) {
		var orderId = allOrderIds[i];

		loadingState = "(Fetching loan details " + (i + 1)+ " / " + allOrderIds.length + ")";

		try {
			var order = await kernelContract.methods.getOrder(orderId).call();
			
			var createdTimestamp = order["_createdTimestamp"];    
			var creationDate = ParseDate(createdTimestamp);

			var expiredTimestamp = order["_expirationTimestamp"];    
			var expiredDate = ParseDate(expiredTimestamp);

			var tenure = (expiredTimestamp - createdTimestamp)/86400;

			var collateralAddress = order["_collateralToken"];
			var collateralDecimals = TokenDecimals(collateralAddress)
			var collateralAmount = parseFloat((order["_collateralAmount"] / 10**collateralDecimals).toFixed(4));    

			var principalAddress = order["_principalToken"];
			var principalToken = TokenSymbol(principalAddress);
			var principalDecimals = TokenDecimals(principalAddress);
			var principalAmount = parseFloat((order["_principalAmount"] / 10**principalDecimals).toFixed(4));

			// special case handling for a UI bug -- use correct divisor after certain timestamp
			var premiumDivisor = (createdTimestamp >= 1551279214) ? 1e18 : 1e17;

			var premium = ((order["_premium"] / premiumDivisor) * 100).toFixed(2);
  		} catch (error) {
			// skip if we encounter a token not yet supported
			console.log(error);
			continue;
		}

    	// initialize a default 0
    	if ((principalToken in activeLoanBalances) === false) {
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
	    	createdTimestamp : createdTimestamp,
	    	expirationTime : expiredDate,
	    	rawExpirationTime : expiredTimestamp,
	    	premium : premium,
	    	principalAmount : principalAmount,     
	    	principalToken : principalToken,
	    	tenure : tenure,
	    	status : "-",
	    	isActive : false
	    });

	    console.log(order);

	    if (i < allOrderIds.length - 1) {
    		app.setState({});
    	}
	}

	loadingState = "";

	app.setState({});  

	await LoadOrderStatuses(NuoConstants.LOAN_TYPE, kernelOrders, NuoConstants.KERNEL_ABI, NuoConstants.KERNEL_ADDRESS);
}

async function LoadTradeOrders(callback) {
	var mkernelContract = new web3.eth.Contract(NuoConstants.MKERNEL_ABI, NuoConstants.MKERNEL_ADDRESS);

	var allOrderIds = await mkernelContract.methods.getAllOrders().call();

	allOrderIds.reverse();

	console.log("Received " + allOrderIds.length + " orders");

	mkernelOrders = [];

	for (var i = 0; i < allOrderIds.length; i++) {
		var orderId = allOrderIds[i];

		loadingState = "(Fetching trade details " + (i + 1)+ " / " + allOrderIds.length + ")";

		try {
			var order = await mkernelContract.methods.getOrder(orderId).call();

			var trade = await mkernelContract.methods.getTrade(orderId).call();

			var createdTimestamp = order["_createdTimestamp"];    
			var creationDate = ParseDate(createdTimestamp);

			var expiredTimestamp = order["_expirationTimestamp"];
			var expiredDate = ParseDate(expiredTimestamp);

			var tenure = (expiredTimestamp - createdTimestamp)/86400;

			var collateralAddress = order["_collateralToken"];
			var collateralDecimals = TokenDecimals(collateralAddress)
			var collateralAmount = parseFloat((order["_collateralAmount"] / 10**collateralDecimals).toFixed(4));    

			var principalAddress = order["_principalToken"];
			var principalToken = TokenSymbol(principalAddress);
			var principalDecimals = TokenDecimals(principalAddress);
			var principalAmount = parseFloat((order["_principalAmount"] / 10**principalDecimals).toFixed(4));

		    var tradeAddress = trade;//["_tradeToken"];
		    var tradeToken = TokenSymbol(tradeAddress);
		    var tradeAmount = parseFloat((order["_principalAmount"] / 10**principalDecimals).toFixed(4));

		      // var stopLoss = trade["_stopLoss"];
		      // var stopProfit = trade["_stopProfit"];
		      // var closingTradeToken = trade["_closingToken"];
	      
	      	var premium = ((order["_premium"] / order["_principalAmount"]) * 100).toFixed(2);
	  	} catch (error) {
			// skip if we encounter a token not yet supported
			console.log(error);
			continue;
		}

		// initialize a default 0
	    if ((principalToken in activeLoanBalances) === false) {
	    	activeLoanBalances[principalToken] = 0;
	    	expectedPremiumRepays[principalToken] = 0;
	    }

	    mkernelOrders.push({
	    	id : orderId,
	    	account : order["_account"],
	    	user : order["_byUser"],
	    	collateralAmount : collateralAmount,
	    	collateralToken : TokenSymbol(collateralAddress),
	    	createdTime : creationDate,
	    	createdTimestamp : createdTimestamp,
	    	expirationTime : expiredDate,
	    	rawExpirationTime : expiredTimestamp,
	    	premium : premium,
	    	principalAmount : principalAmount,     
	    	principalToken : principalToken,
	    	tradeAmount : tradeAmount,
	    	tradeToken : tradeToken,
		      // stopLoss : stopLoss,
		      // stopProfit : stopProfit,
		      // closingTradeToken : closingTradeToken,
		      tenure : tenure,
		      status : "-",
		      isActive : false
	  	});

	  	console.log(order, trade);

	  	if (i < allOrderIds.length - 1) {
    		app.setState({});
    	}
	}
	
	loadingState = "";

	app.setState({});

	await LoadOrderStatuses(NuoConstants.TRADE_TYPE, mkernelOrders, NuoConstants.MKERNEL_ABI, NuoConstants.MKERNEL_ADDRESS);

	callback();
}

async function LoadOrderStatuses(type, orders, abi, contractAddress) {
	var kernelContract = new web3.eth.Contract(abi, contractAddress);

	for (var i = 0; i < orders.length; i++) {
		var order = orders[i];

		loadingState = "(Fetching order status " + (i + 1)+ " / " + orders.length + ")";

		let isRepaid = false;
		let isLiquidated = false;
		let isDefaulted = false;

		if (type === NuoConstants.LOAN_TYPE) {
			isRepaid = await kernelContract.methods.isRepaid(order.id).call();
		} else if (type === NuoConstants.TRADE_TYPE) {
			isLiquidated = await kernelContract.methods.isLiquidated(order.id).call();
		}

		if (isRepaid === false) {
			isDefaulted = await kernelContract.methods.isDefaulted(order.id).call();
		}

		order["status"] = isRepaid ? "Repaid" : isLiquidated ? "Liquidated" : isDefaulted ? "Default" : "Active";

	  	// add this order to the active loans object if it hasn't been repaid or defaulted yet
	  	if ((isRepaid === false) && (isDefaulted  === false) && (isLiquidated  === false)) {		
	  		activeLoanBalances[order.principalToken] = activeLoanBalances[order.principalToken] + order.principalAmount;

	  		// add to the expected premium payout
	  		var expectedPremium = order.premium / 100 * order.principalAmount;

	  		expectedPremiumRepays[order.principalToken] = expectedPremiumRepays[order.principalToken] + expectedPremium;

	  		UpdateActiveLoanAndRepayData();
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

  	<ReservesTable reserves={reserveBalanceData}/>

  	<TradeOrdersTable orders={mkernelOrders}/>

  	<OrdersTable orders={kernelOrders}/>

  	<Footer/>
  	</div>
  	)
}

export default App;
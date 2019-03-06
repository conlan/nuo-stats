module.exports = {
  LOAN_TYPE : 1,
  TRADE_TYPE : 2,
  MKERNEL_ADDRESS : "0xa1d5d13836c07d1b1cb658f47f1111a3967b8430",
  MKERNEL_ABI : [
	{
		"constant": true,
		"inputs": [
			{
			"name": "",
			"type": "bytes32"
			}
		],
		"name": "isLiquidated",
		"outputs": [
			{
			"name": "",
			"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
		  {
			"name": "",
			"type": "bytes32"
		  }
		],
		"name": "isDefaulted",
		"outputs": [
		  {
			"name": "",
			"type": "bool"
		  }
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
    {
      "constant": true,
      "inputs": [],
      "name": "getAllOrders",
      "outputs": [
        {
          "name": "",
          "type": "bytes32[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_orderHash",
          "type": "bytes32"
        }
      ],
      "name": "getOrder",
      "outputs": [
        {
          "name": "_account",
          "type": "address"
        },
        {
          "name": "_byUser",
          "type": "address"
        },
        {
          "name": "_principalToken",
          "type": "address"
        },
        {
          "name": "_collateralToken",
          "type": "address"
        },
        {
          "name": "_principalAmount",
          "type": "uint256"
        },
        {
          "name": "_collateralAmount",
          "type": "uint256"
        },
        {
          "name": "_premium",
          "type": "uint256"
        },
        {
          "name": "_expirationTimestamp",
          "type": "uint256"
        },
        {
          "name": "_salt",
          "type": "uint256"
        },
        {
          "name": "_fee",
          "type": "uint256"
        },
        {
          "name": "_createdTimestamp",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_orderHash",
          "type": "bytes32"
        }
      ],
      "name": "getTrade",
      "outputs": [
        {
          "name": "_tradeToken",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ],

  KERNEL_ADDRESS : "0x0F99bE6639B1DdFbEdf319B4de67E558a41AA6eA",
  KERNEL_ABI : [{"constant":false,"inputs":[],"name":"stop","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_orderHash","type":"bytes32"},{"name":"_value","type":"uint256"},{"name":"_signature","type":"bytes"}],"name":"repay","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"owner_","type":"address"}],"name":"setOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_orderHash","type":"bytes32"}],"name":"getExpectedRepayValue","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_config","type":"address"}],"name":"setConfig","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"kyberConnector","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"isDefaulted","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_account","type":"address"}],"name":"getOrdersForAccount","outputs":[{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_orderHash","type":"bytes32"}],"name":"getOrder","outputs":[{"name":"_account","type":"address"},{"name":"_byUser","type":"address"},{"name":"_principalToken","type":"address"},{"name":"_collateralToken","type":"address"},{"name":"_principalAmount","type":"uint256"},{"name":"_collateralAmount","type":"uint256"},{"name":"_premium","type":"uint256"},{"name":"_expirationTimestamp","type":"uint256"},{"name":"_salt","type":"uint256"},{"name":"_fee","type":"uint256"},{"name":"_createdTimestamp","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"accountFactory","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_kyberConnector","type":"address"}],"name":"setKyberConnector","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"accountToOrders","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"stopped","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"config","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"authority_","type":"address"}],"name":"setAuthority","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getAllOrders","outputs":[{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"isRepaid","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"isOrder","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_feeWallet","type":"address"}],"name":"setFeeWallet","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_reserve","type":"address"}],"name":"setReserve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"orders","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_orderHash","type":"bytes32"},{"name":"_principalPerCollateral","type":"uint256"}],"name":"process","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_accountFactory","type":"address"}],"name":"setAccountFactory","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"start","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"authority","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_orderAddresses","type":"address[4]"},{"name":"_orderValues","type":"uint256[6]"},{"name":"_signature","type":"bytes"}],"name":"createOrder","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_escrow","type":"address"}],"name":"setEscrow","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"hashToOrder","outputs":[{"name":"account","type":"address"},{"name":"byUser","type":"address"},{"name":"principalToken","type":"address"},{"name":"collateralToken","type":"address"},{"name":"principalAmount","type":"uint256"},{"name":"collateralAmount","type":"uint256"},{"name":"premium","type":"uint256"},{"name":"duration","type":"uint256"},{"name":"expirationTimestamp","type":"uint256"},{"name":"salt","type":"uint256"},{"name":"fee","type":"uint256"},{"name":"createdTimestamp","type":"uint256"},{"name":"orderHash","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"reserve","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"escrow","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"feeWallet","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"VERSION","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_escrow","type":"address"},{"name":"_accountFactory","type":"address"},{"name":"_reserve","type":"address"},{"name":"_feeWallet","type":"address"},{"name":"_config","type":"address"},{"name":"_kyberConnector","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"orderHash","type":"bytes32"},{"indexed":true,"name":"account","type":"address"},{"indexed":true,"name":"principalToken","type":"address"},{"indexed":false,"name":"collateralToken","type":"address"},{"indexed":false,"name":"byUser","type":"address"},{"indexed":false,"name":"principalAmount","type":"uint256"},{"indexed":false,"name":"collateralAmount","type":"uint256"},{"indexed":false,"name":"premium","type":"uint256"},{"indexed":false,"name":"expirationTimestamp","type":"uint256"},{"indexed":false,"name":"fee","type":"uint256"}],"name":"LogOrderCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"orderHash","type":"bytes32"},{"indexed":false,"name":"valueRepaid","type":"uint256"}],"name":"LogOrderRepaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"orderHash","type":"bytes32"},{"indexed":false,"name":"reason","type":"string"}],"name":"LogOrderDefaulted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"methodSig","type":"string"},{"indexed":false,"name":"errMsg","type":"string"}],"name":"LogError","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"bytes32Value","type":"bytes32"},{"indexed":false,"name":"methodSig","type":"string"},{"indexed":false,"name":"errMsg","type":"string"}],"name":"LogErrorWithHintBytes32","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"addressValue","type":"address"},{"indexed":false,"name":"methodSig","type":"string"},{"indexed":false,"name":"errMsg","type":"string"}],"name":"LogErrorWithHintAddress","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"authority","type":"address"}],"name":"LogSetAuthority","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"}],"name":"LogSetOwner","type":"event"},{"anonymous":true,"inputs":[{"indexed":true,"name":"sig","type":"bytes4"},{"indexed":true,"name":"guy","type":"address"},{"indexed":true,"name":"foo","type":"bytes32"},{"indexed":true,"name":"bar","type":"bytes32"},{"indexed":false,"name":"wad","type":"uint256"},{"indexed":false,"name":"fax","type":"bytes"}],"name":"LogNote","type":"event"}],

  RESERVE_ADDRESS : "0x64d14595152b430cf6940da15c6e39545c7c5b7e",
  RESERVE_ABI : [{"constant":false,"inputs":[],"name":"stop","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_token","type":"address"},{"name":"_from","type":"address"},{"name":"_value","type":"uint256"},{"name":"_profit","type":"uint256"},{"name":"_loss","type":"uint256"}],"name":"lock","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"owner_","type":"address"}],"name":"setOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"},{"name":"","type":"address"}],"name":"losses","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_dateTime","type":"address"}],"name":"setDateTime","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_config","type":"address"}],"name":"setConfig","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"},{"name":"","type":"address"}],"name":"reserves","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_orderAddresses","type":"address[3]"},{"name":"_orderValues","type":"uint256[3]"},{"name":"_signature","type":"bytes"}],"name":"createOrder","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_account","type":"address"}],"name":"getOrdersForAccount","outputs":[{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"},{"name":"","type":"address"}],"name":"profits","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_forToken","type":"address"},{"name":"_token","type":"address"},{"name":"_value","type":"uint256"}],"name":"lockSurplus","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"orderToCumulative","outputs":[{"name":"timestamp","type":"uint256"},{"name":"value","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"dateTime","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"},{"name":"","type":"address"}],"name":"deposits","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_orderHash","type":"bytes32"},{"name":"_forDays","type":"uint256"}],"name":"updateOrderCumulativeValue","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_orderHash","type":"bytes32"}],"name":"getOrder","outputs":[{"name":"_account","type":"address"},{"name":"_token","type":"address"},{"name":"_byUser","type":"address"},{"name":"_value","type":"uint256"},{"name":"_expirationTimestamp","type":"uint256"},{"name":"_salt","type":"uint256"},{"name":"_createdTimestamp","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"deployTimestamp","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"accountFactory","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"},{"name":"","type":"address"}],"name":"withdrawals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"accountToOrders","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"stopped","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_orderHash","type":"bytes32"},{"name":"_signature","type":"bytes"}],"name":"cancelOrder","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"config","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"authority_","type":"address"}],"name":"setAuthority","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getAllOrders","outputs":[{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"isOrder","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_token","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"release","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"lastReserveRuns","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"cancelledOrders","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_orderHash","type":"bytes32"}],"name":"processOrder","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"orders","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_accountFactory","type":"address"}],"name":"setAccountFactory","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_orderHashes","type":"bytes32[]"},{"name":"_forDays","type":"uint256[]"}],"name":"updateOrderCumulativeValueBatch","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"start","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"authority","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_escrow","type":"address"}],"name":"setEscrow","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"hashToOrder","outputs":[{"name":"account","type":"address"},{"name":"token","type":"address"},{"name":"byUser","type":"address"},{"name":"value","type":"uint256"},{"name":"duration","type":"uint256"},{"name":"expirationTimestamp","type":"uint256"},{"name":"salt","type":"uint256"},{"name":"createdTimestamp","type":"uint256"},{"name":"orderHash","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_forToken","type":"address"},{"name":"_token","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferSurplus","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"escrow","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"TIME_INTERVAL","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_token","type":"address"},{"name":"_forDays","type":"uint256"}],"name":"updateReserveValues","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"VERSION","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_escrow","type":"address"},{"name":"_accountFactory","type":"address"},{"name":"_dateTime","type":"address"},{"name":"_config","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"orderHash","type":"bytes32"},{"indexed":true,"name":"account","type":"address"},{"indexed":true,"name":"token","type":"address"},{"indexed":false,"name":"byUser","type":"address"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"expirationTimestamp","type":"uint256"}],"name":"LogOrderCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"orderHash","type":"bytes32"},{"indexed":true,"name":"by","type":"address"}],"name":"LogOrderCancelled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"token","type":"address"},{"indexed":true,"name":"updatedTill","type":"uint256"},{"indexed":false,"name":"reserve","type":"uint256"},{"indexed":false,"name":"profit","type":"uint256"},{"indexed":false,"name":"loss","type":"uint256"}],"name":"LogReserveValuesUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"orderHash","type":"bytes32"},{"indexed":false,"name":"updatedTill","type":"uint256"},{"indexed":false,"name":"value","type":"uint256"}],"name":"LogOrderCumulativeUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"token","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"by","type":"address"}],"name":"LogRelease","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"token","type":"address"},{"indexed":true,"name":"from","type":"address"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"profit","type":"uint256"},{"indexed":false,"name":"loss","type":"uint256"},{"indexed":false,"name":"by","type":"address"}],"name":"LogLock","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"forToken","type":"address"},{"indexed":true,"name":"token","type":"address"},{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"LogLockSurplus","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"forToken","type":"address"},{"indexed":true,"name":"token","type":"address"},{"indexed":false,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"LogTransferSurplus","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"methodSig","type":"string"},{"indexed":false,"name":"errMsg","type":"string"}],"name":"LogError","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"bytes32Value","type":"bytes32"},{"indexed":false,"name":"methodSig","type":"string"},{"indexed":false,"name":"errMsg","type":"string"}],"name":"LogErrorWithHintBytes32","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"addressValue","type":"address"},{"indexed":false,"name":"methodSig","type":"string"},{"indexed":false,"name":"errMsg","type":"string"}],"name":"LogErrorWithHintAddress","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"authority","type":"address"}],"name":"LogSetAuthority","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"}],"name":"LogSetOwner","type":"event"},{"anonymous":true,"inputs":[{"indexed":true,"name":"sig","type":"bytes4"},{"indexed":true,"name":"guy","type":"address"},{"indexed":true,"name":"foo","type":"bytes32"},{"indexed":true,"name":"bar","type":"bytes32"},{"indexed":false,"name":"wad","type":"uint256"},{"indexed":false,"name":"fax","type":"bytes"}],"name":"LogNote","type":"event"}],

  TOKEN_DATA : {
  	"0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359" : {
  		Symbol : "DAI",
  		Decimals : 18
  	},
  	"0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2" : {
  		Symbol : "WETH",
  		Decimals : 18
  	},
  	"0x0D8775F648430679A709E98d2b0Cb6250d2887EF" : {
  		Symbol : "BAT",
  		Decimals : 18
  	},
  	"0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2" : {
  		Symbol : "MKR",
  		Decimals : 18
  	},
  	"0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599" : {
  		Symbol : "WBTC",
  		Decimals : 8
  	},
  	"0xE41d2489571d322189246DaFA5ebDe1F4699F498" : {
  		Symbol : "ZRX",
  		Decimals : 18
  	},
  	"0x1985365e9f78359a9B6AD760e32412f4a445E862" : {
  		Symbol : "REP",
  		Decimals : 18
  	},
  	"0xdd974D5C2e2928deA5F71b9825b8b646686BD200" : {
  		Symbol : "KNC",
  		Decimals : 18
  	},
  	"0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" : {
  		Symbol : "USDC",
  		Decimals : 6
  	}
  }
}
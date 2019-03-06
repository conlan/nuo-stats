import React from "react";

import ReactTable from "react-table";

import "react-table/react-table.css";

import "./ReservesTable.css";

import { formatCreatedDate } from "../../util.js";

const NuoConstants = require('../../constants/Nuo.js');

// var app;

function ReservesTable(props) {
  // app = props.app;

  const data = [];

  var reserves;
  reserves = props.reserves.sort((a,b) => (a.currentROI < b.currentROI) ? 1 : ((b.currentROI < a.currentROI) ? -1 : 0));

  reserves.forEach(reserve => {
    var lastUpdatedTime = formatCreatedDate(reserve.lastUpdated, reserve.lastUpdatedTimestamp);
    data.push({
      token : reserve.token,
      balance : (reserve.balance > 0) ? parseFloat(reserve.balance.toFixed(4)) : 0,
      lastUpdated : lastUpdatedTime,
      activeLoanTotal : reserve.activeLoanTotal,
      expectedPremiumRepay : reserve.expectedPremiumRepay,
      currentROI : reserve.currentROI
      // profits : (reserve.profits > 0) ? parseFloat(reserve.profits.toFixed(4)) : 0,
      // losses : (reserve.losses > 0) ? parseFloat(reserve.losses.toFixed(4)) : 0
    })
  });

  // var etherScanPrefix = "https://etherscan.com/address/";

  const columns = [
    {
      Header: "Token",
      accessor: "token"
    },
    {
      Header: "Last Updated",
      accessor: "lastUpdated",
      className: "center"
    },
    {
      Header: "Balance",
      accessor: "balance",
      className: "right"
    },
    {
      Header: "Active Loan Total",
      accessor: "activeLoanTotal",
      className: "right"
    },
    {
      Header: "Expected Premium Repay",
      accessor: "expectedPremiumRepay",
      className: "right"
    },
    {
      Header: "Current ROI",
      accessor: "currentROI",
      className: "right"
    }
  ];

  return (
    <div className="ReservesTable">   
      <p><b>Reserves: {props.reserves.length}</b></p> 
      <ReactTable
        data={data}
        columns={columns}
        defaultPageSize={Object.keys(NuoConstants.TOKEN_DATA).length}
        showPageSizeOptions={false}
        showPagination={false}
        className="-striped"
        resizable={false}
      />      
    </div>
  );
}

export default ReservesTable;

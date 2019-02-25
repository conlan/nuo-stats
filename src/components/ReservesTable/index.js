import React from "react";

import ReactTable from "react-table";

import "react-table/react-table.css";

import "./ReservesTable.css";

var app;

function ReservesTable(props) {
  app = props.app;

  var reserves = props.reserves;

  const data = [];

  reserves.forEach(reserve => {
    data.push({
      token : reserve.token,
      balance : (reserve.balance > 0) ? parseFloat(reserve.balance.toFixed(4)) : 0,
      lastUpdated : reserve.lastUpdated,
      profits : (reserve.profits > 0) ? parseFloat(reserve.profits.toFixed(4)) : 0,
      losses : (reserve.losses > 0) ? parseFloat(reserve.losses.toFixed(4)) : 0
    })
  });

  var etherScanPrefix = "https://etherscan.com/address/";

  const columns = [
    {
      Header: "Token",
      accessor: "token"
    },
    {
      Header: "Balance",
      accessor: "balance",
      className: "right"
    },
    {
      Header: "Last Updated",
      accessor: "lastUpdated",
      className: "center"
    }/*,
    {
      Header: "Profits",
      accessor: "profits",
      className: "right"
    },
    {
      Header: "Losses",
      accessor: "losses",
      className: "right"
    }*/
  ];

  return (
    <div className="ReservesTable">    
      <ReactTable
        data={data}
        columns={columns}
        defaultPageSize={8}
        showPageSizeOptions={false}
        showPagination={false}
        className="-striped"
        resizable={false}
      />      
    </div>
  );
}

export default ReservesTable;

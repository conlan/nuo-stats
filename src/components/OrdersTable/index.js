import React from "react";

import ReactTable from "react-table";

import "react-table/react-table.css";

import "./OrdersTable.css";

var app;

function OrdersTable(props) {
  app = props.app;

  const data = [];

  props.orders.forEach(order => {
    data.push({
      account : order.account,
      user : order.user,
      created : order.createdTime,
      expires : order.expirationTime,
      
      collateralToken : order.collateralToken,
      collateralAmount : order.collateralAmount,

      principalToken : order.principalToken,
      principalAmount : order.principalAmount,

      premium : order.premium,
      status : "TBD"
    })
  });

  var etherScanPrefix = "https://etherscan.com/address/";

  const columns = [
    {
      Header: "User",
      accessor: "user",
      maxWidth: 100,
      Cell: row => (
        <a href={etherScanPrefix + row.value} target="_blank" rel="noopener noreferrer">
          {row.value}
        </a>
      )
    },
    {
      Header: "Account",
      accessor: "account",
      maxWidth: 100,
      Cell: row => (
        <a href={etherScanPrefix + row.value} target="_blank" rel="noopener noreferrer">
          {row.value}
        </a>
      )
    },
    {
      Header: "Created",
      accessor: "created",
      className: "center"   
    },
    {
      Header: "Collateral",
      accessor: "collateralAmount",
      className: "right"
    },
    {
      Header: "Token",
      accessor: "collateralToken"
    },
    {
      Header: "Principal",
      accessor: "principalAmount",
      className: "right",
    },
    {
      Header: "Token",
      accessor: "principalToken"
    },
    {
      Header: "Premium",
      accessor: "premium",
      maxWidth: 100,
      className: "right"
    },
    {
      Header: "Expires",
      accessor: "expires",
      className: "center"
    },
    {
      Header: "Status",
      accessor: "status",
      className: "center"    
    }
  ];

  var showPageSizeOptions = false;

  return (
    <div className="OrdersTable">    
      <ReactTable
        data={data}
        columns={columns}        
        showPageSizeOptions={showPageSizeOptions}
        className="-striped"
        resizable={false}
      />      
    </div>
  );
}

export default OrdersTable;

import React from "react";

import ReactTable from "react-table";

import "react-table/react-table.css";

import { formatCreatedDate } from "../../util.js";

import "./OrdersTable.css";

// var app;

function OrdersTable(props) {
  // app = props.app;

  const data = [];

  var orders;
  orders = props.orders.sort((a,b) => (a.createdTimestamp < b.createdTimestamp) ? 1 : ((b.createdTimestamp < a.createdTimestamp) ? -1 : 0));

  orders.forEach(order => {
    var createdTime = formatCreatedDate(order.createdTime, order.createdTimestamp);
    data.push({
      id : order.id,
      account : order.account,
      user : order.user,
      created : createdTime,
      expires : order.expirationTime,
      
      collateralToken : order.collateralToken,
      collateralAmount : order.collateralAmount,

      principalToken : order.principalToken,
      principalAmount : order.principalAmount,

      tenure : order.tenure,
      
      premium : order.premium + "%",
      status : order.status
    })
  });

  var etherScanPrefix = "https://etherscan.com/address/";

  const columns = [
    {
      Header: "Order ID",
      accessor: "id",
      maxWidth: 100
    },
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
      Header: "Tenure(D)",
      accessor: "tenure"
    },
    {
      Header: "Status",
      accessor: "status",
      maxWidth: 100,
      Cell: row => (
        <span>
          <span
            style={{
              color:
                row.value === "Repaid"
                  ? "#3498db"
                  : row.value === "Active"
                  ? "#62cb31"
                  : row.value === "Default"
                  ? "#e74c3c"
                  : "#383838"
            }}
          >
            &#x25cf;
          </span>{" "}
          {row.value}
        </span>
      )  
    }
  ];

  var showPageSizeOptions = false;

  return (
    <div className="OrdersTable">    
      <p><b>Loans: {props.orders.length}</b></p> 
      <ReactTable
        data={data}
        columns={columns}
        defaultPageSize={10}
        showPageSizeOptions={showPageSizeOptions}
        className="-striped"
        resizable={false}
      />      
    </div>
  );
}

export default OrdersTable;

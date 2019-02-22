import React from 'react';
import './App.css';

import { useWeb3Context } from 'web3-react'

function App() {
  const context = useWeb3Context();

  // set the connector for web3 based on availability
  if (context.connectorName === undefined) {
    if (window.web3 === undefined) {
      context.setConnector("Infura");
    } else {
      context.setConnector("MetaMask");
    }
  }

  console.log(context);

  return (
    <div/>
  );
}

export default App;
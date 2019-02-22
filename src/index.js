import React, { Component } from "react";
import { render } from "react-dom";
import Web3Provider, { Connectors } from "web3-react";
import App from "./App.js"
import './index.css';

const InfuraConstants = require('./constants/Infura.js');

const {
  MetaMaskConnector,
  NetworkOnlyConnector
} = Connectors;

const MetaMask = new MetaMaskConnector();

const Infura = new NetworkOnlyConnector({
  providerURL: InfuraConstants.URL
});

const connectors = { MetaMask, Infura };

var app = null;

class AppWrapper extends Component {
  constructor() {
    super();

    app = this;
  }

  render() {
    return (
      <Web3Provider connectors={connectors} libraryName="web3.js">
        <App app={app}/>
      </Web3Provider>
    );
  }
}

const rootElement = document.getElementById("root");
render(<AppWrapper />, rootElement);
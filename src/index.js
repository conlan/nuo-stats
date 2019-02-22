import * as React from "react";
import { render } from "react-dom";
import Web3Provider, { Connectors } from "web3-react";
import App from "./App.js"

const {
  MetaMaskConnector,
  NetworkOnlyConnector
} = Connectors;

const MetaMask = new MetaMaskConnector();

const Infura = new NetworkOnlyConnector({
  providerURL: "https://mainnet.infura.io/v3/3f0fa5d9c4064d6e8427efac291d66df"
});

const connectors = { MetaMask, Infura };

function AppWrapper() {
  return (
    <Web3Provider connectors={connectors} libraryName="web3.js">
      <div className="App">
        <App />
      </div>
    </Web3Provider>
  );
}

const rootElement = document.getElementById("root");
render(<AppWrapper />, rootElement);

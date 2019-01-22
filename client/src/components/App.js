import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import CryptoCard from './CryptoCard'

class App extends Component {
  state = { walletInfo: {} };

  componentDidMount() {
    fetch(`${document.location.origin}/api/wallet-info`)
      .then(response => response.json())
      .then(json => this.setState({ walletInfo: json }));
  }

  render() {
    const { address, balance } = this.state.walletInfo
    const coinData = {
      name: 'Bitcoin',
      symbol: 'BTC'
    }

    return(
      <div>
        <CryptoCard
          name={coinData.name}
          symbol={coinData.symbol}
          className="crypto-card"
        />
      <div className='App'>
      <img className='logo' src={logo}></img>
      <br />

       <h1> Welcome to the blockchain!!!</h1>
        <br />
        <div><Link to='/blocks'>Blocks</Link></div>
        <div><Link to='/conduct-transaction'>Conduct a Transaction</Link></div>
        <div><Link to='/transaction-pool'>Transaction Pool</Link></div>
        <br />
        <div className='WalletInfo'>
          <div>Address: {address}</div>
          <div>Balance: {balance}</div>
        </div>
        </div>
      </div>
    )
  }
}

export default App;

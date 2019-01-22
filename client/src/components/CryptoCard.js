import React from 'react'
import bitcoin from '../assets/bitcoin.png'

class CryptoCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: props.name,
      symbol: props.symbol,
      price: null,
      lastPrice: null,
    }

    this.pollPrice = this.pollPrice.bind(this)
  }

  componentDidMount() {
    this.pollPrice()
    setInterval(this.pollPrice, 10000)
  }

  pollPrice() {
    console.log('polling for new price')
    const { symbol } = this.state
    fetch(`https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=${symbol},USD`)
      .then(resp => resp.json())
      .then(json => {
        this.setState((prevState) => ({
          price: json.USD,
          lastPrice: prevState.price !== json.USD
            ? prevState.price
            : prevState.lastPrice
        }))
      })
  }

  priceChange(lastPrice, price) {
    const diff = lastPrice - price
    const change = diff / lastPrice
    const percent = -(change * 100)
    return (change === -Infinity
      ? 0
      : percent).toFixed(3)
  }

  render() {
    const { name, symbol, price, lastPrice } = this.state
    const gainloss = lastPrice > price
      ? 'loss'
      : 'gain'

    return (
      <div className={`card ${gainloss}`}>
        <div className='top'>
          <div className='name'>
            {name}
            <span>({symbol})</span>
          </div>

          <div className={`percentage ${gainloss}`}>
            {this.priceChange(lastPrice, price)}%
          </div>
        </div>

        <div className='bottom'>
          <div className='bitcoin'>
            <img id="bitcoin" src={bitcoin} alt={symbol} />
          </div>

          <div className={`price ${gainloss}`}>
            ${price}
            <span className={`triangle`} />
          </div>
        </div>
      </div>
    )
  }
}

export default CryptoCard

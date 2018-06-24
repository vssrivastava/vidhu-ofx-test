import React, { Component } from 'react';

import QuoteForm from './components/QuoteForm/QuoteForm';
import Quote from './components/Quote/Quote';

import {fetchQuote} from './services/fetchService';

import './App.css';

class App extends Component {
  initialState = {
    quote: null
  };

  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.getQuote = this.getQuote.bind(this);
    this.startOver = this.startOver.bind(this);
  }

  /**
   * reset the state to start over the quick quote flow
   */
  startOver() {
    this.setState(this.initialState);
  }

  /**
   * Fetch the conversion quote for the currencies and amount provided
   * @param {String} from currency code
   * @param {String} to currency code
   * @param {Number} amount to be converted
   */
  getQuote(from, to, amount) {
    fetchQuote(from, to, amount).then(res => {
      this.setState({
        quote: {
          fromCurrency: from,
          fromAmount: amount,
          toCurrency: to,
          toAmount: res.CustomerAmount,
          rate: res.CustomerRate
        }
      });
    });
  }
  
  render() {
    const comp = this.state.quote
      ? (<Quote quote={this.state.quote} onClick={this.startOver} />)
      : (<QuoteForm onSubmit={this.getQuote} />);

    return (
      <div className="app">
        <h1>Quick Quote</h1>
        {comp}
      </div>
    );
  }
}

export default App;

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

  startOver() {
    this.setState(this.initialState);
  }
  getQuote(id) {
    fetchQuote(id).then(res => {
      this.setState({
        quote: {
          fromCurrency: '',
          fromAmount: '',
          toCurrency: '',
          toAmount: '',
          rate: ''
        }
      });
    });
  }
  
  render() {
    const comp = this.state.quote
      ? (<Quote onClick={this.startOver} />)
      : (<div className="quote-form">
          <QuoteForm />
        </div>);

    return (
      <div className="app">
        <h1>Quick Quote</h1>
        {comp}
      </div>
    );
  }
}

export default App;

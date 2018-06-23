import React from 'react';
import './Quote.css';

const Quote = ({quote, onClick}) => (
  <div className="quote-info">
    <div className='quote-rate-wrapper'>
      <label>OFX Customer Rate</label>
      <div className='quote-rate'>{quote.CustomerRate}</div>
    </div>
    <div className='quote-details'>
    <label>From</label>
    <div><span className='currency'></span><span className='amount'></span></div>
    <label>To</label>
    <div><span className='currency'></span><span className='amount'></span></div>
    </div>
    <div className='done-btn-wrapper'>
      <button id='btn-start-over' onClick={onClick}>
        START NEW QUOTE
      </button>
    </div>
  </div>
);

export default Quote;

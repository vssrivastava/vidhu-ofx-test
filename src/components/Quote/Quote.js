import React from 'react';
import './Quote.css';

/**
 * Component to render the quote details
 * @param {Object} props 
 */
const Quote = ({quote, onClick}) => {
  const { fromCurrency, fromAmount, toCurrency, toAmount, rate } = quote;

  return (
    <div className="quote-info">
      <div className='quote-rate-wrapper'>
        <label>OFX Customer Rate</label>
        <div className='quote-rate'>{rate}</div>
      </div>
      <div className='quote-details'>
      <label>From</label>
      <div><span className='currency'>{fromCurrency}</span><span className='amount'>
        {Intl.NumberFormat(['en-US','en-AU'], {minimumFractionDigits: 2}).format(fromAmount)}
      </span></div>
      <label>To</label>
      <div><span className='currency'>{toCurrency}</span><span className='amount'>
      {Intl.NumberFormat(['en-US','en-AU'], {minimumFractionDigits: 2}).format(toAmount)}
      </span></div>
      </div>
      <div className='done-btn-wrapper'>
        <button id='btn-start-over' onClick={onClick}>
          START NEW QUOTE
        </button>
      </div>
    </div>
  );
};

export default Quote;

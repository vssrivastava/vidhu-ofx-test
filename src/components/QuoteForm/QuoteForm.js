import React, { Component } from 'react';
import Field from '../Field/Field';

import formData from '../../data/fields.json';

import './QuoteForm.css';

class QuoteForm extends Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(e) {
    if (e) {
      e.preventDefault();
    }
  }

  render() {
    return (
      <div id='ofx-quote-form'>
        <form id='quote-form' onSubmit={this.submitForm}>
          {formData && formData.userForm && formData.userForm.map((fieldData, ind) => 
            <Field key={`usr-field-${ind}`} {...fieldData} />
          )}
          <div className='currency-section'>
            {formData && formData.currencyForm && formData.currencyForm.map((fieldData, ind) => 
              <Field key={`cur-field-${ind}`} {...fieldData} />
            )}
            <div className='button-wrapper large-12 small-12'>
              <button className='icon-right' id='btn-submit' onClick={this.submitForm}>GET QUOTE</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default QuoteForm;

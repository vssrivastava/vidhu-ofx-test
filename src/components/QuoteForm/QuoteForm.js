import React, { Component } from 'react';
import Field from '../Field/Field';

import formData from '../../data/fields.json';

import './QuoteForm.css';

/**
 * Component to render the quote form
 */
class QuoteForm extends Component {
  initialState = {
    formValid: true,
    errorMessage: null
  }
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.submitForm = this.submitForm.bind(this);
    this.isFormValid = this.isFormValid.bind(this);
  }

  /**
   * validate the form before submission.
   * In an official project it is advised to use react-form or redux-form addons for comprehensive coverage of all features
   */
  isFormValid() {
    const allFields = Array.from(document.forms['quote-form'].querySelectorAll('input, select'));
    let hasError = false;
    allFields.forEach(field => {
      // if there is already an error, return
      if (hasError) return;
      const classList = Array.from(field.classList);

      // if a required field has not been entered
      if ((classList.includes('required') && !field.value)) {
        hasError = true;
        this.setState({
          formValid: false,
          errorMessage: 'Please fill all required fields before submitting.'
        });
      }
      // if any field has error
      if (classList.includes('has-error')) {
        hasError = true;
        this.setState({
          formValid: false,
          errorMessage: 'One or more fields have an error. Please fix all the errors before submitting.'
        });
      }
    })
    if (!hasError) {
      // if both from and to currencies are same
      if (document.querySelector('#to-currency').value === document.querySelector('#from-currency').value) {
        hasError = true;
        this.setState({
          formValid: false,
          errorMessage: 'From and To currencies can not be the same.'
        });
      }
    }
    return !hasError;
  }
  /**
   * validate and submit Form
   * @param {Object} e event
   */
  submitForm(e) {
    if (e) {
      e.preventDefault();
    }
    if (!this.isFormValid()) return;

    const formValues = new FormData(document.forms['quote-form']);
    this.props.onSubmit(
      formValues.get('from-currency'),
      formValues.get('to-currency'),
      parseFloat(formValues.get('amount').replace(/,/g, ''))
    );
  }

  render() {
    const onAmountBlur = field => {
     field.value = Intl.NumberFormat(['en-US','en-AU'], {minimumFractionDigits: 2}).format(field.value.replace(/,/g, ''));
    }
    // render the form field based on the data provided in ../../data/fields.json
    return (
      <div id='ofx-quote-form'>
        {!this.state.formValid && <div className='form-error'>{this.state.errorMessage}</div>}
        <form id='quote-form' onSubmit={this.submitForm}>
          <div className='user-section clearfix'>
            {formData && formData.userForm && formData.userForm.map((fieldData, ind) => 
              <Field key={`usr-field-${ind}`} {...fieldData} />
            )}
          </div>
          <div className='currency-section clearfix'>
            {formData && formData.currencyForm && formData.currencyForm.map((fieldData, ind) => 
              <Field key={`cur-field-${ind}`} {...fieldData} onBlur={fieldData.name === 'amount' ? onAmountBlur : null} />
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

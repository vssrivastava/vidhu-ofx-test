import React, { Component } from 'react';
import './Field.css';

/**
 * Component to render form fields based on the JSON data provided (ref to fields.json)
 * Validation and error handling of form fields
 */
class Field extends Component {
  initialState = {
    errorMsg: null
  };

  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.fieldRef = React.createRef();
    this.getInput = this.getInput.bind(this);
    this.validate = this.validate.bind(this);
  }

  /**
   * Validate the field against the validator provided
   */
  validate() {
    const {validator, required} = this.props;
    
    // don't do anything if no validator is provided and the field is optional
    if (!validator && !required) return;

    const fieldValue = this.fieldRef.current.value;
    
    // required field is empty
    if (required && !fieldValue) {
      this.setState({
        errorMsg: 'This field is required.'
      });
      return;
    }
    // field has invalid input
    if (validator && fieldValue) {
      if (!(new RegExp(validator).test(fieldValue))) {
        this.setState({
          errorMsg: 'Please enter a valid value'
        });
        return;
      }
    }
    // no error
    this.setState(this.initialState);
  }

  /**
   * render the correct field based on 'type' prop
   */
  getInput() {
    const {type, required, name, label, selectLabel, options} = this.props;
    const hasError = !!this.state.errorMsg;
    const classes = [
      required ? 'required' : '',
      hasError ? 'has-error' : ''
    ].join(' ');

    if (type === 'select') {
      return (
        <div className='select-wrapper'>
          <select className={classes} name={name} id={name} ref={this.fieldRef}>
          {options && options.map((option, ind) =>
            <option key={`option-${ind}`} value={option.value}>{option.label}</option>
          )}
          </select>
        </div>
      );
    } else if (type === 'combo') {
      return (
        <div className='combo-input'>
          <div className='select-wrapper'>
            <select name={`${name}-select`} id={`${name}-select`} aria-label={selectLabel} >
            {options && options.map((option, ind) => 
              <option key={`option-${ind}`} value={option.value}>{option.label}</option>
            )}
            </select>
          </div>
          <input
            type='text'
            name={name}
            id={name}
            className={classes} 
            required={required}
            aria-required={required}
            aria-invalid={hasError}
            placeholder={label}
            ref={this.fieldRef}
            onBlur={() => { this.validate(); }}
          />
        </div>
      );
    }
    return (
      <input
        type='text'
        name={name}
        id={name}
        className={classes}
        required={required}
        aria-required={required}
        aria-invalid={hasError}
        placeholder={label}
        ref={this.fieldRef}
        onBlur={() => { this.validate(); }}
      />
    );
  }

  render() {
    const {label, name, required, grid} = this.props;
    const errorMsg = this.state.errorMsg;
    const classes = [
      'form-field',
      grid,
      required ? 'required' : '',
      errorMsg ? 'has-error' : ''
    ].join(' ');
    return (
      <div className={classes}>
        <label htmlFor={name}>{label}{required && <span aria-hidden='true' className='asterisk'>*</span>}</label>
        {this.getInput()}
        {errorMsg &&
          <div className='error-message'>{errorMsg}</div>
        }
      </div>
    );
  }
};

export default Field;

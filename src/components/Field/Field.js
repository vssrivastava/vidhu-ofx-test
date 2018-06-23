import React, { Component } from 'react';
import './Field.css';

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

  resetError() {
    this.setState({
      errorMsg: 'Please enter a valid value'
    });
  }
  validate() {
    const {validator, required} = this.props;
    console.log('validating');
    
    if (!validator && !required) return;

    const fieldValue = this.fieldRef.current.value;
    console.log('value', fieldValue);
    
    if (required && !fieldValue) {
      console.log('invalid');
      this.setState({
        errorMsg: 'This field is required.'
      });
      return;
    }
    if (validator && fieldValue) {
      console.log('is valid?', new RegExp(validator).test(fieldValue));
      if (!(new RegExp(validator).test(fieldValue))) {
        this.setState({
          errorMsg: 'Please enter a valid value'
        });
        return;
      }
    }

    this.setState(this.initialState);
  }

  getInput() {
    const {type, name, label, options} = this.props;
    if (type === 'select') {
      return (
        <select name={name} id={name} ref={this.fieldRef}>
        {options && options.map((option, ind) =>
          <option key={`option-${ind}`} value={option.value}>{option.label}</option>
        )}
        </select>
      );
    } else if (type === 'combo') {
      return (
        <div className='combo-input'>
          <select name={name} id={`${name}-select`} >
          {options && options.map((option, ind) => 
            <option key={`option-${ind}`} value={option.value}>{option.label}</option>
          )}
          </select>
          <input type='text' name={name} id={name} placeholder={label} ref={this.fieldRef} onBlur={() => { this.validate(); }}/>
        </div>
      );
    }
    return (
      <input type='text' name={name} id={name} placeholder={label} ref={this.fieldRef} onBlur={() => { this.validate(); }} />
    );
  }
  render() {
    const {label, required, grid} = this.props;
    const errorMsg = this.state.errorMsg;
    const classes = [
      'form-field',
      grid,
      required ? 'required' : '',
      errorMsg ? 'has-error' : ''
    ].join(' ');
    return (
      <div className={classes}>
        <label>{label}{required && <span className='asterix'>*</span>}</label>
        {this.getInput()}
        {errorMsg &&
          <div className='error-message'>{errorMsg}</div>
        }
      </div>
    );
  }
};

export default Field;

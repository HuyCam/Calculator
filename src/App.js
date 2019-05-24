import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Display from './components/display';
import ButtonContain from './components/button-container';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayValue: '0',
      currentTotal: 0,
      inputValue: '0',
      mathSequence: '',
      currentOperator: ''
    };

    // button Value button on the calculator 1 2 3 * + / , etc
    this.buttons = [
      {
        value: '%',
        type: 'modifier'
      },
      {
        value: '√',
        type: 'modifier'
      },
      {
        value: 'x^2',
        type: 'modifier'
      },
      {
        value: '1/x',
        type: 'modifier'
      },
      {
        value: 'CE',
        type: 'reset'
      },
      {
        value: 'C',
        type: 'reset'
      },
      {
        value: 'Del',
        type: 'modifier'
      },
      {
        value: '÷',
        type: 'operator'
      },
      {
        value: '7',
        type: 'number'
      },
      {
        value: '8',
        type: 'number'
      },
      {
        value: '9',
        type: 'number'
      },
      {
        value: '×',
        type: 'operator'
      },
      {
        value: '4',
        type: 'number'
      },
      {
        value: '5',
        type: 'number'
      },
      {
        value: '6',
        type: 'number'
      },
      {
        value: '-',
        type: 'operator'
      },
      {
        value: '1',
        type: 'number'
      },
      {
        value: '2',
        type: 'number'
      },
      {
        value: '3',
        type: 'number'
      },
      {
        value: '+',
        type: 'operator'
      },
      {
        value: '±',
        type: 'modifier'
      },
      {
        value: '0',
        type: 'number'
      },
      {
        value: '.',
        type: 'modifier'
      },
      {
        value: '=',
        type: 'result'
      }
    ];

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e, button) {
    let currentInput = this.state.inputValue;

    // button value here is either a number or operator
    const value = button.value;
    
    switch(button.type) {
      case 'number':
          currentInput = currentInput + value;
          
          // check if there is a leading zero
          if (currentInput.charAt(0) === '0' && currentInput.length > 1) {
            currentInput = currentInput.slice(1);

            // when we inputing the value, the current input gonna be displayValue,
            // sometime it won't be the same, like when you hit the operator. The
            // display value stay the same but the inputValue is reset to empty string.
            this.setState({displayValue: this.inputThousandSeperator(currentInput), inputValue: currentInput},);
            
          } else {
            this.setState({displayValue: this.inputThousandSeperator(currentInput), inputValue: currentInput});
          }
        break;
      case 'operator': 
          // if user has hit operator button. Check if there is current input number or current calculation in process.
          // because if user hit equal sign, their will be no currentOperator in process.
          if (this.state.inputValue ) {
            this.operatorHandling(value, currentInput);
          } else {
            this.updateMathSequence('', value);
            this.setState({ currentOperator: value})
          }
        break;
      case 'modifier':
        this.modifyValue(value);
        break;
      case 'result':
          // check if user input something after an operator
          if (this.state.inputValue) {
            // if user hit equal sign, calculate total
          this.updateMathSequence(this.state.inputValue);
          this.calculateTotal();
          this.setState({
            currentOperator: '',
            inputValue: ''
          });
          }
          
          break;
      case 'reset':
          if (value === 'CE') {
            this.setState({ displayValue: '0', inputValue: ''});
          } else {
            this.setState({
              displayValue: '0',
              currentTotal: 0,
              inputValue: '',
              mathSequence: '',
              currentOperator: ''
            });
          }
          break;
        
    }
  }

  // this take a number input then return a string with thousand seperator: like 1,000,000
  // this should work with any setState method change the displayValue
  // NOTE: work with only integer and decimal
  inputThousandSeperator(numb) {
    const arrNumb = numb.toString().split('.'); // this is array of string type number
    if (arrNumb.length === 1) {
      // regualr expression to put thousand serperator
      return numb.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    } else {
      const integerPart = arrNumb[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
      const decimalPart =arrNumb[1];
      if (decimalPart.length > 2) {
        return parseFloat(integerPart + '.' + decimalPart).toFixed(2).toString().replace(/^(\d+\.\d*?[1-9])0+$/g, '$1');
      }
      return integerPart + '.' + decimalPart;
    }
    
  }

  updateMathSequence(numb = '', operator = '') {
    const mathSequence = `${this.state.mathSequence} ${numb} ${operator}`;
    this.setState({ mathSequence: mathSequence});
  }

  operatorHandling(value, oldInput) {
      let mathSequence = this.mathSequence;
     // if this is first calculation
     if (!this.state.currentOperator) {
        // update math sequence
        this.updateMathSequence(oldInput, value);
        this.setState({inputValue: '', currentTotal: this.convertNumb(oldInput) , currentOperator: value});
      } else {
        this.updateMathSequence(oldInput, value);
        this.calculateTotal();
        this.setState({currentOperator: value});
          
        // reset input value
        this.setState({inputValue: ''});
      }   
  }

  modifyValue(value) {
    const input = this.convertNumb(this.state.inputValue);
    if (!input) {
      return;
    }
    // for the special operator, we change input instantly
    let newInput;
    switch(value) {
      case '√':
        newInput = Math.sqrt(input).toString();
        this.updateInputnDisplay(newInput);
        break;
      case 'x^2':
        newInput = (input * input).toString();
        this.updateInputnDisplay(newInput);
        break; 
      case '%':
        newInput = (input/100).toString();
        this.updateInputnDisplay(newInput);
        break;
      case '1/x':
        newInput = (1/input).toString();
        this.updateInputnDisplay(newInput);
        break;
      case '±':
        newInput = (-input).toString();
        this.updateInputnDisplay(newInput);
        break;
      case '.':
        newInput = input.toString() + '.';
        this.updateInputnDisplay(newInput);
        break;
      case 'Del':
        const inputStr = input.toString();
        newInput = inputStr.slice(0, inputStr.length - 1);
        if (newInput.length === 0 ) {
          this.updateInputnDisplay('0');
        } else {
          this.updateInputnDisplay(newInput);
        }
        break;
    }
  }

  //update inputValue and displayValue, this function is usually used in modifyValue
  updateInputnDisplay(newInput) {
    this.setState({inputValue: newInput, displayValue: this.inputThousandSeperator(newInput)});
  }

  //sometime number is a integer, sometime it is float, we have to check to use parseFloat or parseInt
  convertNumb(numb) {
    if (parseFloat(numb) == undefined) {
      return parseInt(numb);
    } else {
      return parseFloat(numb);
    }
  }
  
  // calculate total base on the input then update the currentTotal
  calculateTotal() {
    const {currentTotal, inputValue, currentOperator } = this.state;

    let newCurTotal;
    switch (currentOperator) {
      case '+':
        newCurTotal = this.convertNumb(currentTotal) + this.convertNumb(inputValue);
        this.updateCalculation(newCurTotal);
        break;
      case '-':
        newCurTotal = this.convertNumb(currentTotal) - this.convertNumb(inputValue);
        this.updateCalculation(newCurTotal);
        break;

      case '×':
        newCurTotal = this.convertNumb(currentTotal) * this.convertNumb(inputValue);
        this.updateCalculation(newCurTotal);
        break;
      case '÷':
        newCurTotal = this.convertNumb(currentTotal) / this.convertNumb(inputValue);
        this.updateCalculation(newCurTotal);
        break;
    }
  } 

  updateCalculation(newCurTotal) {
    // this.inputThousandSeperator(
    this.setState({currentTotal: newCurTotal, displayValue: this.inputThousandSeperator(newCurTotal.toString())});
  }

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <Display className="Calculator-screen" value={this.state.displayValue}/>
        <div>{this.state.mathSequence ? this.state.mathSequence : 'math sequence' } </div>
        <div className="input-pad">
            <ButtonContain buttons={this.buttons} clickEvent={this.handleClick}/>
        </div>
      </div>
    );
  }
}

export default App;

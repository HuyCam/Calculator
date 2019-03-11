import React, { Component } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Display from './components/display';
import ButtonContain from './components/button-container';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayValue: '0',
      currentTotal: 0,
      inputValue: '',
      mathSequence: '',
      currentOperator: ''
    };

    // button Value button on the calculator 1 2 3 * + / , etc
    this.buttons = [
      {
        value: '%',
        type: 'operator'
      },
      {
        value: '√',
        type: 'operator'
      },
      {
        value: 'sqr',
        type: 'operator'
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
        type: 'decimal-point'
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
            this.setState({displayValue: currentInput, inputValue: currentInput},);
            
          } else {
            this.setState({displayValue: currentInput, inputValue: currentInput});
          }
        break;
      case 'operator': 
          if (this.state.inputValue) {
            this.operatorHandling(value, currentInput);
          }
          
        break;
    }
  }

  componentDidMount() {
    //this.setState({displayValue: this.state.displayValue, inputValue: this.state.inputValue});
    
  }

  operatorHandling(value, oldInput) {
     // if this is first calculation
     if (!this.state.currentOperator) {
      this.setState({inputValue: '', currentTotal: this.convertNumb(oldInput) , currentOperator: value});
    }
    switch (value) {
      case '+':
        //there is previous calculation needed to be done
          //calculate new currentTotal
          this.calculateTotal();
          this.setState({currentOperator: value});
          //reset input value
          this.setState({inputValue: ''});
        
        break;
      case '-':
        this.calculateTotal();
        this.setState({currentOperator: value});
        //reset input value
        this.setState({inputValue: ''});
        break;
      case '×':
        this.calculateTotal();
        this.setState({currentOperator: value});
        
        // reset input value
        this.setState({inputValue: ''});
        break;
      case '÷':
        this.calculateTotal();
        this.setState({currentOperator: value});
        
        // reset input value
        this.setState({inputValue: ''});
        break;
    }
  }

  //sometime number is a integer, sometime it is float, we have to check to use parseFloat or parseInt
  convertNumb(numb) {
    if (parseFloat(numb) == undefined) {
      return parseInt(numb);
    } else {
      return parseFloat(numb);
    }
  }
  
  calculateTotal() {
    const {currentTotal, inputValue, currentOperator } = this.state;

    let newCurTotal;
    switch (currentOperator) {
      case '+':
        newCurTotal = this.convertNumb(currentTotal) + this.convertNumb(inputValue);
        this.setState({currentTotal: newCurTotal, displayValue: newCurTotal.toString()});
        break;
      case '-':
        newCurTotal = this.convertNumb(currentTotal) - this.convertNumb(inputValue);
        this.setState({currentTotal: newCurTotal, displayValue: newCurTotal.toString()});
        break;

      case '×':
        newCurTotal = this.convertNumb(currentTotal) * this.convertNumb(inputValue);
        this.setState({currentTotal: newCurTotal, displayValue: newCurTotal.toString()});
        break;
      case '÷':
        newCurTotal = this.convertNumb(currentTotal) / this.convertNumb(inputValue);
        this.setState({currentTotal: newCurTotal, displayValue: newCurTotal.toString()});
        break;
    }
  } 

  render() {
    return (
      <div className="App">
        <Display className="Calculator-screen" value={this.state.displayValue}/>
        <div>math sequence</div>
        <div className="input-pad">
            <ButtonContain buttons={this.buttons} clickEvent={this.handleClick}/>
        </div>
      </div>
    );
  }
}


//            <Button className="Numb-pad" button={this.buttons['1']} clickEvent={this.handleClick} />


export default App;

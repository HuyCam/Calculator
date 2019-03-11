import React, { Component } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Display from './components/display';
import Button from './components/button';
import ButtonContain from './components/button-container';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayValue: '0',
      calculationValue: 0
    };

    // button Value button on the calculator 1 2 3 * + / , etc
    this.buttons = [
      {
        value: '%',
        type: 'operator'
      },
      {
        value: 'sqrt',
        type: 'operator'
      },
      {
        value: 'sqr',
        type: 'operator'
      },
      {
        value: '1/x',
        type: 'value modifier'
      },
      {
        value: 'CE',
        type: 'modifier'
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
        value: '0',
        type: 'number'
      },
      {
        value: '+',
        type: 'operator'
      }
    ];

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e, button) {
    let displayValueNumb, displayValueString;
    const value = button.value;

    if (button.type === 'number' ) {
      displayValueString = this.state.displayValue + value;
      // check if there is a leading zero
      if (displayValueString.charAt(0) === '0') {
        displayValueString = displayValueString.slice(1);
        this.setState({displayValue: displayValueString});
      } else {
        this.setState({displayValue: displayValueString});
      }
    }
  }
  
  render() {
    return (
      <div className="App">
        <Display className="Calculator-screen" value={this.state.displayValue}/>
        <div className="input-pad">
            <ButtonContain buttons={this.buttons} clickEvent={this.handleClick}/>
        </div>
      </div>
    );
  }
}


//            <Button className="Numb-pad" button={this.buttons['1']} clickEvent={this.handleClick} />


export default App;

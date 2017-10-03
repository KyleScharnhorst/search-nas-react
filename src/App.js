import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    updateDB(e) {
        e.preventDefault();
        console.log('Updating DB.');
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Search NAS Utility</h1>
                </header>
                <p className="App-update">
                    To manually update the search database click&nbsp;
                    <button onClick={this.updateDB}>
                        here
                    </button>. Keep in mind this is automatically done once a day.
                </p>
                <p className="App-search">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
            </div>
        );
    }
}

export default App;

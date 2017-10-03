import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {isUpdating: false};
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async updateDB(e) {
        e.preventDefault();
        this.setState({isUpdating: true});
        console.log(this.state);
        console.log('Updating DB.');
        await this.sleep(2000);
        this.setState({isUpdating: false});
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Search NAS Utility</h1>
                </header>
                {
                    this.state.isUpdating ? <p className="App-update">Updating...</p> :
                        <p className="App-update">
                            To manually update the search database click&nbsp;
                            <button onClick={this.updateDB.bind(this)}>
                                here
                            </button>. Keep in mind this is automatically done once a day.
                        </p>
                }
                <p className="App-search">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
            </div>
        );
    }
}

export default App;

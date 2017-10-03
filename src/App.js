import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUpdating: false,
            isSearching: false,
            searchValue: "",
        };
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async updateDB(e) {
        e.preventDefault();
        this.setState({isUpdating: true});
        console.log('Updating DB.');
        //make update call on restful api.
        await fetch('http://localhost:8080/api/update')
            .then(function(response) {
                console.log(response.json());
            }).catch(function(error) {
            console.log('Request failed', error)
        });
        this.setState({isUpdating: false});
    }

    async searchNAS(e) {
        e.preventDefault();
        this.setState({isSearching: true});
        var request = 'http://localhost:8080/api/search/' + encodeURI(this.state.searchValue)
        console.log('search request: ' + request);
        //make update call on restful api.
        await fetch(request)
            .then(function(response) {
                console.log(response.json());
            }).catch(function(error) {
                console.log('Request failed', error)
            });
        this.setState({isSearching: false});
    }

    handleSearchOnChange(e) {
        this.setState({searchValue: e.target.value});
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={require("./images/RickandMortyPortal.png")} className="App-logo" alt="logo" />
                    <h1 className="App-title">Search NAS Files</h1>
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
                {
                    this.state.isSearching ? <p className="App-search">Searching...</p> :
                        <form className="App-search" onSubmit={this.searchNAS.bind(this)}>
                            <label>
                                Search:&nbsp;
                                <input type="text" value={this.state.searchValue} onChange={this.handleSearchOnChange.bind(this)}/>
                            </label>
                            <input type="submit" value="Submit" />
                        </form>
                }
            </div>
        );
    }
}

export default App;

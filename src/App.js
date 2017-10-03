import React, { Component } from 'react';
import './App.css';

const HOST = 'home.search';
const API_PORT = '8080';
const API = 'api';
const HTTP = 'http://'
const API_UPDATE = `${API}/update`;
const API_SEARCH = `${API}/search/`;
const UPDATE_REQUEST = `${HTTP}${HOST}:${API_PORT}/${API_UPDATE}`;
const SEARCH_REQUEST = `${HTTP}${HOST}:${API_PORT}/${API_SEARCH}`;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUpdating: false,
            isSearching: false,
            searchValue: "",
            searchResults: [],
        };
    }

    async updateDB(e) {
        e.preventDefault();
        this.setState({isUpdating: true});
        console.log('Updating DB.');
        //make update call on restful api.
        await fetch(UPDATE_REQUEST)
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
        var request = SEARCH_REQUEST + encodeURI(this.state.searchValue)
        console.log('search request: ' + request);
        //make update call on restful api.
        await fetch(request)
            .then(function(response) {
                const json = response.json();
                console.log(json);
                this.setState({searchResults: json.results});
            }).catch(function(error) {
                console.log('Request failed', error)
            });
        this.setState({isSearching: false});
    }

    handleSearchOnChange(e) {
        this.setState({searchValue: e.target.value});
    }

    SearchResultsList(props) {
        const listItems = props.results.map((item) => { return (<li>{item}</li>) });
        return (
            <ul>
                {listItems}
            </ul>
        );
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
                <this.SearchResultsList results={this.state.searchResults}/>
            </div>
        );
    }
}

export default App;

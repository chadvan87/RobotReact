import React, { Component } from "react";
import CardList from "../components/CardList";
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from "../components/Scroll";
import ErrorBoundry from "../components/ErrorBoundry";

class App extends Component{
    constructor(){
        super() //phai dung cai nay khi xai constructor
        this.state = {
            robots: [],
            searchfield: ''
        }
    }
    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response =>{return response.json();})

        .then(users =>{ this.setState({robots: users})});
    }
    onSearchChange = (event) =>{
        this.setState({searchfield: event.target.value}) //change the state
        
    }

    render(){
        const filteredRobots = this.state.robots.filter(robots =>{
            return robots.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
        })
        if (this.state.robots.length === 0){
            return <h1>Loading</h1>
        }else{
            return(
                <div className="tc">
                <h1 className="f1">Robot Friends</h1>
                <SearchBox seachchange={this.onSearchChange}/>
                <Scroll>
                <ErrorBoundry>
                <CardList robots={filteredRobots}/>
                </ErrorBoundry>
                </Scroll>
                </div>
            );
        }
        
    }
}
export default App;
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './search.css';

class Search extends Component {
  constructor(props){
    super(props);
    this.state = {
      destination: null,
      field: "",
    };
  }
  componentDidMount(){
    this.searchField.focus();
  }
  search(e) {
    e.preventDefault();
    console.log(this.state.field);
  }

  updateField(e){
    this.setState({field: e.target.value});
  }
  createDriverRoute(){

  }
  createPassengerRoute(){

  }

  render() {
    return (
      <div className="search">
        <form onSubmit={this.search.bind(this)}>
          <label>
            <input
              ref={(input) => { this.searchField = input; }} 
              onChange={this.updateField.bind(this)}
              name='destination' type='text'></input>
          </label>
          <input value='search' type='submit'/>
        </form>
        {this.state.destination ?
          (<div>
            <Link to='/driver'><button>Drive</button></Link>
            <Link to='/passenger'><button>Ride</button></Link>
          </div>) : <span></span>
        }

      </div>
    );
  }
}

export default Search;

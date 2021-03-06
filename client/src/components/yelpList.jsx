import React from 'react';
import Result from './Result.jsx';
// import YelpListEntry from './YelpListEntry.jsx';
import CreateGroup from './CreateGroup.jsx';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
const axios = require('axios');
import {withRouter} from "react-router-dom";

class YelpList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resturants : [],
      groups: [],
      showResult: false,
      selectedGroup: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  };

  componentWillMount() {
    let username = this.props.username;
    axios.post('/api/group', {username: username})
    .then(response => {
      const groupList = [];
      for (const res in response.data) {
        groupList.push(response.data[res].group_name)
      }
      this.setState({
        groups : groupList
      })
    })
  };

  handleSubmit(e) {
    e.preventDefault();
    const searchData = {};
    for (const ref in this.refs) {
      if (ref === 'price') {
        searchData[ref] = this.refs[ref].value.length;
      } else {
        searchData[ref] = this.refs[ref].value;
      }
    }
    e.target.reset();
    axios.post('/api/selection',searchData)
    .then(response => {
        this.setState({
          resturants : response.data
        });  
      }).catch(err => {
        console.log(err)
      })  
  };

render() {
      return (
      <div>
        <div className="container">
          <div className="row justify-content-center">
            <form onSubmit={this.handleSubmit}>
              <div className="form-inline" id="search-bar">
                <select ref="group" id="inlineFormCustomSelect" onChange={this.props.selectGroup}>
                  <option value="">Group</option>
                  {this.state.groups.map((group, i) => <option key={i} value={group}>{group}</option>)}
                </select>
                <input type="text" className="form-control" id="inlineFormInput" placeholder="type" ref="term"/>
                <input type="text" className="form-control" id="inlineFormInputGroup" placeholder="location" ref="location"/>
                <select ref="price" id="inlineFormCustomSelect">
                  <option>Price</option>
                  <option>$</option>
                  <option>$$</option>
                  <option>$$$</option>
                  <option>$$$$</option>
                </select>
                <button type="submit" className="btn btn-danger">Search</button>
              </div>
            </form>
      
            {this.state.resturants.map( resturant => 
              (<div>
                <img src ={resturant.image_url} id="img" className="rounded img-fluid img-thumbnail"/>
                <div className="row justify-content-center" id="restaurant">
                  <h3 id="restr" ><a href={resturant.url} target="_blank" id="grp-restaurant-name">{resturant.name}</a></h3>
                  <Link to = '/homepage/result'>
                    <button onClick={() => this.props.sendSuggestion(resturant)}>
                      Suggest!
                    </button>
                  </Link> 
                </div> 
              </div>)
            )}
          </div>
        </div>
      </div>
      ) 
    }
  }
  
  export default YelpList;
import React from 'react';
import YelpList from './YelpList.jsx';
import App from './App.jsx';
import Solo from './Solo.jsx';
import Login from './Login.jsx';
import CreateGroup from './CreateGroup.jsx';
const $ = require('jquery');
import {Button, ButtonToolbar,Navbar,Nav,NavItem,NavDropdown,MenuItem } from 'react-bootstrap';
import socketIOClient from "socket.io-client";
import firebase, {auth} from '../../../fireconfig.js';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';




class Homepage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        showSolo: false,
        showFriends: false,
        isHidden: false,
        createGroup: false
    };

    this.onFriendsClick = this.onFriendsClick.bind(this)
    this.onSoloClick = this.onSoloClick.bind(this)
    this.onCreateGroupClick = this.onCreateGroupClick.bind(this)
    this.onLogoutClick = this.onLogoutClick.bind(this)
    }

    componentDidMount() {
        const endpoint = "http://127.0.0.1:1128";
        const socket = socketIOClient("http://127.0.0.1:1128");
        
        socket.emit('randomNumber', {number: Math.random()});
        socket.on('heardRandomNumber', function(data){
            console.log('data', data);
        })
    }

    handleEvent(){
        this.state.socket.emit
    }

    onFriendsClick (e) {
      e.preventDefault();
        console.log('friends was clicked')
        this.setState({
            showSolo: false,
            showFriends: true
        });
      }
    onSoloClick (e) {
      e.preventDefault();
        console.log('solo was clicked')
        this.setState({
            showSolo: true,
            showFriends: false
        });
    }

    onCreateGroupClick() {
        console.log('create was clicked creategroup', this.state.createGroup, this.state.showSolo, this.state.showFriends)
        this.setState({
            createGroup: true,
            showSolo: false,
            showFriends: false
        });
    }

    onLogoutClick() {
        this.props.checkLogin(false);
        console.log('is it logged in?:', this.props.isLoggedIn)
        firebase.auth().signOut().then(function() {
            // Sign-out successful.

        
           }).catch(function(error) {
            // An error happened.
           });
    }

  render() {
    return (
        <Router>
    <div>
      <Navbar>
        <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Yelp Settle</a>
            </Navbar.Brand>
        </Navbar.Header>
          <Nav>
            <NavDropdown eventKey={3} title={this.props.username}  id="basic-nav-dropdown">
              <MenuItem onSelect={this.onCreateGroupClick} eventKey={3.1}>Create Group</MenuItem>
              <MenuItem divider />
              <MenuItem onSelect={() => {this.props.checkLogin(false)}} eventKey={3.2}>Log Out</MenuItem>

            </NavDropdown>
          </Nav>
        </Navbar>
        
        <img id ='title' src={require('../../dist/images/logo.png')} />

        {(!this.state.showSolo && !this.state.showFriends && !this.state.createGroup) && <ButtonToolbar>
            <Button bsStyle="danger" bsSize="large" onClick = {this.onSoloClick}><Link to='/solo'>Solo</Link></Button>
            <Button bsStyle="danger" bsSize="large" onClick = {this.onFriendsClick}><Link to='/friends'>Friends</Link></Button>
        </ButtonToolbar>}

        {this.state.createGroup && <CreateGroup setUsername = {this.props.setUsername}/>}
    
        {/* <Route path='/' component={App}/> */}
        <Route path='/solo' component={Solo}/>
        <Route path='/friends' component={YelpList}/>
        <Route path='/createGroup' component={CreateGroup}/>
    </div>
    </Router>
    ) 
  }
}

export default Homepage;
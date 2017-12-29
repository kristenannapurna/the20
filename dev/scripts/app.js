import React from 'react';
import ReactDOM from 'react-dom';
import firebase, { auth, provider } from './firebase'


import Header from './components/header';
import List from './components/list'


class App extends React.Component {
  constructor(){
    super();
    this.state = {
      user: null,
      clearList: false
    }
    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);
    this.addToList = this.addToList.bind(this);
  }
  componentDidMount(){
    auth.onAuthStateChanged((user) => {
      if(user) {
        this.setState({ user });
      }
    });

  }
  logout(){
    auth.signOut()
      .then(() => {
        this.setState({
          user: null,
          clearList: true
        });
      });
  }
  login(){
    auth.signInWithPopup(provider)
      .then((res)=> {
        const user = res.user;
        this.setState({
          user
        })
      })
  }
  addToList(item){
    const dbRef = firebase.database().ref(`/users/${this.state.user.uid}/list`);
    
    dbRef.push(item);

  }
    render() {
      return (
        <div>
          <Header user={this.state.user} login={this.login} logout={this.logout}/>
          <List addToList={this.addToList} clearList={this.state.clearList} userId={this.state.user ? this.state.user.uid : null}/> 
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));

import React from 'react';
import ReactDOM from 'react-dom';
import firebase, { auth, provider } from './firebase'


import Footer from './components/footer';
import Buttons from './components/buttons';
import DateHeader from './components/date';
import Dashboard from './components/dashboard';
// import List from './components/list'

let today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1;
let yyyy = today.getFullYear();

if (dd < 10) {
  dd = '0' + dd
}

if (mm < 10) {
  mm = '0' + mm
}

today = `${mm}-${dd}-${yyyy}`


class App extends React.Component {
  constructor(){
    super();
    this.state = {
      user: null,
      resetDay: 1,
      eighty: 50,
      twenty: 50
    }
    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);
    this.updateRatio = this.updateRatio.bind(this);
  }
  componentDidMount(){
    auth.onAuthStateChanged((user) => {
      if(user) {
        const dbRef = firebase.database().ref(`/users/${user.uid}/`);
    
        dbRef.on('value', (snapshot) => {

          console.log(snapshot.val())
          
          let { eighty, twenty } = snapshot.val().data[yyyy][mm][dd];

          let totalLogged = eighty + twenty;
          
          eighty = (eighty / totalLogged) * 100;
          twenty = (twenty / totalLogged) * 100;
          
          this.setState({
            eighty,
            twenty
          })

        });
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
  updateRatio(type){
    // e.preventDefault();
    
    const dbRef = firebase.database().ref(`/users/${this.state.user.uid}/data/${yyyy}/${mm}/${dd}/${type}`);

    dbRef.once('value', function(snapshot){
      if(snapshot.val() === null){
        dbRef.set(1)
      } else {
        dbRef.set(snapshot.val() + 1)
      }
    })

  }
    render() {
      return (
        <div>
          <div className="homepage">
            <DateHeader resetDay={this.state.resetDay} /> 
            <Buttons eighty={this.state.eighty} twenty={this.state.twenty} updateRatio={this.updateRatio}/>
            <Footer user={this.state.user} login={this.login} logout={this.logout}/>
          </div>
          <div className="dashboard">
            <Dashboard />
          </div>
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));

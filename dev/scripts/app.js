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
      twenty: 50, 
      mealsTracked: 0,
      data: {}
    }
    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);
    this.updateRatio = this.updateRatio.bind(this);
  }
  componentDidMount(){
    auth.onAuthStateChanged((user) => {
      if(user) {
        const dbRef = firebase.database().ref(`/users/${user.uid}/`);
        const dbRefUser = firebase.database().ref(`/users/${user.uid}/user`);

        const { displayName, email, photoURL} = user;
        dbRefUser.set({displayName, email, photoURL});
    
        dbRef.on('value', (snapshot) => {

          
          const { data } = snapshot.val()
          if(data){
            let { eighty, twenty } = snapshot.val().data[yyyy][mm][dd];
  
  
            if(twenty === undefined){
              twenty = 0;
            }
  
            if (eighty === undefined){
              eighty = 0;
            }
  
            let totalLogged = eighty + twenty;
            
            eighty = (eighty / totalLogged) * 100;
            twenty = (twenty / totalLogged) * 100;
            
            this.setState({
              eighty,
              twenty, 
              mealsTracked: totalLogged,
              data
            })

          }

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
            {this.state.user ? 
             ( <div>
               <DateHeader resetDay={this.state.resetDay} mealsTracked={this.state.mealsTracked} /> 
              <Buttons eighty={this.state.eighty} twenty={this.state.twenty} updateRatio={this.updateRatio}/>
              </div>
            )
              :
              <section className="loggedOut">
                <p>Must be logged in to see your stats and track data!</p>
              </section>
            
            }
            <Footer user={this.state.user} login={this.login} logout={this.logout}/>
          </div>
          {
            this.state.user ? 
          ( <div className="dashboard">
              <Dashboard data={this.state.data} today={{mm, dd, yyyy}} />
            </div>
          )
          :
          <div></div>
          }
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));

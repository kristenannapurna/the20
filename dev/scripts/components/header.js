import React , { Component } from 'react';

class Header extends Component {
  render(){
    return (
      <header>
        {this.props.user ? 
          ( <div>
              <div>
                <h2>Hello, {this.props.user.displayName}</h2>
                <img src={this.props.user.photoURL} alt={this.props.user.displayName}/>
              </div>
              <button onClick={this.props.logout}>Log Out</button>
            </div>
          )  
          : 
          <button onClick={this.props.login}>Log In</button>
      }
      </header>
    )
  }
}

export default Header;
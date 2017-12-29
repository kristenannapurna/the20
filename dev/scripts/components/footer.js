import React , { Component } from 'react';

class Footer extends Component {
  render(){
    return (
      <footer>
        {this.props.user ? 
          ( <div>
              <div>
                <p>Hello, {this.props.user.displayName}</p>
              </div>
              <button onClick={this.props.logout}>Log Out</button>
            </div>
          )  
          : 
          <button onClick={this.props.login}>Log In</button>
      }
      </footer>
    )
  }
}

export default Footer;
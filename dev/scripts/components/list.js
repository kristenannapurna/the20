import React, { Component } from 'react';
import firebase from '../firebase';

class List extends React.Component{
  constructor(){
    super();
    this.state = {
      item: '', 
      list: {}
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount(){
    
  }
  componentWillReceiveProps(nextProps){

    if(nextProps.clearList){
      this.setState({
        list: {}
      });
    }
    
    const userId = nextProps.userId;
  const dbRef = firebase.database().ref(`/users/${userId}`);


    dbRef.on('value', (snapshot) => {
     
        if(snapshot.val() !== null){
          this.setState({
            list: snapshot.val().list
          });
        }
      }
    )}
  
  componentWillUnmount(){
    const dbRef = firebase.database().ref(`/users/${userId}`);
    dbRef.off();
  }
  handleChange(e){
    this.setState({
      item: e.target.value
    })
  }
  handleSubmit(e){
  
    e.preventDefault();
   
    this.props.addToList(this.state.item)
    
    this.setState({
      item: ''
    })

  }
  render(){
    return (
  
        <div className="list">
          {this.props.userId ? 

          (
            <div>
              <form onSubmit={this.handleSubmit} >
                <label htmlFor="">Add to list</label>
                <input onChange={this.handleChange} type="text" value={this.state.item} />
              </form>
              <h2>This is a list of data unique to the logged in user</h2>
              <ul>
                {Object.keys(this.state.list).map((key) => {
                  return <li key={key}>{this.state.list[key]}</li>
                })}
              </ul>
            </div>
          )
          :
          (<div>Must be logged in to see anything!</div>)
          
        }  
        </div>
      )
    
    }
  }


export default List;
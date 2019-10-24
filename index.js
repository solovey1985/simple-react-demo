import React, { Component, useState } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import axios from 'axios';
import './style.css';
const testData = [
  {
    id: "1",
    avatar_url: "https://avatars2.githubusercontent.com/u/880?v=4",
    followers: 9,
    name: "Eugen Anghel"
  },
  {
    id: "2",
    avatar_url: "https://avatars2.githubusercontent.com/u/1456331?v=4",
    followers: 53,
    name: "Karim Frenn"
  },
  {
    id: "3",
    avatar_url: "https://avatars0.githubusercontent.com/u/195796?v=4",
    followers: 6,
    name: "410 Labs"
  }

];
class Form extends React.Component{
  state = {userName: ''};
  handleSubmit = async (event)=> {
    event.preventDefault();
    const resp = await  axios.get(`https://api.github.com/users/${this.state.userName}`);
    console.log(resp.data);
    this.props.onSubmit(resp.data);
    this.setState('');
  };

  render (){
    return (
      <form onSubmit={this.handleSubmit}>
        <input 
          type="text" 
          value={this.state.userName} 
          onChange={event => this.setState({userName: event.target.value})} 
          placeholder="Github Username"
          required
        />
        <button>Add Card</button>
       </form>
    );
  };
};

class CardList extends React.Component{
  contructor(props){
    super(props);
  }
  render(){
    return this.props.profiles.map(profile=> <Card key={profile.id} {...profile} />);
  }
}
class Card extends React.Component{
  constructor(props){
    super(props);
  } 
  render(){
   const profile = this.props;
    return(
    <div className="card">
      <img src={profile.avatar_url} />
      <p>{profile.name}</p>
      <p>Followers: <span>{profile.followers}</span></p>
    </div> 
    );
  }
}
class App extends React.Component {
  state = {
    profiles: testData
  }

  addNewProfile = (resp)=>{
    console.log(resp);
    this.setState(prev=> ({profiles:[...prev.profiles,resp]}));
    console.log(this.state.profiles);
  }
  render(){ 
    return (
      <div>
        <h1> Github Cards</h1>
        <Form onSubmit={this.addNewProfile}/>
        <CardList profiles={this.state.profiles}/>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));

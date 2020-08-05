import React, { Component } from 'react';
import './App.css';

const BK_END_HOST = process.env.NODE_ENV === 'development' ? 
                    "localhost:3000" : process.env.REACT_APP_BACK_END_HOST_URL ;
console.log("------",BK_END_HOST+'/melbourne');
class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
  };
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res }))
      .catch(err => console.log(err));
  }
  callApi = async () => {
    const response = await fetch(BK_END_HOST+'/melbourne');
    console.log(response);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    const ret = body.melbCases[(body.melbCases.length)-1].cases;
    console.log(ret);
    return ret;
  };
  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();
    this.setState({ responseToPost: body });
  };
render() {
    return (
      <div className="App">
        
        <h1><b>{this.state.response}</b></h1>
        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Post to Server:</strong>
          </p>
          <input
            type="text"
            value={this.state.post}
            onChange={e => this.setState({ post: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>
        <p>{this.state.responseToPost}</p>
      </div>
    );
  }
}
export default App;
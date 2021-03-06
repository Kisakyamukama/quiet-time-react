import React, { Component }from 'react';
import axios from 'axios';

export default class EditDevotion extends Component {
  state = { 
    id:'',
    title: '',
    body: '',
    author: '',
    published: false,
    date: new Date()
  }
  
  componentDidMount(){
    axios.get('https://qtapi.herokuapp.com/api/devotion/'+this.props.match.params.id, {
        headers:{"Content-Type": "application/json" }
      }).then(response => {
           this.setState({ 
               id: response.data.id,
               title: response.data.title,
               body:response.data.body,
               author: response.data.author,
               published: response.data.published


           });
        })
        .catch(function(error) {
          console.log(error);
        })
  }
  onChange = (e) => this.setState({
    [e.target.name]:e.target.value
  });

  onSubmit = (e) => {
    e.preventDefault(); 
    axios.put('https://qtapi.herokuapp.com/api/devotion/'+this.props.match.params.id,{
      title: this.state.title,
      body:this.state.body,
      author:this.state.author,
      date:this.state.date,
      published: false
    })
    this.setState({ title: '', body: '', author:'', date: '', published: ''})
    this.props.history.push('/');
    
  }
  render() {
      return (
          <div>
              <form onSubmit={ this.onSubmit }>
                <input 
                  type="text"
                  name="title"
                  className ="form-control"
                  placeholder="Devotion title"
                  value={ this.state.title }
                  onChange= { this.onChange }
                  required 
                />
                <br />

                <textarea 
                  type="text"
                  name="body"
                  className ="form-control"
                  placeholder="Devotion content"
                  value={ this.state.body }
                  onChange= { this.onChange }
                  rows="20"
                  required
                />
                <br />
                <input 
                  type="text"
                  name="author"
                  className ="form-control"
                  placeholder="Author Name"
                  value={ this.state.author}
                  onChange= { this.onChange }
                  required
                />
                <br />
                <input 
                type="submit"
                className="btn btn-success form-control"
                value="Update "
                />
                <br />
              </form>
          </div>

      )
  }
}

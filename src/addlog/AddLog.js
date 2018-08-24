import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { MenuItem, Button } from 'material-ui';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import './AddLog.css';

const client = new ApolloClient({
  uri: 'http://localhost:8081/graphql',
});

const authors = [
  {
    value: 'Andrew Tsai',
    label: 'Andrew Tsai',
  },
  {
    value: 'Bernie Cosgriff',
    label: 'Bernie Cosgriff',
  },
  {
    value: 'McKay Fenn',
    label: 'McKay Fenn',
  },
  {
    value: 'Meysam Hamel',
    label: 'Meysam Hamel',
  },
];

class AddLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'default message log',
      author: 'default author',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit(e) {
    e.preventDefault();
    console.log('trying submit');
    const { message, author } = this.state;
    const { dispatch } = this.props;
    this.submitLog(message, author);
  }

  submitLog = async () => {
    console.log('trying submit log with ', this.state.message, ' ', this.state.author);
    const data = {
      message: this.state.message,
      author: this.state.author,
    };
    try {
      const result = client
        .mutate({
          mutation: gql`
          mutation AddLog {           
            addLog(
              message: "${data.message}"
              author: "${data.author}"
            ) {
              id
              message
              author
            }
          }
        `,
        })
        .then(result => console.log(result));
      return result.data;
    } catch (err) {
      console.log(err);
      return {};
    }
  }

  render() {
    return (
      <div className="container">
        <Paper elevation={4}>
          <img
            src="https://i.imgur.com/4AiXzf8.jpg"
            alt="this is money cat" />


          <form className="form" onSubmit={this.handleSubmit}>

            <TextField
              id="textarea"
              label="Your Log"
              multiline
              fullWidth
              className="message"
              onChange={this.handleChange('message')}
            />
            <TextField
              id="select-author"
              select
              label="Select Author"
              className="author"
              value={this.state.author}
              onChange={this.handleChange('author')}
              SelectProps={{
                MenuProps: {
                  className: 'menu-authors',
                },
              }}
              margin="normal"
            >
              {authors.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              )) }
            </TextField><br/>
            <Button type='submit' value='Submit' color="primary" className='submit'>
              Submit
            </Button>
          </form>

        </Paper>
      </div>
    );
  }
}

export default AddLog;

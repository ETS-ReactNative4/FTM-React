import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { MenuItem, Button } from 'material-ui';
import TextField from 'material-ui/TextField';
import './AddLog.css';


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


/*

    <TextField
      id="select-author"
      select
      label="Select"
      className="author"
      value={this.state.authors}
      onChange={this.handleChange('authors')}
      SelectProps={{
        MenuProps: {
          className: 'menu-authors',
        },
      }}
      helperText="Select the author"
      margin="normal"
    >
      {authors.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      )) }
      </TextField>

*/

class AddLog extends Component {
  state = {
    name: 'Cat in the Hat',
    multiline: 'Controlled',
    author: 'Andrew Tsai',
  };

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    return (
      <div className="container">
        <Paper elevation={4}>
          <img
            src="https://i.imgur.com/4AiXzf8.jpg"
            alt="this is money cat" />


          <form className="form" noValidate autoComplete="off">

            <TextField
              id="textarea"
              label="Your Log"
              multiline
              fullWidth
              className="message"
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
            <Button variant="contained" color="primary" className='submit'>
              Submit
            </Button>
          </form>

        </Paper>
      </div>
    );
  }
}

export default AddLog;

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddTodo extends Component {
  state = {
    title: ''
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    if (this.state.title.trim() === '') return;
    this.props.addTodo(this.state.title);
    this.setState({ title: '' });
  };

  render() {
    return (
      <form
        onSubmit={this.onSubmit}
        style={{ display: 'flex', margin: '5px 0' }}
      >
        <input
          type='text'
          name='title'
          style={{ flex: '10', padding: '5px', fontFamily: 'sans-serif' }}
          placeholder='Add a todo ...'
          value={this.state.title}
          onChange={this.onChange}
        />
        <input
          type='submit'
          value='Submit'
          className='btn'
          style={{ flex: '1' }}
        />
      </form>
    );
  }
}

AddTodo.propTypes = {
  addTodo: PropTypes.func.isRequired
};

export default AddTodo;

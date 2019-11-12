import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

import Header from './components/layout/Header';
import AddTodo from './components/AddTodo';
import Todos from './components/Todos';
import About from './components/pages/About';

class App extends Component {
  state = {
    todos: []
  };

  toggleComplete = id => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    });
  };

  addTodo = title => {
    const newTodo = {
      title,
      completed: false
    };
    axios
      .post('https://jsonplaceholder.typicode.com/todos', newTodo)
      .then(res => this.setState({ todos: [...this.state.todos, res.data] }))
      .catch(err => console.log(err));
  };

  deleteTodo = id => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(res =>
        this.setState({
          todos: [...this.state.todos.filter(todo => todo.id !== id)]
        })
      )
      .catch(err => console.log(err));
  };

  componentDidMount() {
    axios
      .get('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(res => this.setState({ todos: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Router>
        <div className='container'>
          <Header />
          <Route
            exact
            path='/'
            render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todos
                  todos={this.state.todos}
                  toggleComplete={this.toggleComplete}
                  deleteTodo={this.deleteTodo}
                />
              </React.Fragment>
            )}
          />
          <Route path='/about' component={About} />
        </div>
      </Router>
    );
  }
}

export default App;

import React from 'react';
import emitter from '../emitter';
import fetch from 'isomorphic-fetch';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    this.refs.input.focus();
  }

  handleClick() {
    this.emitData();
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.emitData();
    }
  }

  emitData() {
    const node = this.refs.input;
    const value = node.value;

    if (value.trim() !== '') {
      emitter.emit('search-made');

      this.getData(node.value).then(data => {
        emitter.emit('new-books', {items: data.items});
        node.value = '';
      });
    }
  }

  getData(value) {
    return fetch(`https://www.googleapis.com/books/v1/volumes?q=${value}`)
      .then(resp => resp.json());
  }

  render() {
    return (
      <div style={{textAlign: 'center', marginTop: 60}}>
        <input type="text" ref="input" onKeyPress={this.handleKeyPress} />
        <button onClick={this.handleClick}>Search</button>
      </div>
    );
  }
}

export default Search;
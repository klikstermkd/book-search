import React from 'react';
import emitter from '../emitter';
import Book from './Book';

class Books extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      isLoading: false
    };
  }

  componentDidMount() {
    this.newBooksSubscription = emitter.addListener('new-books', data => {
      this.setState({
        books: data.items.map(item => {
          const thumbnail = item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : 'placeholder.jpg';

          return {
            info: {
              title: item.volumeInfo.title,
              infoLink: item.volumeInfo.infoLink,
              description: item.volumeInfo.description,
              authors: item.volumeInfo.authors || [],
              thumbnail
            }
          }
        }),
        isLoading: false
      });
    });

    this.searchMadeSubsciption = emitter.addListener('search-made', () => {
      this.setState({
        isLoading: true,
        books: []
      });
    });
  }

  componentWillUnmount() {
    this.searchMadeSubsciption.remove();
    this.newBooksSubscription.remove();
  }

  render() {
    return (
      <div style={{marginBottom: 100}}>
        {this.state.isLoading && <h3 style={{textAlign: 'center'}}>Loading...</h3>}
        {this.state.books.map((book, id) => {
          return <Book key={id} info={book.info} />
        })}
      </div>
    );
  }
}

export default Books;
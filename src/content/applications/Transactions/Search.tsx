import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../../../data/BooksAPI';
import Book from 'src/content/dashboards/Crypto/Book';
import fi from 'date-fns/esm/locale/fi/index.js';

class Search extends React.Component<any,any> {
  
  componentDidMount() {
    // get books on load
    BooksAPI.getAll().then(books => this.setState({ books }));
  }

  changeShelf = (changedBook, shelf) => {
    BooksAPI.update(changedBook, shelf).then(response => {
      // set shelf for new or updated book
      changedBook.shelf = shelf;
      // update state with changed book
      this.setState(prevState => ({
        books: (prevState as any).books
          // remove updated book from array
          .filter(book => book.id !== changedBook.id)
          // add updated book to array
          .concat(changedBook)
      }));
    });
  };


  state = {
    changeShelf:this.changeShelf,
    query: '',
    newBooks: [],
    books: [],
    searchErr: false
  };

  getBooks = event => {
    debugger;
    const query = event.target.value;
    this.setState({ query });

    // if user input => run the search
    if (query) {
      BooksAPI.search(query.trim(), 20).then(books => {
        if(books.length > 0){
          this.setState({ newBooks: books, searchErr: false });
        }else{
          this.setState({ newBooks: [], searchErr: true });
        }
       
      });

      // if query is empty => reset state to default
    } else this.setState({ newBooks: [], searchErr: false });
  };

  render() {
    debugger;
    const { query, newBooks, searchErr,books, changeShelf } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={this.getBooks}
            />
          </div>
        </div>
        <div className="search-books-results">
          {newBooks.length > 0 && (
            <div>
              <h3>Search returned {newBooks.length} books </h3>
              <ol className="books-grid">
                {newBooks.map(book => (
                  <Book
                    book={book}
                    books={books}
                    key={book.id}
                    changeShelf={changeShelf}
                  />
                ))}
              </ol>
            </div>
          )}
          {searchErr && (
            <h3>Search did not return any books. Please try again!</h3>
          )}
        </div>
      </div>
    );
  }
}
export default Search;

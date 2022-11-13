import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../../../data/BooksAPI';
import Book from 'src/content/dashboards/Crypto/Book';
import fi from 'date-fns/esm/locale/fi/index.js';
import { Box, Container, Grid, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import PageHeader from './PageHeader';
import RecentOrders from './RecentOrders';
import TextField from '@mui/material/TextField';
class Search extends React.Component<any, any> {

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
    changeShelf: this.changeShelf,
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
        if (books.length > 0) {
          this.setState({ newBooks: books, searchErr: false });
        } else {
          this.setState({ newBooks: [], searchErr: true });
        }

      });

      // if query is empty => reset state to default
    } else this.setState({ newBooks: [], searchErr: false });
  };

  render() {
    debugger;
    const { query, newBooks, searchErr, books, changeShelf } = this.state;

    return (
      <>
        <Helmet>
          <title>All Books</title>
        </Helmet>
        <PageTitleWrapper>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h3" component="h3" gutterBottom>
                Search Book
              </Typography>
              <Typography variant="subtitle2">
              <TextField
                      required
                      id="outlined-required"
                      label="search"
                      onChange={this.getBooks}
                    />
                
              </Typography>
            </Grid>
            <Grid item>

            </Grid>
          </Grid>
        </PageTitleWrapper>
        <Container maxWidth="lg">
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12}>

              {newBooks.length > 0 && (
                <div>
                  <Grid item xs={12} >
                    <>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{
                          pb: 3
                        }}
                      >
                        <Typography variant="h3">Search returned {newBooks.length} books </Typography>

                      </Box>
                      <Grid container spacing={3} className="books-grid">
         {newBooks.map(book => (
            <Book
              book={book}
              books={books}
              key={book.id}
              changeShelf={changeShelf}
            />
          ))}
     
   
      </Grid>
                    </>
                  </Grid>

                </div>
              )}
              {searchErr && (
                <h3>Search did not return any books. Please try again!</h3>
              )}
            </Grid>
          </Grid>
        </Container>
        <Footer />
      </>

    );
  }
}
export default Search;

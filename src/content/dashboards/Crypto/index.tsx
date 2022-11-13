import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Container, Grid } from '@mui/material';
import Footer from 'src/components/Footer';
import * as BooksAPI from '../../../data/BooksAPI';
import Wallets from './Wallets';
import AccountSecurity from './AccountSecurity';
import WatchList from './WatchList';
import React from 'react';
import { any } from 'prop-types';
import BookList from './BookList';

  class DashboardCrypto extends React.Component {
    state = { books: [] };

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

    render() {
      const { books } = this.state;
      return (
    <>
      <Helmet>
        <title>Crypto Dashboard</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={12}>
          <BookList books={books} changeShelf={this.changeShelf} />
          </Grid>
          <Grid item lg={8} xs={12}>
            <Wallets />
          </Grid>
          <Grid item lg={4} xs={12}>
            <AccountSecurity />
          </Grid>
          <Grid item xs={12}>
            <WatchList />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}}

export default DashboardCrypto;

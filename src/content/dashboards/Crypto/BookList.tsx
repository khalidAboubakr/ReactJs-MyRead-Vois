import {
  Container,
  Button,
  Card,
  Box,
  Grid,
  Typography,
  useTheme,
  styled,
  Avatar,
  Divider,
  alpha,
  ListItem,
  ListItemText,
  List,
  ListItemAvatar
} from '@mui/material';
import PropTypes from 'prop-types';
import TrendingUp from '@mui/icons-material/TrendingUp';
import Text from 'src/components/Text';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import BookShelf from './BookShelf';
import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import Footer from 'src/components/Footer';
import * as BooksAPI from '../../../data/BooksAPI';
import Wallets from './Wallets';
import AccountSecurity from './AccountSecurity';
import WatchList from './WatchList';
import React from 'react';
import { any } from 'prop-types';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
const BookList = props => {
  const { books, changeShelf } = props;
  const shelfTypes = [
    { type: 'currentlyReading', title: 'Currently Reading' },
    { type: 'wantToRead', title: 'Want to Read' },
    { type: 'read', title: 'Read' }
  ];

  return (
    
    <div className="list-books-content">
      {shelfTypes.map((shelf, index) => {
        const shelfBooks = books.filter(book => book.shelf === shelf.type);
        return (
          <Grid item xs={12} key={index}>
             <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          pb: 3
        }}
      >
        <Typography variant="h3">{shelf.title}</Typography>
      
      </Box>
      <BookShelf books={shelfBooks} changeShelf={changeShelf} />
      </>
          </Grid>
        );
      })}
    </div>
  );
};

BookList.propTypes = {
  books: PropTypes.array.isRequired,
  changeShelf: PropTypes.func.isRequired
};

export default BookList;
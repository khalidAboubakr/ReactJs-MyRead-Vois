import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Box, Card, Checkbox, Container, Divider, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip, Typography } from '@mui/material';
import Footer from 'src/components/Footer';
import * as BooksAPI from '../../../data/BooksAPI';
import React, { ChangeEvent, useState } from 'react';
import { any } from 'prop-types';
import { format } from 'date-fns';
import Search from './Search';
class RecentOrders extends React.Component {
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
    // const [page, setPage] = useState<number>(0);
    // const [limit, setLimit] = useState<number>(5);
    // const handlePageChange = (event: any, newPage: number): void => {
    //   setPage(newPage);
    // };
    // const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    //   setLimit(parseInt(event.target.value));
    // };
    return (
      <Card>
        
      <Card>
  
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
          
              <TableCell>Title</TableCell>
              <TableCell>publisher</TableCell>
              <TableCell>averageRating</TableCell>
              <TableCell>categories</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((cryptoOrder) => {
              const isCryptoOrderSelected = true;
              return (
                <TableRow
                  hover
                  key={cryptoOrder.id}
                >
              
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {cryptoOrder.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {cryptoOrder.authors}
                    </Typography>
                  </TableCell>
                  <TableCell >
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {cryptoOrder.publisher}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {cryptoOrder.publishedDate}
                    </Typography>
                  </TableCell>
                 
                  <TableCell >
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {cryptoOrder.averageRating}
                    </Typography>
                  
                  </TableCell>
                  <TableCell >
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {cryptoOrder.categories}
                    </Typography>
                  
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <Box p={2}>
        <TablePagination
          component="div"
          count={books.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box> */}
    </Card>
    </Card>
);
}}

export default RecentOrders;


import React from 'react';
import PropTypes from 'prop-types';
import ShelfChanger from './ShelfChanger';
import noCover from '../../../images/no-cover-image.png';
import { Grid, Card, CardContent, Typography, Box, styled, Avatar, alpha } from '@mui/material';

const Book = props => {
  const { book, books, changeShelf } = props;

  // add fallbacks for missing cover images and title
  const coverImg =
    book.imageLinks && book.imageLinks.thumbnail
      ? book.imageLinks.thumbnail
      : noCover;
  const title = book.title ? book.title : 'No title available';
  const AvatarWrapper = styled(Avatar)(
    ({ theme }) => `
      margin: ${theme.spacing(2, 0, 1, -0.5)};
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: ${theme.spacing(1)};
      padding: ${theme.spacing(0.5)};
      border-radius: 60px;
      height: ${theme.spacing(15.5)};
      width: ${theme.spacing(15.5)};
      background: ${theme.palette.mode === 'dark'
        ? theme.colors.alpha.trueWhite[30]
        : alpha(theme.colors.alpha.black[100], 0.07)
      };
    
      img {
        background: ${theme.colors.alpha.trueWhite[100]};
        padding: ${theme.spacing(0.5)};
        display: block;
        border-radius: inherit;
        height: ${theme.spacing(14.5)};
        width: ${theme.spacing(14.5)};
      }
  `
  );
  return (

      <Grid xs={12} sm={6} md={4} item>
        <Card
          sx={{
            px: 3
          }}
        >
          <CardContent>
            <AvatarWrapper>
              <img
                alt={title}
                src={coverImg}

              />
            </AvatarWrapper>
            <Typography variant="h5" noWrap>
              {title}
            </Typography>
            <Typography variant="subtitle1" noWrap>
              {/* Check for authors and render each on separate line if exist*/
                book.authors &&
                book.authors.map((author, index) => (
                  <div className="book-authors" key={index}>
                    {author}
                  </div>
                ))}
            </Typography>
            <Box
              sx={{
                pt: 3
              }}
            >
              <Typography variant="h3" gutterBottom noWrap>
                <ShelfChanger book={book} books={books} changeShelf={changeShelf} />
              </Typography>

            </Box>
          </CardContent>
        </Card>
      </Grid>

  );
};

Book.propTypes = {
  book: PropTypes.object.isRequired,
  books: PropTypes.array.isRequired,
  changeShelf: PropTypes.func.isRequired
};

export default Book;

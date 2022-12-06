import { FC, ChangeEvent, useState } from 'react';
import { format } from 'date-fns';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader
} from '@mui/material';

import Label from 'src/components/Label';
import { BookOrder, BookOrderStatus } from 'src/models/book_order';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';

interface RecentOrdersTableProps {
  className?: string;
  bookOrders: BookOrder[];
}

interface Filters {
  status?: BookOrderStatus;
}

const getStatusLabel = (bookOrderStatus: BookOrderStatus): JSX.Element => {
  const map = {
    failed: {
      text: 'Failed',
      color: 'error'
    },
    completed: {
      text: 'Completed',
      color: 'success'
    },
    pending: {
      text: 'Pending',
      color: 'warning'
    }
  };

  const { text, color }: any = map[bookOrderStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (
  bookOrders: BookOrder[],
  filters: Filters
): BookOrder[] => {
  return bookOrders.filter((bookOrder) => {
    let matches = true;

    if (filters.status && bookOrder.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  bookOrders: BookOrder[],
  page: number,
  limit: number
): BookOrder[] => {
  return bookOrders.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ bookOrders }) => {
  const [selectedBookOrders, setSelectedBookOrders] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedBookOrders.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });

  const statusOptions = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: 'completed',
      name: 'Completed'
    },
    {
      id: 'pending',
      name: 'Pending'
    },
    {
      id: 'failed',
      name: 'Failed'
    }
  ];

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

  const handleSelectAllBookOrders = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedBookOrders(
      event.target.checked
        ? bookOrders.map((bookOrder) => bookOrder.id)
        : []
    );
  };

  const handleSelectOneBookOrder = (
    event: ChangeEvent<HTMLInputElement>,
    bookOrderId: string
  ): void => {
    if (!selectedBookOrders.includes(bookOrderId)) {
      setSelectedBookOrders((prevSelected) => [
        ...prevSelected,
        bookOrderId
      ]);
    } else {
      setSelectedBookOrders((prevSelected) =>
        prevSelected.filter((id) => id !== bookOrderId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredBookOrders = applyFilters(bookOrders, filters);
  const paginatedBookOrders = applyPagination(
    filteredBookOrders,
    page,
    limit
  );
  const selectedSomeBookOrders =
    selectedBookOrders.length > 0 &&
    selectedBookOrders.length < bookOrders.length;
  const selectedAllBookOrders =
    selectedBookOrders.length === bookOrders.length;
  const theme = useTheme();

  return (
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {!selectedBulkActions && (
        <CardHeader
          action={
            <Box width={150}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status || 'all'}
                  onChange={handleStatusChange}
                  label="Status"
                  autoWidth
                >
                  {statusOptions.map((statusOption) => (
                    <MenuItem key={statusOption.id} value={statusOption.id}>
                      {statusOption.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          }
          title="Recent Orders"
        />
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllBookOrders}
                  indeterminate={selectedSomeBookOrders}
                  onChange={handleSelectAllBookOrders}
                />
              </TableCell>
              <TableCell>Order Details</TableCell>
              <TableCell>Order ID</TableCell>
              <TableCell>Source</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedBookOrders.map((bookOrder) => {
              const isBookOrderSelected = selectedBookOrders.includes(
                bookOrder.id
              );
              return (
                <TableRow
                  hover
                  key={bookOrder.id}
                  selected={isBookOrderSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isBookOrderSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneBookOrder(event, bookOrder.id)
                      }
                      value={isBookOrderSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {bookOrder.orderDetails}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {format(bookOrder.orderDate, 'MMMM dd yyyy')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {bookOrder.orderID}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {bookOrder.sourceName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {bookOrder.sourceDesc}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {bookOrder.amountBook}
                      {bookOrder.bookCurrency}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {numeral(bookOrder.amount).format(
                        `${bookOrder.currency}0,0.00`
                      )}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {getStatusLabel(bookOrder.status)}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit Order" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Order" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredBookOrders.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

RecentOrdersTable.propTypes = {
  bookOrders: PropTypes.array.isRequired
};

RecentOrdersTable.defaultProps = {
  bookOrders: []
};

export default RecentOrdersTable;

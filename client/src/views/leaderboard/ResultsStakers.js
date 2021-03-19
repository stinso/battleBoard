import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  CardHeader,
  InputAdornment,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  makeStyles
} from '@material-ui/core';
import {
  Search as SearchIcon
} from 'react-feather';
import { isMobile } from 'react-device-detect'


const applyFilters = (stakersList, query) => {
  return stakersList.filter((entry) => {
    let matches = true;

    if (query && !entry.address.toLowerCase().includes(query.toLowerCase())) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (stakersList, page, limit) => {
  return stakersList.slice(page * limit, page * limit + limit);
};

const useStyles = makeStyles((theme) => ({
  root: {},
  queryField: {
    width: 600
  },
  rankCell: {
    width: 30,
    flexBasis: 30,
  }
}));

const ResultsStakers = ({ className, stakersList, ...rest }) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState('');

  const handleQueryChange = (event) => {
    event.persist();
    setQuery(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  // Usually query is done on backend with indexing solutions
  const filteredStakersList = applyFilters(stakersList, query);
  const paginatedStakersList = applyPagination(filteredStakersList, page, limit);

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box p={2}>
        <Box
          display="flex"
          alignItems="center"
        >
          <TextField
            className={classes.queryField}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SvgIcon
                    fontSize="small"
                    color="action"
                  >
                    <SearchIcon />
                  </SvgIcon>
                </InputAdornment>
              )
            }}
            onChange={handleQueryChange}
            placeholder="Search address"
            value={query}
            variant="outlined"
          />
        </Box>
      </Box>
      <PerfectScrollbar>
        <Box minWidth={300}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={classes.rankCell}>
                  Rank
                </TableCell>
                <TableCell>
                  Address
                </TableCell>
                <TableCell align="right">
                  Value
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedStakersList.map((entry) => {

                return (
                  <TableRow
                    hover
                    key={entry.id}
                  >
                    <TableCell className={classes.rankCell}>
                      {entry.id}
                    </TableCell>
                    <TableCell>
                      {`${entry.address.substr(0,6)}...${entry.address.substr(entry.address.length-4, entry.address.length)}`}
                    </TableCell>
                    <TableCell align="right">
                      {entry.value}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
            <TablePagination
              component="div"
              count={filteredStakersList.length}
              labelRowsPerPage={isMobile ? '#' : 'Rows per page'}
              onChangePage={handlePageChange}
              onChangeRowsPerPage={handleLimitChange}
              page={page}
              rowsPerPage={limit}
              rowsPerPageOptions={[5, 10, 25]}
            />
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

ResultsStakers.propTypes = {
  className: PropTypes.string,
  stakersList: PropTypes.array.isRequired
};

ResultsStakers.defaultProps = {
  stakersList: []
};

export default ResultsStakers;

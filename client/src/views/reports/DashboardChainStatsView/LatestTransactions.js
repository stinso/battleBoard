import React, {
  useEffect
} from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  makeStyles
} from '@material-ui/core';
import Label from 'src/components/Label';
import { useSelector, useDispatch } from 'src/store';
import { getLatestTransactions, clearTransactions } from 'src/slices/latestTransactions'
import SimpleDateTime  from 'react-simple-timestamp-to-date';


const useStyles = makeStyles(() => ({
  root: {}
}));

const LatestTransactions = ({ className, account, ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.latestTransactions);
  const STAKING_ADDRESS = '0x9b7fcaebe9a69eceeab72142ed35a238775d179a';

  useEffect(() => {
    if (account.loggedIn) {
      dispatch(getLatestTransactions(account.address))
    } else {
      dispatch(clearTransactions())
    }
  }, [account.loggedIn, account.address]);

  const getColor = (transaction) => {
    if (transaction.to === STAKING_ADDRESS || transaction.from === STAKING_ADDRESS) {
      return
    }
    return account.address.toLowerCase() == transaction.to.toLowerCase() ? "success" : "error"
  }

  const getStatus = (transaction) => {
    if (transaction.to === STAKING_ADDRESS) {
      return "Stake"
    } else if (transaction.from === STAKING_ADDRESS) {
      return "Unstake"
    } else if (account.address.toLowerCase() == transaction.to.toLowerCase()) {
      return "Buy"
    } else {
      return "Sell"
    }
  }

  if (account.loggedIn) {
  return (
    <Card
      className={clsx(classes.root, className)}
      visible={account.loggedIn.toString()}
      {...rest}
    >
      <CardHeader
        title="Latest Transactions"
      />
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={700}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sortDirection="desc">
                  <Tooltip
                    enterDelay={300}
                    title="Sort"
                  >
                    <TableSortLabel
                      active
                      direction="desc"
                    >
                      Txn Hash
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  Date
                </TableCell>
                <TableCell>
                  From
                </TableCell>
                <TableCell>
                  To
                </TableCell>
                <TableCell>
                  Value
                </TableCell>
                <TableCell align="right">
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {account.loggedIn && transactions.map((transaction) => (
                <TableRow
                  hover
                  key={transaction.txHash}
                >
                  <TableCell>{`${transaction.txHash.substr(0,14)}...`}</TableCell>
                  <TableCell><SimpleDateTime dateSeparator="-" format="MYD" showTime="0">{transaction.timeStamp}</SimpleDateTime></TableCell>
                  <TableCell>{`${transaction.from.substr(0,14)}...`}</TableCell>
                  <TableCell> {`${transaction.to.substr(0,14)}...`}</TableCell>
                  <TableCell>
                    {transaction.value / 1000000000000000000}
                  </TableCell>
                  <TableCell align="right">
                    <Label color={getColor(transaction)}>
                    {getStatus(transaction)}
                    </Label>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
} else {
  return null
}
};

LatestTransactions.propTypes = {
  className: PropTypes.string
};

export default LatestTransactions;

import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  IconButton,
  Select,
  Typography,
  makeStyles
} from '@material-ui/core';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import {
  getNetworkClaimsService,
  approveNetworkClaimService,
  rejectNetworkClaimService
} from '../../service/battleServerService';
import playStationIcon from '../../assets/img/playstation-logo.png';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import * as Sentry from '@sentry/react';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    paddingBottom: 200,
    paddingTop: 100,
    minHeight: '100%',
    [theme.breakpoints.down('md')]: {
      paddingTop: 0,
      paddingBottom: 60
    },
    margin: 0
  },
  rowImage: {
    height: '60px',
    width: '60px',
    margin: 0,
    padding: 0,
    verticalAlign: 'top'
  },
  imageCell: {
    height: '60px',
    width: '60px',
    padding: 0
  }
}));

const applyPagination = (list, page, limit) => {
  return list.slice(page * limit, page * limit + limit);
};

const NetworkClaims = () => {
  const classes = useStyles();
  const location = useLocation();
  const [claims, setClaims] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  const paginatedClaims = applyPagination(claims, page, limit);

  const getNetworkClaims = async (state) => {
    try {
      const { data } = await getNetworkClaimsService({});
      console.log('data:')
      console.log(data)
      if (data.success) {
        setClaims(data.claims);
      }
    } catch (error) {
      console.log(
        '🚀 ~ file: ClaimNetwork.js ~ line 33 ~ getNetworkClaims ~ error',
        error
      );
      Sentry.captureException(error, {
        tags: {
          page: location.pathname
        }
      });
    }
  };

  const approveClaim = async (id) => {
    try {
      const { data } = await approveNetworkClaimService({
        claimID: id
      });
      getNetworkClaims();
    } catch (error) {
      console.log(
        '🚀 ~ file: ClaimNetwork.js ~ line 50 ~ approveClaim ~ error',
        error
      );
      Sentry.captureException(error, {
        tags: {
          page: location.pathname
        }
      });
    }
  };

  const rejectClaim = async (id) => {
    try {
      const { data } = await rejectNetworkClaimService({
        claimID: id
      });
      getNetworkClaims();
    } catch (error) {
      console.log(
        '🚀 ~ file: ClaimNetwork.js ~ line 67 ~ rejectClaim ~ error',
        error
      );
      Sentry.captureException(error, {
        tags: {
          page: location.pathname
        }
      });
    }
  };

  useEffect(() => {
    getNetworkClaims();
  }, []);

  return (
    <div>
      <Typography className={classes.title} variant="h6" color="textPrimary">
        Network Claims
      </Typography>

      {claims.length > 0 ? (
        <>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Network</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>GamerTag</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Evidence</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedClaims.map((row, index) => {
                return (
                  <TableRow spacing={0} hover key={index}>
                    <TableCell
                      className={classes.imageCell}
                      align="center"
                      padding="none"
                    >
                      <img className={classes.rowImage} src={playStationIcon} />
                    </TableCell>
                    <TableCell>{row.username}</TableCell>
                    <TableCell>{row.gamerTag}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>
                      {row.proofPath && (
                        <Link href={row.proofPath} target={`_blank`}>
                          View
                        </Link>
                      )}
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Accept">
                        <IconButton
                          color="secondary"
                          aria-label="accept"
                          component="span"
                          id={'Accept' + index}
                          onClick={(e) => {
                            e.preventDefault();
                            approveClaim(row.id);
                          }}
                        >
                          <CheckOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Reject">
                        <IconButton
                          color="secondary"
                          aria-label="modify"
                          component="span"
                          id={'Reject' + index}
                          onClick={(e) => {
                            e.preventDefault();
                            rejectClaim(row.id);
                          }}
                        >
                          <CloseOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={claims.length}
            labelRowsPerPage={'Rows per page'}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </>
      ) : (
        <p className="text-center">No Data Found</p>
      )}
    </div>
  );
};

NetworkClaims.propTypes = {
  className: PropTypes.string
};

export default NetworkClaims;

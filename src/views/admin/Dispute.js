import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { getTimeFromEpoch, getDateFromEpoch } from '../../utils/helpers';
import {
  resolveDisputeService,
  getDisputesService
} from '../../service/battleServerService';
import * as Sentry from '@sentry/react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  makeStyles
} from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

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
  success: {
    color: '#00e676'
  },
  danger: {
    color: '#ff1744'
  }
}));

const States = {
  PENDING: 0,
  RESOLVED: 1
};

const SuccessText = 'Submitted Your Decision.';

const Dispute = () => {
  const classes = useStyles();
  const location = useLocation();
  const [disputes, setDisputes] = useState([]);
  const [tabs, setTabs] = useState(States.PENDING);
  const [selectedRow, setSelectedRow] = useState();
  const [fetchDataInfo, setFetchDataInfo] = useState({
    fetch: true,
    state: States.PENDING
  });
  const [showMoreInfo, setShowMoreInfoModal] = useState(false);
  const [winner, setWinner] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (fetchDataInfo.fetch) {
      getDisputes(fetchDataInfo.state);
    }
  }, [fetchDataInfo, tabs]);

  const getDisputes = async (state) => {
    try {
      const { data } = await getDisputesService({ resolved: Boolean(state) });
      if (data.success) {
        setDisputes(data.disputes);
      }
    } catch (error) {
      console.log(
        '🚀 ~ file: Disputes.js ~ line 45 ~ getDisputes ~ error',
        error
      );
      Sentry.captureException(error, {
        tags: {
          page: location.pathname
        }
      });
    }
    setFetchDataInfo({ fetch: false });
  };

  const submitDisputeDecision = async () => {
    setMsg('');
    try {
      const { data } = await resolveDisputeService({
        winner,
        eventID: selectedRow.eventID,
        noWinner: winner === 'No Winners' ? true : false
      });
      if (data.success) {
        setMsg(SuccessText);
      }
      setWinner('');
    } catch (error) {
      console.log(
        '🚀 ~ file: Dispute.js ~ line 63 ~ submitDisputeDecision ~ error',
        error
      );
      Sentry.captureException(error, {
        tags: {
          page: location.pathname
        }
      });
      if (error.response) {
        setMsg(error.response.data.error);
      }
    }
    setFetchDataInfo({ fetch: true, state: tabs });
  };

  const toggleTabs = (e, index) => {
    e.preventDefault();
    setTabs(index);
  };

  const [currentTab, setCurrentTab] = useState('pending');

  const tabsHeader = [
    { value: 'pending', label: 'Pending' },
    { value: 'resolved', label: 'Resolved' }
  ];

  const handleTabsChange = (event, value) => {
    if (value === 'pending') {
      setFetchDataInfo({ fetch: true, state: States.PENDING });
    } else {
      setFetchDataInfo({ fetch: true, state: States.RESOLVED });
    }
    setCurrentTab(value);
  };

  const generateMoreInfoModal = () => {
    return (
      <Dialog
        maxWidth="sm"
        fullWidth
        open={showMoreInfo}
        onClose={() => {
          setShowMoreInfoModal(false);
        }}
      >
        <DialogTitle>Dispute Info</DialogTitle>
        <DialogContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>GamerTag</TableCell>
                <TableCell>Email Address</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Photo Evidence</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedRow.users.map((userInfo, index) => {
                return (
                  <TableRow spacing={0} hover key={userInfo.username}>
                    <TableCell>{userInfo.username}</TableCell>
                    <TableCell>{userInfo.gamerTag}</TableCell>
                    <TableCell>
                      <Link href={`mailto:${userInfo.email}`}>
                        {userInfo.email}
                      </Link>
                    </TableCell>
                    <TableCell
                      style={{
                        width: '300px',
                        height: '100px',
                        overflow: 'auto',
                        display: 'inline-block'
                      }}
                    >
                      {userInfo.description}
                    </TableCell>
                    <TableCell>
                      {userInfo.imagePath && (
                        <Link href={userInfo.imagePath} target={`_blank`}>
                          View
                        </Link>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <Box mt={2} display="flex" justifyContent="center">
            <Typography variant="h4">
              <Link
                target="_blank"
                href={`/gameInformationPage/${selectedRow.eventID}`}
              >
                Click here{' '}
              </Link>
              to get event details.
            </Typography>
          </Box>

          {currentTab === 'pending' && (
            <Box mt={2}>
              <FormControl fullWidth variant="outlined" color="secondary">
                <InputLabel htmlFor="select-winner-label">
                  Select Winner
                </InputLabel>
                <Select
                  labelId="select-winner-label"
                  name="singleSelect"
                  label="Select Winner"
                  onChange={(e) => {
                    setWinner(e.target.value);
                  }}
                >
                  {[
                    ...selectedRow.users.map((user) => (
                      <MenuItem key={user.username} value={user.username}>
                        {user.username}
                      </MenuItem>
                    ))
                  ]}
                  <MenuItem key="No Winners" value="No Winners">
                    No Winners
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}

          {msg !== '' && (
            <p
              className={`${
                msg !== SuccessText ? classes.danger : classes.success
              }`}
            >
              {msg}
            </p>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="warning"
            data-dismiss="modal"
            disabled={winner === ''}
            onClick={() => {
              submitDisputeDecision();
            }}
          >
            Submit
          </Button>

          <Button
            variant="contained"
            color="warning"
            data-dismiss="modal"
            onClick={() => {
              setWinner('');
              setMsg('');
              setShowMoreInfoModal(false);
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <>
      {showMoreInfo && generateMoreInfoModal()}
      <Typography className={classes.title} variant="h6" color="textPrimary">
        Disputes
      </Typography>
      <Box mt={3}>
        <Tabs
          onChange={handleTabsChange}
          scrollButtons="auto"
          textColor="secondary"
          value={currentTab}
          variant="scrollable"
        >
          {tabsHeader.map((tab) => (
            <Tab key={tab.value} label={tab.label} value={tab.value} />
          ))}
        </Tabs>
      </Box>
      <Divider />
      <Box mt={3} minWidth={300}>
        {currentTab === 'pending' && (
          <DisputesTable
            disputes={disputes}
            setSelectedRow={setSelectedRow}
            setShowMoreInfoModal={setShowMoreInfoModal}
            setMsg={setMsg}
            classes={classes}
          />
        )}
        {currentTab === 'resolved' && (
          <DisputesTable
            disputes={disputes}
            setSelectedRow={setSelectedRow}
            setShowMoreInfoModal={setShowMoreInfoModal}
            setMsg={setMsg}
            classes={classes}
          />
        )}
      </Box>
    </>
  );
};

const DisputesTable = ({
  disputes,
  setSelectedRow,
  setShowMoreInfoModal,
  setMsg,
  classes
}) => {
  return (
    <>
      {disputes.length > 0 ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Event ID</TableCell>
              <TableCell>Participant 1</TableCell>
              <TableCell>Participant 2</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {disputes.map((row, index) => {
              return (
                <TableRow key={row.eventID}>
                  <TableCell>{row.eventID}</TableCell>
                  <TableCell
                    className={`${
                      row.users[0].isWinner ? classes.success : classes.danger
                    }`}
                  >
                    {row.users[0].username}
                  </TableCell>
                  <TableCell
                    className={`${
                      row.users[1].isWinner ? classes.success : classes.danger
                    }`}
                  >
                    {row.users[1].username}
                  </TableCell>
                  <TableCell>
                    {getDateFromEpoch(row.conflictDate)}
                    <br />
                    {getTimeFromEpoch(row.conflictDate)}
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Info">
                      <IconButton
                        color="secondary"
                        aria-label="info"
                        component="span"
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedRow(row);
                          setShowMoreInfoModal(true);
                          setMsg('');
                        }}
                      >
                        <InfoOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ) : (
        <Box display="flex" mt={2} justifyContent="center">
          <Typography variant="h3">No Disputes Found</Typography>
        </Box>
      )}
    </>
  );
};

Dispute.propTypes = {
  className: PropTypes.string
};

export default Dispute;

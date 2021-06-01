import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Select, Typography, makeStyles } from '@material-ui/core';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import { getTimeFromEpoch, getDateFromEpoch } from '../../utils/helpers';
import {
  resolveDisputeService,
  getDisputesService
} from '../../service/battleServerService';
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

  return (
    <div>
      <Typography className={classes.title} variant="h6" color="textPrimary">
        Disputes
      </Typography>
    </div>
  );
};

Dispute.propTypes = {
  className: PropTypes.string
};

export default Dispute;

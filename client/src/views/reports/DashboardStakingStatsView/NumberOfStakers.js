import React, {
  useState,
  useEffect,
  useCallback
} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  Hidden,
  Typography,
  makeStyles
} from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/PeopleAlt';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { axios } from 'src/utils/axiosHook';
import NumberFormat from 'react-number-format';
import { isMobile } from 'react-device-detect'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: isMobile ? theme.spacing(2) : theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  label: {
    marginLeft: theme.spacing(1)
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    height: 48,
    width: 48
  }
}));

const NumberOfStakers = ({ className, ...rest }) => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [stakers, setStakers] = useState(0);
  

  const getStakers = useCallback(async () => {
    
    try {
      const response = await axios.get('/stakers');

      if (isMountedRef.current) {
        setStakers(response.data.stakers);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getStakers();
  },[getStakers]);

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box flexGrow={1}>
        <Typography
          component="h3"
          gutterBottom
          variant="overline"
          color="textSecondary"
        >
          {isMobile
            ? '# Stakers'
            : 'Number of Stakers'
          }
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          flexWrap="wrap"
        >
          <Typography
            variant="h3"
            color="textPrimary"
          >
            <NumberFormat value={stakers} displayType={'text'} thousandSeparator={true} />
          </Typography>
        </Box>
      </Box>
      <Hidden mdDown>
        <Avatar className={classes.avatar}>
          <PeopleIcon />
        </Avatar>
      </Hidden>
    </Card>
  );
};

NumberOfStakers.propTypes = {
  className: PropTypes.string
};

export default NumberOfStakers;

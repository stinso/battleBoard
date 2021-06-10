import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  unbanPlayerService,
  getBannedPlayersService
} from '../../service/battleServerService';

import { useLocation, useHistory, Link as RouterLink } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import {
  Avatar,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Paper,
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
import defaultAvatar from '../../assets/img/placeholder.jpg';

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
  title: {
    marginBottom: theme.spacing(2),
    position: 'relative',
    '&:after': {
      position: 'absolute',
      bottom: 0,
      left: 0,
      content: '" "',
      height: 3,
      width: 48,
      backgroundColor: theme.palette.primary.main
    }
  }
}));

const BannedPlayers = () => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const [players, setPlayers] = useState([]);

  const getBannedPlayers = async (state) => {
    try {
      const { data } = await getBannedPlayersService({});
      if (data.success) {
        setPlayers(data.bannedUsers);
      }
    } catch (error) {
      console.log(
        '🚀 ~ file: BannedPlayers.js ~ line 69 ~ getBannedPlayers ~ error',
        error
      );
      Sentry.captureException(error, {
        tags: {
          page: location.pathname
        }
      });
    }
  };

  const unbanPlayer = async (player) => {
    try {
      const { data } = await unbanPlayerService({
        username: player
      });
      getBannedPlayers();
    } catch (error) {
      console.log(
        '🚀 ~ file: BannedPlayers.js ~ line 88 ~ unBanPlayers ~ error',
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
    getBannedPlayers();
  }, []);

  return (
    <>
      <Typography className={classes.title} variant="h6" color="textPrimary">
        Banned Players
      </Typography>
      {players.length > 0 ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {players.map((row) => {
              return (
                <TableRow key={row.username}>
                  <TableCell
                    onClick={() => {
                      history.push(`/profile/${row.username}`);
                    }}
                  >
                    <Avatar
                      className={classes.avatar}
                      src={row.dpHigh ? row.dpHigh : defaultAvatar}
                      alt="profile image"
                    />
                    {row.username}
                  </TableCell>
                  <TableCell>
                    <Link href={`mailto:${row.email}`} target={`_blank`}>
                      {row.email}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={(e) => {
                        e.preventDefault();
                        unbanPlayer(row.username);
                      }}
                    >
                      Unban
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ) : (
        <Box display="flex" mt={2} justifyContent="center">
          <Typography variant="h3">No Players Found</Typography>
        </Box>
      )}
    </>
  );
};

BannedPlayers.propTypes = {
  className: PropTypes.string
};

export default BannedPlayers;

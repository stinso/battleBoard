import React, { useEffect, useState, useCallback } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  Divider,
  Grid,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Paper,
  useTheme,
  useMediaQuery,
  makeStyles
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const font = "'Saira', sans-serif";

const networks = [
  {
    id: "ps",
    username: "N/A",
    image: "/static/images/networks/playstation.png",
    link: "#"
  },
  {
    id: "xbox",
    username: "N/A",
    image: "/static/images/networks/xbox.png",
    link: "#"
  },
  {
    id: "battleNet",
    username: "mukki@chaingames.io",
    image: "/static/images/networks/battleNet.png",
    link: "#"
  }
]

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
  paper: {
    minHeight: "200px",
    padding: theme.spacing(4)
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  },
  rowImage: {
    height: '48px',
    width: '48px',
    margin: 0,
    padding: 0,
    verticalAlign: 'top'
  },
  imageCell: {
    height: '48px',
    width: '48px',
    padding: 0
  },
  accordion: {
    marginTop: theme.spacing(4)
  },
  title: {
    marginBottom: 10,
    fontFamily: font,
    fontSize: 32,
    position: 'relative',
    '&:after': {
      position: 'absolute',
      bottom: -8,
      left: 0,
      content: '" "',
      height: 3,
      width: 48,
      backgroundColor: theme.palette.primary.main
    }
  }
}));

const Linking = () => {
  const classes = useStyles();


  return(
    <div>
      <Typography
        className={classes.title}
        variant="h2"
        color="textPrimary"
        >
        Linked Accounts
      </Typography>
      <Table>
      <TableHead>
        <TableRow >
        <TableCell>
          Network
        </TableCell>
        <TableCell>
          Username
        </TableCell>
        <TableCell align="center">
          Action
        </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {networks.map((network) => {
        return (
          <TableRow
          spacing={0}
          hover
          key={network.id}
          >
          <TableCell className={classes.imageCell} align='center' padding='none'>
            <img className={classes.rowImage}
              src={network.image}
            />
          </TableCell>
          <TableCell>
            {network.username}
          </TableCell>
          <TableCell className={classes.priceCell} align="center">
            <Button
              variant="outlined"
              size="small"
              color="secondary"
              href={network.link}
            >
              link
            </Button>
          </TableCell>
          </TableRow>
        );
        })}
      </TableBody>
      </Table>
      <Accordion className={classes.accordion}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2a-content"
        id="panel2a-header"
      >
        <Typography className={classes.heading}>Linking PSN or Activision Account for Call of Duty: MW</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          <Typography variant="body2" gutterBottom>
            Note: This workaround is only for COD: Modern Warfare.
          </Typography>
          <Typography variant="body2" display="block" gutterBottom>
            Currently, we only support linking your XBox and
            <Link
              color="secondary"
              component="a"
              href="https://us.battle.net/account/creation/flow/create-full "
              variant="body2"
            >
              {' '} Battle.net {' '}
            </Link> 
            accounts on ChainGames Battle. Players using PSN or Activision accounts in COD: MW do not need to worry. Just follow these simple steps to link your account on ChainGames and start battling!
          </Typography>
          <Typography variant="body2" display="block" gutterBottom > 
            Create a freeBattle.net accountif you don't already have one.
          </Typography>
          <Typography variant="body2" display="block" gutterBottom >
            Login to the
          <Link
            color="secondary"
            component="a"
            href="https://my.callofduty.com/login"
            variant="body2"
          >
            {' '} My Call of Duty {' '}
          </Link>  
            website with your existing PSN or Activision account (whichever one you use to play the game).
          </Typography>
          <Typography variant="body2" display="block" gutterBottom >
            At the top of the website, you'll see your username. Hover over it and select "Linked Accounts" from the pop-up menu.
          </Typography>
          <Typography variant="body2" display="block" gutterBottom >
            You will now see options to link with other gaming networks. Select "Battle.net" from that list and login to your Battle.net account. This will link your exisitng PSN/Activision account with Battle.net and sync your COD: MW stats accross the two.
          </Typography>
          <Typography variant="body2" display="block" gutterBottom>
            Now you can link your Battle.net account here.
            That's it. Our systems will now be able to see your stats even when you're playing on your PlayStation or using your Activision account. Battle on!
          </Typography>
        </Box>
      </AccordionDetails>
      </Accordion>
    </div>
  );
};

Linking.propTypes = {
  className: PropTypes.string
};
  
export default Linking;
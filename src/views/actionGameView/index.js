import Page from 'src/components/Page';
import PerfectScrollbar from 'react-perfect-scrollbar';
import GameSectionOne from "./GameSectionOne";
import Lobby from "./Lobby";
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    minWidth: '100%',
    paddingBottom: theme.spacing(3),
  }
}));

const GameLandingPage = () => {
  const classes = useStyles();

  return (
    <PerfectScrollbar>
      <Page
        className={classes.root}
        title="Action Game Page"
      >
        <GameSectionOne />
        <Lobby />
      </Page>
    </PerfectScrollbar>
  );
};

export default GameLandingPage;
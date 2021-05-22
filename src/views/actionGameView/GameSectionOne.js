import { useLocation } from 'react-router-dom';
import { Paper, makeStyles } from '@material-ui/core';
import COD_Image from '../../assets/img/COD_Background.jpg';
import Madden_Image from '../../assets/img/Madden_Background.jpg';
import Fifa_Image from '../../assets/img/fifa-background-image.jpg';

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.dark,
    elevation: 10
  }
}));

const GameSectionOne = () => {
  const classes = useStyles();
  const location = useLocation();

  const getImage = () => {
    switch (location.pathname) {
      case '/actionGamePage/madden2021':
        return Madden_Image;
      case '/actionGamePage/cod':
        return COD_Image;
      case '/actionGamePage/fifa':
        return Fifa_Image;
    }
  };
  return (
    <Paper className={classes.paper}>
      <img alt="Presentation" src={getImage()} />
    </Paper>
  );
};

export default GameSectionOne;

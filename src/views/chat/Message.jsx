import defaultAvatar from '../../assets/img/placeholder.jpg';
import { Twemoji } from 'react-emoji-render';
import TimeAgo from 'react-timeago';
import { useHistory, Link as RouterLink } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Link,
  IconButton,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
    display: 'flex'
  },
  avatar: {
    height: 24,
    width: 24
  },
  font: {
    color: '#fff'
  }
}));

const Message = ({ time, message, isSelf, imagePath, username }) => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Box display="flex" maxWidth={300} ml={isSelf ? 'auto' : 0}>
        <Avatar className={classes.avatar} src={imagePath} />
        <Box ml={2}>
          <Box
            bgcolor={isSelf ? 'secondary.main' : 'background.default'}
            borderRadius="borderRadius"
            boxShadow={1}
            px={2}
            py={1}
            className={classes.font}
          >
            <Link
              color="inherit"
              component={RouterLink}
              to={`/profile/${username}`}
              variant="h4"
            >
              {username}
            </Link>

            <Typography color="inherit" variant="body2">
              <Twemoji text={message} />
            </Typography>
          </Box>
          <Box
            mt={1}
            display="flex"
            justifyContent={isSelf ? 'flex-end' : 'flex-start'}
          >
            <Typography noWrap color="textSecondary" variant="caption">
              <TimeAgo date={time} />
            </Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Message;

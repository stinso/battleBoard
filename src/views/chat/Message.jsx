import defaultAvatar from "../../assets/img/placeholder.jpg";
import { Twemoji } from 'react-emoji-render';
import TimeAgo from 'react-timeago';
import {
    useHistory
  } from 'react-router-dom';
import {
    Box,
    Button,
    Card,
    Container,
    Divider,
    Grid,
    IconButton,
    Typography,
    makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {},
    justifyContentEnd: {
        justifyContent: 'end'
        // text right
    },
    justifyContentStart: {
        justifyContent: 'start'
    },
    selfMessage: {
        backgroundColor: '#555'
    },
    textRight: {

    },
    textLeft: {

    }
}))



const Message = ({ time, message, isSelf, imagePath, username }) => {
    const history = useHistory();
    const classes = useStyles();

    return (
        <Grid container className={isSelf ? classes.justifyContentEnd : classes.justifyContentStart}>
            <Grid item lg={3}>
                <Card className={isSelf ? classes.selfMessage : ''}>
                    <Box className={isSelf ? classes.textRight : classes.textLeft}>
                        <Box 
                            onClick={() => {
                                history.push(`/profile/${username}`)
                            }}>
                            <img
                                style={{
                                    height: '16px',
                                    width: '16px'
                                }}
                                alt="profile picture"
                                src={imagePath ? imagePath : defaultAvatar} />
                            <span>
                                {username}
                            </span>
                            <Typography>
                                <Twemoji text={message} />
                            </Typography>
                            <Typography>
                                <TimeAgo date={time} />
                            </Typography>
                        </Box>
                    </Box>
                </Card>
            </Grid>
        </Grid>
    )
}

export default Message;
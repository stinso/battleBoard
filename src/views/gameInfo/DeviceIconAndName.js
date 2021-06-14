import { Devices } from '../../config/constants';
import { getDeviceName } from '../../utils/helpers.js';
import ps from '../../assets/img/playstation-logo.png';
import xbox from '../../assets/img/xbox-logo-profile-page.png';
import { makeStyles, Typography, Box, Avatar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  psText: {
    color: '#1587e0'
  },
  xboxText: {
    color: 'green'
  },
  avatar: {
    cursor: 'pointer',
    width: 16,
    height: 16,
    marginTop: '2px',
    marginRight: theme.spacing(1)
  }
}));

const ConsoleIconAndName = ({ deviceID }) => {
  const classes = useStyles();

  return (
    <>
      {deviceID && (
        <Box display="flex">
          <Avatar
            className={classes.avatar}
            src={
              [Devices.PS4.id, Devices.PS5.id].includes(deviceID) ? ps : xbox
            }
          />
          <Typography
            variant="body2"
            className={`${
              [Devices.PS4.id, Devices.PS5.id].includes(deviceID)
                ? classes.psText
                : classes.xboxText
            }`}
          >
            {getDeviceName(deviceID)}
          </Typography>
        </Box>
      )}
    </>
  );
};

export default ConsoleIconAndName;

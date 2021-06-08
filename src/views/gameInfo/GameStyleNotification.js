import { Alert, AlertTitle } from '@material-ui/lab';
import { getStyleName } from '../../utils/helpers.js';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const Notification = ({ style, setShowGameStyleNotification }) => {
  return (
    <Alert
      severity="info"
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={() => {
            setShowGameStyleNotification(false);
          }}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }
    >
      <AlertTitle>Heads up!</AlertTitle>
      {`This event only supports the BR ${getStyleName(
        style
      )} mode. Make sure to play all your games in that mode`}
    </Alert>
  );
};

export default Notification;

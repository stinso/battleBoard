import { Alert, AlertTitle } from '@material-ui/lab';
import { getStyleName } from "../../utils/helpers.js";

const Notification = ({style}) => {
  return (
    <Alert severity="error">
      <AlertTitle>Heads up!</AlertTitle>
      {`This event only supports the BR ${getStyleName(style)} mode. Make sure to play all your games in that mode`}
    </Alert>
  )
}

export default Notification;
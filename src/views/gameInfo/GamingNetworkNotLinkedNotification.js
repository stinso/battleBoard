import { Alert } from '@material-ui/lab';
import { Link as RouterLink } from 'react-router-dom';

const Notification = () => {
  return (
    <Alert severity="error">
      <AlertTitle>Oops! - Gaming network not linked!</AlertTitle>
       Click  
      <RouterLink 
        to="/userAccountSetting"
        target="_blank"
      >
        here
      </RouterLink>
      to link your gaming account.
    </Alert>
  )
}

export default Notification;


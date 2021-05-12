import { Alert, AlertTitle } from '@material-ui/lab';

const Notification = () => {
  return (
    <Alert severity="error">
      <AlertTitle>Oops!</AlertTitle>
      The match has entered the dispute process because both players submitted contradicting results.
      Please click on submit evidence button below
    </Alert>
  )
}

export default Notification;
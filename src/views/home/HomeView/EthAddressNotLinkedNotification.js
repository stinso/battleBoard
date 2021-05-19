import { Alert, AlertTitle } from '@material-ui/lab';
import { RegisterEthAddressRedirectURL } from "../../../config/constants";
import { Link } from '@material-ui/core';

const Notification = () => {
  return (
    <Alert severity="error">
      <AlertTitle>Oops!</AlertTitle>
      Looks like your web3 wallet is not linked. Please link it
      {' '}
      <Link
        component="a"
        href={RegisterEthAddressRedirectURL}
        color="secondary"
      >
        here
      </Link>
    </Alert>
  )
}

export default Notification;
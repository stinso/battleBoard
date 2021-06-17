import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
  Typography,
  makeStyles
} from '@material-ui/core';
import CODSettingsImage from '../../assets/img/COD-Settings-Image.png';
import CODLinkingImage from '../../assets/img/COD-Linking.png';

const useStyles = makeStyles((theme) => ({
  image: {
    height: '100%',
    width: '100%'
  }
}));

const CODSettingsModal = ({
  setShowCODSettingsModal,
  showCODSettingsModal
}) => {
  const classes = useStyles();
  return (
    <div>
      <Dialog
        onClose={() => setShowCODSettingsModal({ show: false })}
        maxWidth="lg"
        fullWidth
        open={showCODSettingsModal.show}
      >
        <DialogTitle>Call of Duty Settings</DialogTitle>
        <DialogContent>
          {showCODSettingsModal.errorCode === 100 && (
            <>
              <Box display="flex" justifyContent="center">
                <Typography variant="body1">
                  We've detected your COD profile lacks the public data
                  visibility option. Please enable this option in your{' '}
                  <Link
                    href="https://profile.callofduty.com/cod/profile"
                    target={`_blank`}
                  >
                    account preferences
                  </Link>{' '}
                  page on the{' '}
                  <Link
                    href="https://my.callofduty.com/login"
                    target={`_blank`}
                  >
                    Call of Duty website
                  </Link>{' '}
                  and click the Account Linking tab.
                </Typography>
              </Box>
              <Box display="flex" justifyContent="center" mt={1} mb={1}>
                <Typography variant="body1">
                  From here you will find the Playstation, Xbox, Battle.net and
                  Steam accounts you've connected. Please see the image below
                  for reference.
                </Typography>
              </Box>
              <Box display="flex" justifyContent="center" mt={1} mb={1}>
                <img className={classes.image} src={CODSettingsImage} />
              </Box>
            </>
          )}
          {showCODSettingsModal.errorCode === 101 && (
            <>
              <Box display="flex" justifyContent="center" mt={1} mb={1}>
                <Typography variant="body1">
                  We've detected that you don't have an
                  <Link
                    href="https://profile.callofduty.com/cod/profile"
                    target={`_blank`}
                  >
                    account
                  </Link>
                  linked on the
                  <Link
                    href="https://my.callofduty.com/login"
                    target={`_blank`}
                  >
                    Call of Duty website
                  </Link>
                </Typography>
              </Box>
              <Box display="flex" justifyContent="center" mt={1} mb={1}>
                Please login to your account, and ensure that you have linked
                your Playstation, Xbox, or Battle.net account(s). Please see the
                image below for reference.
              </Box>
              <Box display="flex" justifyContent="center" mt={1} mb={1}>
                <img className={classes.image} src={CODLinkingImage} />
              </Box>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            onClick={() => {
              return setShowCODSettingsModal({ show: false });
            }}
          >
            ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CODSettingsModal;

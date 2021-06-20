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
import PerfectScrollbar from 'react-perfect-scrollbar';

const useStyles = makeStyles((theme) => ({
  image: {
    height: '100%',
    width: '100%'
  },
  title: {
    position: 'relative',
    '&:after': {
      position: 'absolute',
      bottom: 12,
      left: 24,
      content: '" "',
      height: 3,
      width: 48,
      backgroundColor: theme.palette.primary.main
    }
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
        maxWidth="md"
        fullWidth
        open={showCODSettingsModal.show}
      >
        <DialogTitle className={classes.title}>
          Call of Duty Settings
        </DialogTitle>
        <PerfectScrollbar>
          <DialogContent>
            {showCODSettingsModal.errorCode === 100 && (
              <>
                <Box>
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
                <Box mt={1} mb={1}>
                  <Typography variant="body1">
                    From here you will find the Playstation, Xbox, Battle.net
                    and Steam accounts you've connected. Please see the image
                    below for reference.
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="center" mt={1} mb={1}>
                  <img className={classes.image} src={CODSettingsImage} />
                </Box>
              </>
            )}
            {showCODSettingsModal.errorCode === 101 && (
              <>
                <Box mt={1} mb={1}>
                  <Typography variant="body1">
                    We've detected that you don't have an{' '}
                    <Link
                      href="https://profile.callofduty.com/cod/profile"
                      target={`_blank`}
                    >
                      account
                    </Link>{' '}
                    linked on the{' '}
                    <Link
                      href="https://my.callofduty.com/login"
                      target={`_blank`}
                    >
                      Call of Duty website.
                    </Link>
                  </Typography>
                </Box>
                <Box mt={1} mb={1}>
                  <Typography variant="body1">
                    Please login to your account, and ensure that you have
                    linked your Playstation, Xbox, or Battle.net account(s).
                    Please see the image below for reference.
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="center" mt={1} mb={1}>
                  <img className={classes.image} src={CODLinkingImage} />
                </Box>
              </>
            )}
          </DialogContent>
        </PerfectScrollbar>
        <DialogActions>
          <Button
            color="secondary"
            variant="contained"
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

import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Modal,
  Paper,
  Typography,
  makeStyles
} from '@material-ui/core';

const FaceBookStepsModal = ({
  consoleSelectedValue,
  handleConsoleOnChange,
  handleSponsoredEventRegister,
  fbInfo,
  setFbInfo,
  eventData,
  isSponsoredEvent,
  setShowFacebookModal,
  showFacebookModal,
  facebookNotification,
  isLoading,
}) => {


  return (
    <Dialog open={showFacebookModal}>
      Facebook Modal
    </Dialog>
  );
};


export default FaceBookStepsModal;
import {
  Box,
  Button,
  Container,
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
    <Modal isOpen={showFacebookModal}>
      Facebook Modal
    </Modal>
  );
};


export default FaceBookStepsModal;
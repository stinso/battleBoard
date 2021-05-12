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

const SubmitResultModal = ({
  setShowSubmitResultModal,
  showSubmitResultModal,
  submitResult,
}) => {


  return (
    <Modal isOpen={showSubmitResultModal}>
      SubmitResult Modal
    </Modal>
  );
};


export default SubmitResultModal;
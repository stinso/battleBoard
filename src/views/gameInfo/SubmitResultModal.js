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

const SubmitResultModal = ({
  setShowSubmitResultModal,
  showSubmitResultModal,
  submitResult
}) => {
  return <Dialog open={showSubmitResultModal}>SubmitResult Modal</Dialog>;
};

export default SubmitResultModal;

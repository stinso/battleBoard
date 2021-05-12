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

const CODSettingsModal = ({
  setShowCODSettingsModal,
  showCODSettingsModal
}) => {


  return (
    <Dialog open={showCODSettingsModal.show}>
      CODSettings Modal
    </Dialog>
  );
};


export default CODSettingsModal;
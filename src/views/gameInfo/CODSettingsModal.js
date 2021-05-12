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

const CODSettingsModal = ({
  setShowCODSettingsModal,
  showCODSettingsModal
}) => {


  return (
    <Modal isOpen={showCODSettingsModal.show}>
      CODSettings Modal
    </Modal>
  );
};


export default CODSettingsModal;
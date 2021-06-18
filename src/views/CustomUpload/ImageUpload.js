import { useRef, useState, useCallback, useEffect } from 'react';
import { uploadProfileImageService } from '../../service/centralServerService';
import defaultAvatar from '../../assets/img/placeholder.jpg';
import Cropper from 'react-easy-crop';
import getCroppedImg from './cropImage';
import { useLocation } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  },
  errorText: {
    color: theme.palette.error.main
  },
  successText: {
    color: theme.palette.success.main
  },
  cropper: {
    height: '300px',
    width: '100%'
  }
}));

const FILE_SIZE = 1000024;
const MAX_PIXELS_SUPPORTED = 2048;
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

const ImageUpload = (props) => {
  const classes = useStyles();
  const [file, setFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [imagePreviewUrl, setImagePreviewUrl] = useState(
    props.imageURL ? props.imageURL : defaultAvatar
  );
  const fileInput = useRef('fileInput');
  const [msg, setMsg] = useState('');
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(
    props.imageURL ? props.imageURL : defaultAvatar
  );
  const location = useLocation();

  useEffect(() => {
    if (props.imageURL) {
      setImagePreviewUrl(props.imageURL);
      setCroppedImage(props.imageURL ? props.imageURL : defaultAvatar);
    }
  }, [props.imageURL]);
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setMsg('');
    setCroppedAreaPixels(croppedAreaPixels);
    if (
      croppedAreaPixels.width >= MAX_PIXELS_SUPPORTED &&
      croppedAreaPixels.height >= MAX_PIXELS_SUPPORTED
    ) {
      setMsg('Width and Height of Image should be less than 1024px');
    }
  }, []);

  const showCroppedImage = useCallback(async () => {
    setShowModal(false);
    try {
      const { imgSrc, croppedBlob } = await getCroppedImg(
        imagePreviewUrl,
        croppedAreaPixels
      );
      setCroppedImage(imgSrc);
      const croppedFile = new File([croppedBlob], 'image.jpeg', {
        lastModified: new Date().getTime(),
        type: croppedBlob.type
      });
      setFile(croppedFile);
      setImagePreviewUrl(imgSrc);
      handleSubmit(croppedFile);
    } catch (error) {
      console.log(
        '🚀 ~ file: ImageUpload.js ~ line 62 ~ showCroppedImage ~ error',
        error
      );
      Sentry.captureException(error, {
        tags: {
          page: location.pathname
        }
      });
    }
  }, [croppedAreaPixels]);

  const handleImageChange = (e) => {
    try {
      e.preventDefault();
      setMsg('');
      let reader = new FileReader();
      let file = e.target.files[0];
      if (file.size > FILE_SIZE) {
        setMsg('File Size should be less than 1MB');
      } else if (!SUPPORTED_FORMATS.includes(file.type)) {
        setMsg('File Format not valid');
      } else {
        reader.onloadend = () => {
          setFile(file);
          setImagePreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
        setShowModal(true);
      }
    } catch (error) {
      console.log(
        '🚀 ~ file: ImageUpload.js ~ line 93 ~ handleImageChange ~ error',
        error
      );
      Sentry.captureException(error, {
        tags: {
          page: location.pathname
        }
      });
    }
  };

  const handleSubmit = async (croppedFile) => {
    let formData = new FormData();
    formData.append('dp', croppedFile);
    try {
      const { data } = await uploadProfileImageService(formData);
      if (data.success === true) {
        setFile(null);
        setMsg('User profile image updated');
      }
    } catch (error) {
      console.log(
        '🚀 ~ file: ImageUpload.js ~ line 114 ~ handleSubmit ~ error',
        error
      );
      Sentry.captureException(error, {
        tags: {
          page: location.pathname
        }
      });
      if (error.response?.data?.error) {
        setMsg(error.response.data.error);
      }
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    fileInput.current.click();
  };

  const handleRemove = (e) => {
    e.preventDefault();
    setFile(null);
    setImagePreviewUrl(!props.imageURL ? defaultAvatar : props.imageURL);
    setCroppedImage(!props.imageURL ? defaultAvatar : props.imageURL);
  };

  const ImageEditModal = () => {
    return (
      <Dialog
        className={classes.dialog}
        open={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Crop Image</DialogTitle>

        <DialogContent>
          <Box className={classes.cropper}>
            <Cropper
              image={imagePreviewUrl}
              crop={crop}
              zoom={1}
              aspect={1 / 1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Box mr={1} mb={1}>
            <Button
              color="primary"
              variant="contained"
              data-dismiss="modal"
              onClick={showCroppedImage}
            >
              Change
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    );
  };
  return (
    <>
      {showModal && ImageEditModal()}
      <div>
        <input
          style={{ display: 'none' }}
          type="file"
          onChange={handleImageChange}
          ref={fileInput}
        />
        <Box display="flex" justifyContent="center">
          <Avatar className={classes.avatar} src={croppedImage} />
        </Box>
        <div>
          <Box mt={2} display="flex" justifyContent="center">
            {file === null ? (
              <Button
                color={props.addBtnColor}
                className={props.addBtnClasses}
                color="secondary"
                variant="contained"
                size="small"
                onClick={(e) => handleClick(e)}
              >
                {props.imageURL ? 'Change Photo' : 'Add Photo'}
              </Button>
            ) : (
              <Button
                color="secondary"
                variant="contained"
                size="small"
                onClick={(e) => handleRemove(e)}
              >
                Remove
              </Button>
            )}
          </Box>
          {msg != '' && (
            <Box mt={2} display="flex" justifyContent="center" marginTop={1}>
              <Typography
                variant="body2"
                className={
                  msg !== 'User profile image updated'
                    ? classes.errorText
                    : classes.successText
                }
              >
                {msg}
              </Typography>
            </Box>
          )}
        </div>
      </div>
    </>
  );
};

export default ImageUpload;

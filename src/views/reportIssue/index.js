import React, { useState } from 'react';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import {
  AllSupportedGamesNames,
  SUPPORTED_FORMATS
} from '../../config/constants';
import { postReportIssue } from '../../service/centralServerService';
import * as Sentry from '@sentry/react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Link,
  MenuItem,
  Select,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Logo from 'src/components/Logo';
import { Alert } from '@material-ui/lab';
import PerfectScrollbar from 'react-perfect-scrollbar';

const FILE_SIZE = 5000024;

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  logo: {
    width: '400px'
  },
  banner: {
    backgroundColor: theme.palette.background.paper,
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  bannerChip: {
    marginRight: theme.spacing(2)
  },
  methodIcon: {
    height: 30,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  cardContainer: {
    paddingBottom: 80,
    paddingTop: 80
  },
  cardContent: {
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    minHeight: 400
  },
  currentMethodIcon: {
    height: 40,
    '& > img': {
      width: 'auto',
      maxHeight: '100%'
    },
    input: {
      display: 'none'
    }
  }
}));

const games = AllSupportedGamesNames.map((row, index) => {
  return { name: row, index: index + 1 };
});

export default function ValidatedForm() {
  const classes = useStyles();
  const [submitMessage, setSubmitMessage] = useState('');
  const location = useLocation();

  const schema = yup.object({
    description: yup.string().required('This field is required'),
    attachment: yup
      .mixed()
      .test(
        'fileSize',
        'File Size is too large, must be less than 3MB',
        (value) => {
          if (value) {
            return value && value.size <= FILE_SIZE;
          } else {
            return true;
          }
        }
      )
      .test('fileType', 'Unsupported File Format', (value) => {
        if (value) {
          const name = value.name.split('.');
          const extension = name[name.length - 1];
          if (extension === 'log') {
            return true;
          }
          return value && SUPPORTED_FORMATS.includes(value.type);
        } else {
          return true;
        }
      }),
    gameName: yup.string().required('This field is required')
  });

  const submitForm = async (values) => {
    console.log(values.attachment);
    try {
      setSubmitMessage('');
      const game = games.find((row) => {
        if (row.name === values.gameName) {
          return row;
        }
      });
      const formData = new FormData();
      formData.append('gameID', game.index);
      formData.append('description', values.description);
      formData.append('attachment', values.attachment);
      const { data } = await postReportIssue(formData);
      if (data?.success === true) {
        setSubmitMessage('Issue reported successfully');
      }
    } catch (error) {
      console.log('🚀 ~ file: index.js ~ line 59 ~ submitForm ~ error', error);
      Sentry.captureException(error, {
        tags: {
          page: location.pathname
        }
      });
      if (error.response?.data) {
        setSubmitMessage(error.response.data.error);
      } else {
        setSubmitMessage('Something went wrong!');
      }
    }
  };

  return (
    <>
      <Page className={classes.root} title="Report Issue">
        <Container className={classes.cardContainer} maxWidth="sm">
          <Box mb={8} display="flex" justifyContent="center">
            <RouterLink to="/">
              <Logo className={classes.logo} />
            </RouterLink>
          </Box>
          <Card>
            <CardContent className={classes.cardContent}>
              <Box
                alignItems="center"
                display="flex"
                justifyContent="space-between"
                mb={3}
              >
                <div>
                  <Typography color="textPrimary" gutterBottom variant="h2">
                    Report Issue
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Report your issue to the admins.
                  </Typography>
                </div>
              </Box>
              <Box flexGrow={1} mt={3}>
                <Formik
                  validationSchema={schema}
                  onSubmit={submitForm}
                  isInitialValid={schema.isValidSync()}
                  initialValues={{ gameName: AllSupportedGamesNames[0] }}
                >
                  {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    touched,
                    isValid,
                    errors,
                    setFieldValue
                  }) => (
                    <Form
                      noValidate
                      onSubmit={handleSubmit}
                      enctype="multipart/form-data"
                    >
                      <Box>
                        <FormControl
                          id="exampleForm.ControlSelect3"
                          fullWidth
                          variant="outlined"
                        >
                          <InputLabel htmlFor="select-game-name-label">
                            Game Name
                          </InputLabel>
                          <Select
                            labelId="select-game-name-label"
                            id="select-game-name"
                            name="gameName"
                            value={values.gameName}
                            onChange={handleChange}
                            label="Game Name"
                          >
                            {games.map((game, index) => (
                              <MenuItem key={game.name} value={game.name}>
                                {game.name}
                              </MenuItem>
                            ))}
                          </Select>
                          {!!errors.gameName && (
                            <FormHelperText error>
                              Please select a game
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Box>

                      <Box mt={2}>
                        <TextField
                          multiline
                          variant="outlined"
                          fullWidth
                          rows={8}
                          name="description"
                          value={values.description}
                          onChange={handleChange}
                          label="Description"
                        />
                      </Box>

                      {errors.description && (
                        <FormHelperText error>
                          Please enter valid description. {errors.description}
                        </FormHelperText>
                      )}
                      <Box mt={2} display="flex">
                        <input
                          style={{ display: 'none' }}
                          type="file"
                          id="import-image-button"
                          name="attachment"
                          onChange={(event) => {
                            setFieldValue(
                              'attachment',
                              event.currentTarget.files[0]
                            );
                          }}
                        />
                        <label htmlFor="import-image-button">
                          <Button
                            component="span"
                            variant="contained"
                            color="primary"
                            variant="outlined"
                          >
                            Add Attachment
                          </Button>
                        </label>
                        {values.attachment?.name && (
                          <Box ml={2} mt={1}>
                            <Typography>{values.attachment.name}</Typography>
                          </Box>
                        )}
                        {errors.attachment && (
                          <FormHelperText error>
                            {errors.attachment}
                          </FormHelperText>
                        )}
                      </Box>

                      <Box mt={2}>
                        <Button
                          fullWidth
                          type="submit"
                          variant="contained"
                          disabled={!isValid}
                          color="secondary"
                          size="large"
                        >
                          Submit
                        </Button>
                      </Box>
                      {submitMessage && (
                        <Box mt={2}>
                          {submitMessage !== 'Issue reported successfully' ? (
                            <Alert severity="error">{submitMessage}</Alert>
                          ) : (
                            <Alert severity="success">{submitMessage}</Alert>
                          )}
                        </Box>
                      )}
                    </Form>
                  )}
                </Formik>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Page>
    </>
  );
}

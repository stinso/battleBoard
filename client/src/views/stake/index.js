import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Link,
  Paper,
  Step,
  StepConnector,
  StepLabel,
  Stepper,
  Typography,
  colors,
  makeStyles,
  withStyles
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {
  Check as CheckIcon,
  Key as KeyIcon,
  List as ListIcon,
  Send as SendIcon,
  DollarSign as DollarIcon,
  RotateCw as RotateCwIcon
} from 'react-feather';
import Page from 'src/components/Page';
import Prerequisites from './Prerequisites';
import AmountToStake from './AmountToStake';
import Preauthorization from './Preauthorization';
import Confirm from './Confirm';
import Outcome from './Outcome';
import usePrevious from 'src/hooks/usePrevious';
import { useWeb3React } from '@web3-react/core';
import { useStakingDispatch } from "src/context/StakingContract";
import { SET_ERROR } from "src/context/StakingContract/actions";


const steps = [
  {
    label: 'Prerequisites',
    icon: ListIcon
  },
  {
    label: 'Amount to stake',
    icon: DollarIcon
  },
  {
    label: 'Pre-authorization',
    icon: CheckIcon
  },
  {
    label: 'Confirm',
    icon: KeyIcon
  },
  {
    label: 'Confirmation',
    icon: SendIcon
  }
];

const CustomStepConnector = withStyles((theme) => ({
  vertical: {
    marginLeft: 19,
    padding: 0,
  },
  line: {
    borderColor: theme.palette.divider
  }
}))(StepConnector);

const useCustomStepIconStyles = makeStyles((theme) => ({
  root: {},
  active: {
    backgroundColor: theme.palette.secondary.main,
    boxShadow: theme.shadows[10],
    color: theme.palette.secondary.contrastText
  },
  completed: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText
  }
}));

const CustomStepIcon = ({ active, completed, icon }) => {
  const classes = useCustomStepIconStyles();

  const Icon = steps[icon - 1].icon;

  return (
    <Avatar
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed
      })}
    >
      <Icon size="20" />
    </Avatar>
  );
};

CustomStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.number.isRequired
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  avatar: {
    backgroundColor: colors.red[600]
  },
  stepper: {
    backgroundColor: 'transparent'
  }
}));

const StakeView  = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const { account } = useWeb3React();
  const prevAccount = usePrevious(account)
  const dispatch = useStakingDispatch();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleLast = () => {
    setActiveStep(4);
  };

  const handleStartOver = () => {
    setActiveStep(0);
    setCompleted(false);
    dispatch({type: SET_ERROR, payload: false});
    //window.location.reload();
  };


  useEffect(()=> {
    if(prevAccount !== account && account && prevAccount) {
      if (activeStep !== 0) {
        setCompleted(true);
      }
    }
  }, [account])

  return (
    <Page
      className={classes.root}
      title="Stake"
    >
      <Container maxWidth="lg">
        <Box mb={3}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            <Link
              variant="body1"
              color="inherit"
              to="#"
              component={RouterLink}
            >
              Staking Portal
            </Link>
            <Typography
              variant="body1"
              color="textPrimary"
            >
              Stake
            </Typography>
          </Breadcrumbs>
          <Typography
            variant="h3"
            color="textPrimary"
          >
            Stake your CHAIN
          </Typography>
        </Box>
        {!completed ? (
          <Paper>
            <Grid container>
              <Grid
                item
                xs={12}
                md={3}
              >
                <Stepper
                  activeStep={activeStep}
                  className={classes.stepper}
                  connector={<CustomStepConnector />}
                  orientation="vertical"
                >
                  {steps.map((step) => (
                    <Step key={step.label}>
                      <StepLabel StepIconComponent={CustomStepIcon}>
                        {step.label}
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Grid>
              <Grid
                item
                xs={12}
                md={9}
              >
                <Box p={3}>
                  {activeStep === 0 && (
                    <Prerequisites onNext={handleNext} />
                  )}
                  {activeStep === 1 && (
                    <AmountToStake
                      onBack={handleBack}
                      onNext={handleNext}
                    />
                  )}
                  {activeStep === 2 && (
                    <Preauthorization
                      onBack={handleBack}
                      onNext={handleNext}
                      onLast={handleLast}
                    />
                  )}
                  {activeStep === 3 && (
                    <Confirm
                      onBack={handleBack}
                      onNext={handleNext}
                    />
                  )}
                  {activeStep === 4 && (
                    <Outcome
                      onStartOver={handleStartOver}
                    />
                  )}
                </Box>
              </Grid>
            </Grid>
          </Paper>
        ) : (
          <Card>
            <CardContent>
              <Box
                maxWidth={450}
                mx="auto"
              >
                <Box
                  display="flex"
                  justifyContent="center"
                >
                  <Avatar className={classes.avatar}>
                    <RotateCwIcon />
                  </Avatar>
                </Box>
                <Box mt={2}>
                  <Typography
                    variant="h3"
                    color="textPrimary"
                    align="center"
                  >
                    Account changed
                  </Typography>
                </Box>
                <Box mt={2}>
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    align="center"
                  >
                    We have detected account change. Please start the process from beginning.
                  </Typography>
                </Box>
                <Box
                  mt={2}
                  display="flex"
                  justifyContent="center"
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleStartOver}
                  >
                    Start Over
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        )}
      </Container>
    </Page>
  );
};

export default StakeView;

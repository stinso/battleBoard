import { useState, useEffect, useContext } from 'react';
import { getLinkedNetworkService } from '../../service/battleServerService';
import { AuthContext } from '../../context/AuthContext';
import {
  SupportedGameNetworks,
  AllSupportedGamesWithOtherAttributes,
  SupportedCurrency,
  Devices
} from '../../config/constants';
import * as Sentry from '@sentry/react';
import { getDevicesArray, getDeviceName } from '../../utils/helpers.js';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Link,
  Select,
  MenuItem,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControlBox: {
    marginTop: theme.spacing(2)
  },
  button: {
    marginTop: theme.spacing(2),
    minWidth: 250
  }
}));

/* consoleSelectedValue={consoleSelectedValue}
handleConsoleOnChange={handleConsoleOnChange}
setConsoleValue={setConsoleValue}
game={values.gameName}
handleCurrencyOnChange={handleCurrencyOnChange}
currency={currency}
isChallenge={true}
setDeviceID={setDeviceID} */

const GameConsoleSelection = ({
  isSponsoredEvent = false,
  handleCurrencyOnChange,
  handleConsoleOnChange,
  deviceID,
  isChallenge = false,
  game
}) => {
  const classes = useStyles();
  const location = useLocation();
  const [linkedNetworks, setLinkedNetworks] = useState();
  const { user, dispatch } = useContext(AuthContext);
  const username = user.user?.session?.username;
  const [currency, setCurrency] = useState('');
  const [device, setDevice] = useState('');
  const [network, setNetwork] = useState('');

  useEffect(() => {
    if (username && !deviceID) {
      getLinkedAccounts();
    }
  }, [username, deviceID]);

  const getLinkedAccounts = async () => {
    try {
      const response = await getLinkedNetworkService({ username });
      if (response.data.success === true && response.data.linkedNetworks) {
        const networks = response.data.linkedNetworks.map((row) => row.network);
        const networksWithName = SupportedGameNetworks.filter((row) =>
          networks.includes(row.index)
        );
        let networksWithLabel = networksWithName.map((row) => {
          return { label: row.name, id: row.index };
        });

        // filtering game networks on basis of whether game supports this netowrks.
        let gameSupportedNetwork = AllSupportedGamesWithOtherAttributes.find(
          (row) => {
            if (row.name === game) {
              return row;
            }
          }
        );
        gameSupportedNetwork = gameSupportedNetwork.supportedNetworks.map(
          (row) => row.index
        );
        networksWithLabel = networksWithLabel.filter((row) => {
          return gameSupportedNetwork.includes(row.id);
        });

        setLinkedNetworks(networksWithLabel);
      }
    } catch (error) {
      console.log(
        '???? ~ file: ConsoleSelection.js ~ line 40 ~ getLinkedAccounts ~ error',
        error
      );
      Sentry.captureException(error, {
        tags: {
          page: location.pathname
        }
      });
    }
  };

  useEffect(() => {
    if (deviceID) {
      handleConsoleOnChange({
        id: deviceID === Devices.PS4.id || deviceID === Devices.PS5.id ? 2 : 0
      }); //4 and 5 represents PS consoles and 2 stands for PSN and 0 stands for Xbox Live
    }
  }, [deviceID]);

  const handleDevideIDChanged = (deviceID) => {
    if (deviceID) {
      handleConsoleOnChange({
        id: deviceID === Devices.PS4.id || deviceID === Devices.PS5.id ? 2 : 0
      });
      setDevice(deviceID);
    }
  };

  return (
    <>
      <div>
        {isChallenge && ['Madden NFL 21', 'Fifa'].includes(game) && (
          <Box className={classes.formControlBox}>
            <FormControl fullWidth variant="outlined" color="secondary">
              <InputLabel htmlFor="select-device-label">
                Select Console
              </InputLabel>
              <Select
                fullWidth
                labelId="select-device-label"
                id="select-device"
                value={device}
                onChange={(event) => {
                  handleDevideIDChanged(event.target.value);
                }}
                label="Select Console"
              >
                {getDevicesArray().map((device) => (
                  <MenuItem key={device.id} value={device.id}>
                    {device.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        )}

        {!isSponsoredEvent && (
          <Box className={classes.formControlBox}>
            <FormControl variant="outlined" fullWidth color="secondary">
              <InputLabel htmlFor="select-currency-label">
                Select Currency
              </InputLabel>
              <Select
                labelId="select-currency-label"
                id="select-currency"
                value={currency}
                onChange={(event) => {
                  handleCurrencyOnChange(event.target.value);
                  setCurrency(event.target.value);
                }}
                label="Select Currency"
              >
                {SupportedCurrency.map((row) => (
                  <MenuItem key={row.currency} value={row}>
                    {row.currency}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        )}
        {!deviceID && !['Madden NFL 21', 'Fifa'].includes(game) && (
          <>
            <Box className={classes.formControlBox}>
              <FormControl
                variant="outlined"
                className={classes.formControl}
                fullWidth
              >
                <InputLabel htmlFor="select-network-label" color="secondary">
                  Select linked acc.
                </InputLabel>
                <Select
                  color="secondary"
                  labelId="select-network-label"
                  id="select-network"
                  value={network}
                  onChange={(event) => {
                    handleConsoleOnChange(event.target.value);
                    setNetwork(event.target.value);
                  }}
                  label="Select linked acc."
                >
                  {linkedNetworks &&
                    linkedNetworks.map((network) => (
                      <MenuItem key={network.id} value={network}>
                        {network.label}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Box>
            <Button
              className={classes.button}
              variant="outlined"
              color="secondary"
              component={RouterLink}
              to="/userAccountSetting"
              fullWidth
            >
              Link Account
            </Button>
          </>
        )}
        {!isChallenge && deviceID && (
          <Box display="flex" mt={1}>
            <Typography color="primary">Note:&nbsp;</Typography>
            <Typography>
              {` You can only participate with ${getDeviceName(
                deviceID
              )}. Are you sure you want to register?`}
            </Typography>
          </Box>
        )}
      </div>
    </>
  );
};

export default GameConsoleSelection;

import { useState, useEffect, useContext } from "react";
import Select from "react-select";
import { getLinkedNetworkService } from "../../service/node.service.js";
import { AuthContext } from '../../context/AuthContext';
import {
  SupportedGameNetworks,
  AllSupportedGamesWithOtherAttributes,
  SupportedCurrency,
  Devices
} from '../../config/constants';
import * as Sentry from "@sentry/react";
import {
  getDevicesArray,
  getDeviceName
} from "../../utils/helpers.js";
import { 
  useLocation,
  Link as RouterLink
} from 'react-router-dom';

const GameConsoleSelection = ({
  isSponsoredEvent = false,
  handleCurrencyOnChange,
  handleConsoleOnChange,
  deviceID,
  isChallenge = false,
  game,
  setDeviceID,
}) => {
  const location = useLocation();
  const [linkedNetworks, setLinkedNetworks] = useState();
  const { user, dispatch } = useContext(AuthContext);
  const username = user.user?.session?.username;

  useEffect(() => {
    if (username && !deviceID) {
      getLinkedAccounts()
    }
  }, [username, deviceID]);

  const getLinkedAccounts = async () => {
    try {
      const response = await getLinkedNetworkService({username});
      if(response.data.success === true && response.data.linkedNetworks){
        const networks = response.data.linkedNetworks.map((row)=>row.network)
        const networksWithName = SupportedGameNetworks.filter((row)=>networks.includes(row.index))
        let networksWithLabel = networksWithName.map((row)=> {
          return {'label': row.name, 'id': row.index }
        })

        // filtering game networks on basis of whether game supports this netowrks.
        let gameSupportedNetwork = AllSupportedGamesWithOtherAttributes.find((row) => {
          if (row.name === game) {
            return row
          }
        })
        gameSupportedNetwork = gameSupportedNetwork.supportedNetworks.map((row)=>row.index)
        networksWithLabel = networksWithLabel.filter((row) => {
          return gameSupportedNetwork.includes(row.id)
        })

        setLinkedNetworks(networksWithLabel)
      }
    } catch (error) {
      console.log("🚀 ~ file: ConsoleSelection.js ~ line 40 ~ getLinkedAccounts ~ error", error)
      Sentry.captureException(error, {
        tags: {
            page: location.pathname,
        },
      });
    }
  };

  useEffect(() => {
    if (deviceID) {
      handleConsoleOnChange({ id: (deviceID === Devices.PS4.id || deviceID === Devices.PS5.id) ? 2 : 0 }) //4 and 5 represents PS consoles and 2 stands for PSN and 0 stands for Xbox Live  
    }
  }, [deviceID]);

  return (
    <>
      <div>
      {isChallenge && ['Madden NFL 21', "Fifa"].includes(game) && 
          (
          <Select
            className="react-select react-select-warning mb-2 col-12"
            classNamePrefix="react-select"
            name="singleSelect"
              onChange={(value) => {
                setDeviceID(value.id);
              }}
                options={
                  getDevicesArray().map((device) => {
                    return { label: device.name, id: device.id }
                  })
                }
            placeholder="Select Console..."
          />
          )
        }
        
      {!isSponsoredEvent && 
          (
          <Select
            className="react-select react-select-warning mb-2 col-12"
            classNamePrefix="react-select"
            name="singleSelect"
              onChange={(value) => {
                handleCurrencyOnChange(value)
              }}
                options={
                  SupportedCurrency.map((row) => {
                    return {label: row.currency, id: row.id}
                  })
                }
                placeholder="Select Currency"
          />
          )
        }
        {!deviceID && !['Madden NFL 21', "Fifa"].includes(game) && 
          <>
          <Select
            className="react-select react-select-warning mb-2 col-7"
            classNamePrefix="react-select"
            name="singleSelect"
              onChange={(value) => {
                handleConsoleOnChange(value)
              }}
              options={linkedNetworks}
            placeholder="Select linked acc."
          />
          <RouterLink to="/userAccountSetting">
            Link Account
          </RouterLink>
          </>
        }
        {!isChallenge && deviceID &&
          <Typography>
            Note:
          {` You can only participate with ${getDeviceName(deviceID)}. Are you sure you want to register?`}
          </Typography>
        }
      </div>
    </>
  );
};

export default GameConsoleSelection;

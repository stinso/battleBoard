import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { create } from 'jss';
import MomentUtils from '@date-io/moment';
import { SnackbarProvider } from 'notistack';
import {
  jssPreset,
  StylesProvider,
  ThemeProvider
} from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import GlobalStyles from './components/GlobalStyles';
import ScrollReset from './components/ScrollReset';
import useSettings from './hooks/useSettings';
import { createTheme } from './theme';
import routes, { renderRoutes } from './routes';
import {StakingContractProvider} from "./context/StakingContract/index";
import { Web3Provider } from '@ethersproject/providers'
import { Web3ReactProvider } from '@web3-react/core'

const jss = create({ plugins: [...jssPreset().plugins] });
const history = createBrowserHistory();

function getLibrary(provider) {
  const library = new Web3Provider(provider)
  library.pollingInterval = 15000
  return library
}

const App = () => {
  const { settings } = useSettings();

  const theme = createTheme({
    theme: settings.theme
  });

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <StakingContractProvider>
        <ThemeProvider theme={theme}>
          <StylesProvider jss={jss}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <SnackbarProvider
                dense
                maxSnack={3}
              >
                <Router history={history}>
                  <GlobalStyles />
                  <ScrollReset />
                  {renderRoutes(routes)}
                </Router>
              </SnackbarProvider>
            </MuiPickersUtilsProvider>
          </StylesProvider>
        </ThemeProvider>
      </StakingContractProvider>
    </Web3ReactProvider>
  );
};

export default App;

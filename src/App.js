import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { create } from 'jss';
import MomentUtils from '@date-io/moment';
import { SnackbarProvider } from 'notistack';
import { jssPreset, StylesProvider, ThemeProvider } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import GlobalStyles from './components/GlobalStyles';
import ScrollReset from './components/ScrollReset';
import useSettings from './hooks/useSettings';
import { createTheme } from './theme';
import routes, { renderRoutes } from './routes';
//import {StakingContractProvider} from "./context/StakingContract/index";

import cookie from 'cookie';
import { AuthContextProvider } from './context/AuthContext.js';
import { checkIsPrivatePath, checkIsPublicPath } from './utils/helpers';
import { CookieName } from './config/constants';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

const jss = create({ plugins: [...jssPreset().plugins] });
const history = createBrowserHistory();

const App = () => {
  const { settings } = useSettings();

  const theme = createTheme({
    theme: settings.theme
  });

  Sentry.init({
    dsn: 'https://ad98ddba9156418181310241fa8d7116@o544538.ingest.sentry.io/5669385',
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 0.0
  });

  return (
    <AuthContextProvider>
      <ThemeProvider theme={theme}>
        <StylesProvider jss={jss}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <SnackbarProvider dense maxSnack={3}>
              <Router history={history}>
                <GlobalStyles />
                <ScrollReset />
                {renderRoutes(routes)}
              </Router>
            </SnackbarProvider>
          </MuiPickersUtilsProvider>
        </StylesProvider>
      </ThemeProvider>
    </AuthContextProvider>
  );
};

export default App;

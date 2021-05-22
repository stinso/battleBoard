import _ from 'lodash';
import { colors, createMuiTheme } from '@material-ui/core';
import { THEMES } from '../constants';
import { softShadows, strongShadows } from './shadows';
import typography from './typography';
import green from '@material-ui/core/colors/green';

const baseOptions = {
  typography,
  overrides: {
    MuiLinearProgress: {
      root: {
        borderRadius: 3,
        overflow: 'hidden'
      }
    },
    MuiListItemIcon: {
      root: {
        minWidth: 32
      }
    },
    MuiChip: {
      root: {
        backgroundColor: 'rgba(0,0,0,0.075)'
      }
    },
    MuiStepIcon: {
      root: {
        '&$completed': {
          color: '#f5542a'
        },
        '&$active': {
          color: '#f5542a'
        }
      }
    }
  }
};

const themesOptions = [
  {
    name: THEMES.DARK,
    palette: {
      type: 'dark',
      action: {
        active: 'rgba(255, 255, 255, 0.54)',
        hover: 'rgba(255, 255, 255, 0.04)',
        selected: 'rgba(255, 255, 255, 0.08)',
        disabled: 'rgba(255, 255, 255, 0.26)',
        disabledBackground: 'rgba(255, 255, 255, 0.12)',
        focus: 'rgba(255, 255, 255, 0.12)'
      },
      background: {
        default: '#282C34',
        dark: '#1c2025',
        paper: '#282C34'
      },
      divider: 'rgba(255, 255, 255, 0.12)',
      primary: {
        main: '#80260f'
      },
      secondary: {
        main: '#f5542a'
      },
      text: {
        primary: '#e6e5e8',
        secondary: '#adb0bb'
      },
      success: {
        main: green[500],
        contrastText: '#fff'
      }
    },
    shadows: strongShadows
  }
];

export const createTheme = (config = {}) => {
  let themeOptions = themesOptions.find((theme) => theme.name === config.theme);

  if (!themeOptions) {
    console.warn(new Error(`The theme ${config.theme} is not valid`));
    [themeOptions] = themesOptions;
  }

  let theme = createMuiTheme(_.merge({}, baseOptions, themeOptions));

  return theme;
};

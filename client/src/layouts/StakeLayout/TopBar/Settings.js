import React, {
  useRef
} from 'react';
import { THEMES } from 'src/constants';
import {
  Badge,
  IconButton,
  SvgIcon,
  Tooltip,
  makeStyles
} from '@material-ui/core';
import { 
  Sun as SunIcon,
  Moon as MoonIcon
} from 'react-feather';
import useSettings from 'src/hooks/useSettings';

const useStyles = makeStyles((theme) => ({
  badge: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginTop: 10,
    marginRight: 5
  },
  icon: {
    color: theme.palette.background.paper
  }
}));

const Settings = () => {
  const classes = useStyles();
  const ref = useRef(null);
  const { settings, saveSettings } = useSettings();

  const handleChange = (value) => {
    saveSettings({ theme: value});
  };

  const toggleTheme = () => {
    if (settings.theme == THEMES.DARK) {
      handleChange(THEMES.LIGHT)
    } else {
      handleChange(THEMES.DARK)
    }
  };

  const getIcon = () => {
    if (settings.theme == THEMES.DARK) {
      return (
        <SvgIcon
          fontSize="small"
          color="action"
        >
          <MoonIcon />
        </SvgIcon>
      )
    } else {
      return (
        <SvgIcon
          className={classes.icon}
          fontSize="small"
        >
          <SunIcon />
        </SvgIcon>
      )
    }
  };

  return (
    <>
      <Tooltip title="Toggle Dark/Light">
        <Badge
          color="secondary"
          variant="dot"
          classes={{ badge: classes.badge }}
        >
          <IconButton
            color="inherit"
            onClick={toggleTheme}
            ref={ref}
          >
            <SvgIcon fontSize="small">
              {getIcon()}
            </SvgIcon>
          </IconButton>
        </Badge>
      </Tooltip>
    </>
  );
}

export default Settings;

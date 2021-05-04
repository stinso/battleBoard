import {
    LOGOUT_REQUEST, 
    LOGIN_REQUEST, 
    SET_USER_INFO,
    SET_NOTIFICATION_EVENT,
    SET_CHALLENGE_TAB,
    DO_NOT_SHOW_WIZARD,
  } from '../actions/actions.js';
import Cookies from "js-cookie";
import { CookieName } from '../config/constants';
import { ContactsOutlined } from '@material-ui/icons';


export let SessionID =  Cookies.get(CookieName);

  export const AuthReducer = (state, action) => {
    switch (action.type) {
      case LOGOUT_REQUEST:
        Cookies.remove(CookieName)
        SessionID = '';
          return {
              ...state,
              user: {
                  isLoggedIn: false,
              },
            };
      case LOGIN_REQUEST:
        console.log(CookieName)
        SessionID = Cookies.get(CookieName)
        console.log('session id:')
        console.log(SessionID)
        console.log(Cookies.get)
        return {
          ...state,
          user: {
              ...state.user,
              isLoggedIn: true,
              session: {
                ...action.payload
              }
          },
        };
        case SET_USER_INFO:
        SessionID = Cookies.get(CookieName)
        return {
          ...state,
          user: {
              ...state.user,
              isLoggedIn: true,
              session: {
                ...action.payload
              }
          },
        };
        case SET_CHALLENGE_TAB:
          SessionID = Cookies.get(CookieName)
          return {
            ...state,
            user: {
                ...state.user,
              challenges: {
                  ...action.payload,
                }
            },
          };
        case SET_NOTIFICATION_EVENT:
          return {
            ...state,
            user: {
                ...state.user,
                eventInfo: {
                  ...state.user.eventInfo,
                  [action.payload.eventID] : {
                    [action.payload.notificationType]: {
                      ...action.payload.notificationInfo,
                      time: Math.floor(Date.now() / 1000),
                    },
                  }
                }
            },
          }
          case DO_NOT_SHOW_WIZARD:
            return {
              ...state,
              user: {
                ...state.user,
                doNotShowWizard: true, 
              },
            }
      default:
        return state;
    }
  };
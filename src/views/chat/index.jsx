import React, { useContext, useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import Message from './Message';
import db, { Timestamp } from '../../config/firebase';
import { AuthContext } from '../../context/AuthContext';
import messageSent from '../../public/sounds/MessageSent.mp3';
import newMessage from '../../public/sounds/NewMessage.mp3';
import * as Sentry from '@sentry/react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Input,
  Paper,
  SvgIcon,
  TextField,
  Tooltip,
  Typography,
  makeStyles
} from '@material-ui/core';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import ChatBubbleIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Send as SendIcon } from 'react-feather';
import LoadingScreen from 'src/components/LoadingScreen';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    width: '350px',
    height: '600px',
    position: 'fixed',
    overflow: 'hidden',
    bottom: 0,
    right: 0,
    zIndex: 3
  },
  scroll: {
    padding: theme.spacing(2)
  },
  chat: {
    maxWidth: '350px',
    height: '600px',
    position: 'fixed',
    overflow: 'hidden',
    bottom: 0,
    right: 0,
    zIndex: 3
  },
  form: {
    justifyContent: 'center'
  },
  none: {
    display: 'none !important'
  },
  header: {
    backgroundColor: theme.palette.background.dark,
    borderColor: theme.palette.background.paper
  },
  count: {
    position: 'absolute',
    bottom: '12%',
    right: '25%',
    background: '#ec250d',
    width: '14px',
    height: '14px',
    borderRadius: '50%'
  },
  fixed: {
    position: 'fixed !important',
    display: 'inline-block !important',
    bottom: '3%',
    zIndex: '4',
    right: '3%',
    fontSize: '20px'
  },
  box: {
    backgroundColor: '#555',
    width: '350px',
    height: '600px',
    position: 'fixed',
    overflow: 'hidden',
    bottom: 0,
    right: 0,
    zIndex: 3
  },
  message: {
    backgroundColor: '#aaa',
    height: '80px',
    width: '80px'
  },
  content: {
    backgroundColor: theme.palette.background.paper
  },
  footer: {
    height: '100px',
    backgroundColor: '#333'
  },
  iconButton: {
    backgroundColor: theme.palette.primary.main
  },
  icon: {
    color: '#fff'
  },
  composer: {
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    padding: theme.spacing(1, 2)
  },
  inputContainer: {
    flexGrow: 1,
    marginLeft: theme.spacing(0),
    padding: theme.spacing(1)
  }
}));

let listeners = [];
let soundTime = null;
let shouldPlaySound = false;

const ChatPage = ({ roomType, typeId }) => {
  const classes = useStyles();
  const inputbox = useRef();
  const audioNewMessage = useRef();
  const audioSendMessage = useRef();
  const messagesEndRef = useRef(null);

  const [formValueFocus, setFormValueFocus] = useState();
  const [cursorPosition, setCursorPosition] = useState(0);
  const [showChatBox, setShowChatBox] = useState(false);
  const [formValue, setFormValue] = useState('');
  const [emojiPicker, setEmojiPicker] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [canLoadMore, setCanLoadMore] = useState(true);
  const [start, setStart] = useState(null);
  const [showDot, setShowDot] = useState(true);
  const [scrollEl, setScrollEl] = useState();

  const { user } = useContext(AuthContext);
  const location = useLocation();

  const username = user.user.session?.username;

  const getCaretPosition = () => {
    if (window.getSelection && window.getSelection().getRangeAt) {
      var range = window.getSelection().getRangeAt(0);
      var selectedObj = window.getSelection();
      var rangeCount = 0;
      var childNodes = selectedObj.anchorNode.parentNode.childNodes;
      for (var i = 0; i < childNodes.length; i++) {
        if (childNodes[i] == selectedObj.anchorNode) {
          break;
        }
        if (childNodes[i].outerHTML)
          rangeCount += childNodes[i].outerHTML.length;
        else if (childNodes[i].nodeType == 3) {
          rangeCount += childNodes[i].textContent.length;
        }
      }
      return range.startOffset + rangeCount;
    }
    return -1;
  };

  function detachListeners() {
    listeners.forEach((listener) => listener());
  }

  useEffect(() => {
    shouldPlaySound = showChatBox;
  }, [showChatBox]);

  const sendMessage = () => {
    let messageVal = formValue;
    if (messageVal != '') {
      if (messageVal.trim() != '') {
        const messagesRef = db.collection('chats');
        var commentMsg = messageVal.trim();
        messagesRef.add({
          username,
          message: commentMsg,
          createdAt: Timestamp.fromDate(new Date()),
          typeID: typeId,
          imagePath: user.user.session.dpLow,
          type: roomType
        });
        audioSendMessage?.current?.play();
        setTimeout(() => {
          audioSendMessage?.current?.pause();
        }, 59.13);
        setFormValue('');
        scrollToBottom();
      }
    }
  };

  const handleClick = () => {
    setEmojiPicker(false);
  };

  const addEmoji = (e) => {
    let sym = e.unified.split('-');
    let codesArray = [];
    sym.forEach((el) => codesArray.push('0x' + el));
    let emoji = String.fromCodePoint(...codesArray);
    let formval = formValue;
    let subpart = emoji;
    let output = [
      formval.slice(0, cursorPosition),
      subpart,
      formval.slice(cursorPosition)
    ].join('');
    setFormValue(output);
    let text_length = formValue.length;
    setCursorPosition(text_length + 2);
    inputbox.current.value = output;
  };

  const formatMessageFromSnapshot = (snapShot) => {
    return {
      imagePath: snapShot.imagePath,
      isSelf: snapShot.username === username,
      time: snapShot.createdAt.toMillis(),
      username: snapShot.username,
      message: snapShot.message,
      id: snapShot.id
    };
  };

  const handleNewCount = (newCount) => {
    if (newCount > 0) {
      if (showChatBox === false) {
        setShowDot(true);
      }
      if (soundTime != null) {
        clearTimeout(soundTime);
      }
      if (shouldPlaySound) {
        setTimeout(() => {
          audioNewMessage?.current?.pause();
        }, 744);
        audioNewMessage?.current?.play();
      }
    }
    scrollToBottom();
    setIsLoading(false);
  };

  const getMessages = async () => {
    setIsLoading(true);
    try {
      let ref = db.collection('chats');
      ref = ref
        .where('type', '==', roomType)
        .where('typeID', '==', String(typeId));
      const snapShot = await ref.orderBy('createdAt', 'desc').limit(5).get();
      let tempStart = null;
      if (snapShot.docs.length == 0) {
        tempStart = null;
        setCanLoadMore(false);
      } else {
        tempStart = snapShot.docs[snapShot.docs.length - 1];
      }
      let newCount = 0;
      const messagesFromSnapshotUpdate = [];
      snapShot.docs.forEach((doc) => {
        const data = doc.data();

        if (data.username != username) {
          newCount = newCount + 1;
        }
        messagesFromSnapshotUpdate.push(
          formatMessageFromSnapshot({
            id: doc.id,
            ...data
          })
        );
      });
      setMessages(messagesFromSnapshotUpdate.reverse());
      const listener = ref
        .orderBy('createdAt')
        .startAfter(snapShot.docs[0] || null)
        .onSnapshot(
          (querySnapshot) => {
            setIsLoading(true);
            let newCount = 0;
            const messagesFromSnapshotUpdate = [];
            querySnapshot.docChanges().forEach((change) => {
              const data = change.doc.data();

              if (data.username != username) {
                newCount = newCount + 1;
              }
              messagesFromSnapshotUpdate.push(
                formatMessageFromSnapshot({
                  id: change.doc.id,
                  ...data
                })
              );
            });
            setMessages((preValue) => {
              return [...preValue, ...messagesFromSnapshotUpdate];
            });
            handleNewCount(newCount);
          },
          (error) => {
            setIsLoading(false);
            console.log(`Encountered error: ${error}`);
          }
        );
      handleNewCount(newCount);
      listeners.push(listener);
      setStart(tempStart);
    } catch (error) {
      console.log(
        '🚀 ~ file: index.jsx ~ line 204 ~ getMessages ~ error',
        error
      );
      Sentry.captureException(error, {
        tags: {
          page: location.pathname
        }
      });
    }
    setIsLoading(false);
  };

  const getMoreMessages = async () => {
    setIsLoading(true);

    if (typeof start == 'undefined') {
      setIsLoading(false);
      return;
    }

    let ref = db.collection('chats');
    ref = ref
      .where('type', '==', roomType)
      .where('typeID', '==', String(typeId));
    const snapshots = await ref
      .orderBy('createdAt', 'desc')
      .startAfter(start)
      .limit(5)
      .get();

    if (snapshots.empty) {
      setIsLoading(false);
      setCanLoadMore(false);
      return;
    }

    let newMessages = [];
    snapshots.forEach((doc) => {
      newMessages.push(
        formatMessageFromSnapshot({ id: doc.id, ...doc.data() })
      );
    });

    let tempStart = snapshots.docs[snapshots.docs.length - 1];

    setMessages((preValue) => {
      return [...newMessages.reverse(), ...preValue];
    });
    setStart(tempStart);
    setIsLoading(false);
  };

  const handleChange = (event) => {
    setFormValue(event.target.value);
    if (getCaretPosition() != 84) {
      setCursorPosition(getCaretPosition());
    }
  };

  useEffect(() => {
    getMessages();
    return detachListeners();
  }, []);

  const scrollToBottom = () => {
    if (scrollEl) {
      scrollEl.scrollTop = scrollEl.scrollHeight;
    }
  };

  useEffect(() => {
    if (showChatBox) {
      scrollToBottom();
    }
  }, [showChatBox]);

  return (
    <div>
      {showChatBox ? (
        <div className={classes.root}>
          <Box
            alignItems="center"
            display="flex"
            border={1}
            className={classes.header}
          >
            <Box flexGrow={1} />
            <IconButton
              onClick={() => {
                setShowDot(true);
                setShowChatBox(false);
              }}
            >
              <SvgIcon fontSize="small">
                <CloseOutlinedIcon />
              </SvgIcon>
            </IconButton>
          </Box>
          <Box flexGrow={1} overflow="hidden" className={classes.content}>
            <PerfectScrollbar
              className={classes.scroll}
              options={{ suppressScrollX: true }}
              containerRef={(ref) => {
                setScrollEl(ref);
              }}
            >
              {!isLoading && canLoadMore && (
                <Box mb={2} display="flex" justifyContent="center">
                  <Button
                    color="primary"
                    size="small"
                    variant="outlined"
                    onClick={() => getMoreMessages()}
                  >
                    Load Previous
                  </Button>
                </Box>
              )}
              {isLoading && (
                <div>
                  <LoadingScreen width={200} />
                </div>
              )}
              {messages.map((message) => {
                return (
                  <Message
                    key={message.id}
                    imagePath={message.imagePath}
                    time={message.time}
                    username={message.username}
                    message={message.message}
                    isSelf={message.isSelf}
                  />
                );
              })}
              <div ref={messagesEndRef} />
            </PerfectScrollbar>
          </Box>
          <Divider />
          <div className={classes.composer}>
            <Paper variant="outlined" className={classes.inputContainer}>
              <Input
                id="inputbox"
                disableUnderline
                maxLength={50}
                fullWidth
                value={formValue}
                onChange={handleChange}
                onKeyUp={(e) => {
                  if (e.keyCode === 13) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Leave a message"
              />
            </Paper>
            <Tooltip title="Send">
              <span>
                <IconButton
                  color="secondary"
                  disabled={!formValue}
                  onClick={(e) => {
                    e.preventDefault();
                    sendMessage();
                  }}
                >
                  <SvgIcon fontSize="small">
                    <SendIcon />
                  </SvgIcon>
                </IconButton>
              </span>
            </Tooltip>
          </div>
        </div>
      ) : (
        <>
          <div className={classes.fixed}>
            {showDot && (
              <IconButton
                className={classes.iconButton}
                onClick={() => {
                  setShowDot(false);
                  setShowChatBox(true);
                }}
              >
                <SvgIcon className={classes.icon}>
                  <ChatBubbleIcon />
                </SvgIcon>
              </IconButton>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ChatPage;

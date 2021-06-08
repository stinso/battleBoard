import React, {useContext,  useEffect, useState, useRef} from "react";
import { useLocation } from 'react-router-dom';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart';
import Message from './Message';
import db, { Timestamp, } from "../../config/firebase";
import { AuthContext } from "../../context/AuthContext";
import messageSent from '../../public/sounds/MessageSent.mp3';
import newMessage from '../../public/sounds/NewMessage.mp3';
import * as Sentry from "@sentry/react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  SvgIcon,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core'
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import PerfectScrollbar from 'react-perfect-scrollbar';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    width: '350px',
    height: '600px',
    position: "fixed",
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
    position: "fixed",
    overflow: 'hidden',
    bottom: 0,
    right: 0,
    zIndex: 3 
  },
  form: {
    justifyContent: "center"
  },
  none: {
    display: "none !important"
  },
  header: {
    backgroundColor: theme.palette.background.dark,
    position: 'sticky'
  },
  count: {
    position: 'absolute',
    bottom: '12%',
    right: '25%',
    background: '#ec250d',
    width: '14px',
    height: '14px',
    borderRadius: '50%',
  },
  fixed: {
    position: 'fixed !important',
    display: 'inline-block !important'
  },
  content: {
    height: '200px',
    overflowY: 'scroll',
  },
  box: {
    backgroundColor: '#555',
    width: '350px',
    height: '600px',
    position: "fixed",
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
    height: '340px',
    backgroundColor: '#111'
  },
  footer: {
    height: '100px',
    backgroundColor: '#333'
  }
}))

let listeners = []    
let soundTime = null;
let shouldPlaySound = false;


const ChatPage = ({roomType, typeId}) => {
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
  const [showDot, setShowDot] = useState(false);

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
  }

  function detachListeners() {
    listeners.forEach(listener => listener())
  }

  useEffect(() => {
    shouldPlaySound = showChatBox;
  },[showChatBox])

  const sendMessage = () => {
    let messageVal = formValue;
    if ( messageVal != "" ){
      if (messageVal.trim() != "") {
        
        const messagesRef = db.collection("chats");
        var commentMsg = messageVal.trim();
        messagesRef.add({
            username,
            message: commentMsg,
            createdAt: Timestamp.fromDate(new Date()),
            typeID: typeId,
            imagePath: user.user.session.dpLow,
            type: roomType,
        })
        audioSendMessage?.current?.play();
        setTimeout(() => {
          audioSendMessage?.current?.pause();
        }, 59.13);
        setFormValue('');
        inputbox.current.focus();
        inputbox.current.value = '';
        inputbox.current.focus();
        scrollToBottom();
      }else{
        inputbox.current.focus();
      }
    }else{
      inputbox.current.focus();
    }
  }

  const handleClick = () => {
    setEmojiPicker(false);
}

  const addEmoji = (e) => {
    let sym = e.unified.split('-')
    let codesArray = []
    sym.forEach(el => codesArray.push('0x' + el))
    let emoji = String.fromCodePoint(...codesArray)	  
    let formval = formValue;
    let subpart = emoji;		
    let output = [formval.slice(0, cursorPosition), subpart, formval.slice(cursorPosition)].join('');
    setFormValue( output );
    let text_length = formValue.length;
    setCursorPosition( text_length + 2 );
    inputbox.current.value = output;
  }
  

  const formatMessageFromSnapshot = (snapShot) => {
    return {
      imagePath: snapShot.imagePath,
      isSelf: snapShot.username === username,
      time: snapShot.createdAt.toMillis(),
      username: snapShot.username,
      message: snapShot.message,
      id: snapShot.id,
    }
  }

  const handleNewCount = (newCount) => {
    if ( newCount > 0 ){
      if (showChatBox === false) {
        setShowDot(true);
      }
      if ( soundTime != null ){
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
  }

const getMessages = async () => {
  setIsLoading(true);
  try {
    let ref = db.collection('chats');
    ref = ref.where('type', '==', roomType).where('typeID', '==', String(typeId));
    const snapShot = await ref
      .orderBy('createdAt', 'desc')
      .limit(5)
      .get()
    let tempStart = null;
      if (snapShot.docs.length == 0 ){
        tempStart = (null);
        setCanLoadMore(false);
      }else{
        tempStart = (snapShot.docs[snapShot.docs.length - 1])
      }
      let newCount = 0;
      const messagesFromSnapshotUpdate = [];
      snapShot.docs.forEach(doc => {
            const data = doc.data();
            
            if ( data.username != username ){
              newCount = newCount + 1;
            }
            messagesFromSnapshotUpdate.push(formatMessageFromSnapshot({
              id: doc.id,
              ...data,
            }))
          });
    setMessages(messagesFromSnapshotUpdate.reverse());
    const listener = ref
      .orderBy('createdAt')
      .startAfter(snapShot.docs[0] || null)
      .onSnapshot(querySnapshot => {
        setIsLoading(true);
        let newCount = 0;
        const messagesFromSnapshotUpdate = [];
        querySnapshot.docChanges().forEach(change => {
              const data = change.doc.data();
              
              if ( data.username != username ){
                newCount = newCount + 1;
              }
              messagesFromSnapshotUpdate.push(formatMessageFromSnapshot({
                id: change.doc.id,
                ...data,
              }))
            });
        setMessages((preValue) => {
          return [...preValue, ...messagesFromSnapshotUpdate]
        });
        handleNewCount(newCount);
      }, (error) => {
        setIsLoading(false);            
        console.log(`Encountered error: ${error}`);
    });
    handleNewCount(newCount);
    listeners.push(listener)
    setStart(tempStart);
  }
  catch (error) {
    console.log("🚀 ~ file: index.jsx ~ line 204 ~ getMessages ~ error", error);
    Sentry.captureException(error, {
      tags: {
          page: location.pathname,
      },
    });
  }
  setIsLoading(false);
}

const getMoreMessages = async () => {

  setIsLoading(true);

  if ( typeof start == "undefined" ){
    setIsLoading(false);
    return;
  }

  let ref = db.collection('chats');
  ref = ref.where('type', '==', roomType).where('typeID', '==', String(typeId))
  const snapshots = await ref.orderBy('createdAt', 'desc').startAfter(start).limit(5).get();
    
  if (snapshots.empty) {
    setIsLoading(false);
    setCanLoadMore(false);
    return;
  }

  let newMessages = [];
  snapshots.forEach(doc => {
    newMessages.push(formatMessageFromSnapshot({id: doc.id,...doc.data()}))
  });

  let tempStart = (snapshots.docs[snapshots.docs.length - 1])

  setMessages((preValue) => {
    return [...newMessages.reverse(), ...preValue];
  });
  setStart(tempStart);
  setIsLoading(false);
}

  const handleChange = (event) => {
      setFormValue(event.target.value);
      if ( getCaretPosition() != 84 ){
        setCursorPosition(getCaretPosition());
      }
  }

  useEffect(()=>{
      getMessages()
      return detachListeners()
    },
    []
  )


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (showChatBox) {
      scrollToBottom();
    }
  },[showChatBox])

  return (
    <>
      {/* <div>
        <meta charSet="UTF-8" />
        <audio
          type="audio/mpeg"
          loop
          src={newMessage}
          ref={audioNewMessage}
          className={classes.none}
        />
        <audio
          loop
          type="audio/mpeg"
          src={messageSent}
          ref={audioSendMessage}
          className={classes.none}
        />
        {showChatBox ?
          (
            <Card className={classes.chat}  >
              <CardHeader className={classes.header}
              action={
                <IconButton aria-label="settings" aria-hidden="true"
                onClick={() => {
                  setShowDot(false);
                  setShowChatBox(false);
                }}>
                  <CloseOutlinedIcon />
                </IconButton>
              }>
                HEJ!
              </CardHeader>
              <PerfectScrollbar options={{ suppressScrollX: true }}>
              <CardContent id='chat-box-end' className={classes.content}>
              {( !isLoading && canLoadMore ) &&
                  <p onClick={() => getMoreMessages()}>Load Previous</p>
                }
                {isLoading && (
                  <p>
                    {isLoading ? <>
                    Loading
                    </> : 'No Upcoming Events' } 
                </p>
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
                  )
                })}
                <div ref={messagesEndRef} />
              </CardContent>
              </PerfectScrollbar>
              <CardActions>
                <form
                  className={classes.form}
                >
                  <Box display="flex" >
                  <span className={`${!emojiPicker ? classes.none : ''}`}>
                    <Picker onSelect={addEmoji} title={'Chain Games'}  />
                  </span>
                      <TextField  onClick={() => {
                        setEmojiPicker(!emojiPicker);
                      }}>
                        icon
                      </TextField >
                    <TextField 
                      placeholder="Your message"
                      maxLength={50}
                      type="text"
                      id='inputbox'
                      ref={inputbox}
                      onChange={handleChange}
                      value={formValue}
                      onClick={handleClick}
                      onFocus={e => setFormValueFocus(true)}
                      onBlur={e => setFormValueFocus(false)}
                      onKeyUp={(e) => {
                        if (e.keyCode === 13) {
                          e.preventDefault();
                          sendMessage();
                        }
                      }}
                    />
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        sendMessage();
                      }}
                      color="warning">
                      send
                    </Button> 
                </Box>
                </form>
              </CardActions>
            </Card>
          ) : (
            <>
              <div
                style={{
                  bottom: '3%',
                  zIndex: '4',
                  right: '3%',
                  fontSize: '20px'
                }}
                className={classes.fixed}
              >
                <Button
                  color="warning"
                  onClick={() => {
                    setShowDot(false);
                    setShowChatBox(true);
                  }}
                >
                  <i
                    style={{
                      fontSize: '25px'
                    }}
                    icon
                  />
                  {showDot && <span className={classes.count}>count</span>}
                </Button>
              </div>
            </>
          )
        }
      </div> */}
      <div className={classes.root}>
        {showChatBox ? (
          <>
            <Box
              alignItems="center"
              display="flex"
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
            <Box
              flexGrow={1}
              overflow="hidden"
            >
              <PerfectScrollbar
                className={classes.scroll}
                options={{ suppressScrollX: true }}
              >
                {/* {messages.map((message) => {
                  return (
                    <Message
                      key={message.id}
                      imagePath={message.imagePath}
                      time={message.time}
                      username={message.username}
                      message={message.message}
                      isSelf={message.isSelf}
                    />
                  )
                })} */}
                <Box display="flex" mt={2}>
                  <Box className={classes.message} ml={'auto'} />
                </Box>
                <Box display="flex" mt={2}>
                  <Box className={classes.message} ml={'auto'} />
                </Box>
                <Box display="flex" mt={2}>
                  <Box className={classes.message} ml={'0'} />
                </Box>
                <Box display="flex" mt={2}>
                  <Box className={classes.message} ml={'0'} />
                </Box>
                <Box display="flex" mt={2}>
                  <Box className={classes.message} ml={'0'} />
                </Box>
                <Box display="flex" mt={2}>
                  <Box className={classes.message} ml={'0'} />
                </Box>
                <Box display="flex" mt={2}>
                  <Box className={classes.message} ml={'0'} />
                </Box>
              </PerfectScrollbar>
            </Box>
            <Box className={classes.footer}>

            </Box>
            </>
        ) : (
          <div
            style={{
              bottom: '3%',
              zIndex: '4',
              right: '3%',
              fontSize: '20px'
            }}
            className={classes.fixed}
          >
            <Button
              color="warning"
              onClick={() => {
                setShowDot(false);
                setShowChatBox(true);
              }}
            >
              <i
                style={{
                  fontSize: '25px'
                }}
                icon
              />
              {showDot && <span className={classes.count}>count</span>}
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

export default ChatPage;

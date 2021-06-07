import React, {useContext,  useEffect, useState, useRef} from "react";
import { useLocation } from 'react-router-dom';
import classnames from "classnames";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
} from "reactstrap";
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart';
import Message from './Message';
import db, { Timestamp, } from "../../config/firebase";
import { AuthContext } from "../../context/AuthContext";
import messageSent from '../../public/sounds/MessageSent.mp3';
import newMessage from '../../public/sounds/NewMessage.mp3';
import * as Sentry from "@sentry/react";

let listeners = []    
let soundTime = null;
let shouldPlaySound = false;


const ChatPage = ({roomType, typeId}) => {
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
      <div className='chat-page'>
        <meta charSet="UTF-8" />
        <audio
          type="audio/mpeg"
          loop
          src={newMessage}
          ref={audioNewMessage}
          className='d-none'
        />
        <audio
          loop
          type="audio/mpeg"
          src={messageSent}
          ref={audioSendMessage}
          className='d-none'
        />
        {showChatBox ?
          (
            <Card className="chat"  >
              <div
                className='chat-header row mx-1'>
                <div className='col text-right pr-0'>
                <Button
                  aria-hidden="true"
                  className="transparent-button"
                  onClick={() => {
                    setShowDot(false);
                    setShowChatBox(false);
                  }}
                >
                  <i className="tim-icons icon-simple-remove" />
                </Button>
                  </div>
                
              </div>
              <CardBody id='chat-box-end'>
              {( !isLoading && canLoadMore ) &&
                  <p onClick={() => getMoreMessages()} className="text-center hover-pointer font-weight-bold">Load Previous</p>
                }
                {isLoading && (
                  <p className='text-center font-weight-bold chat-page'>
                    {isLoading ? <>
                    Loading
                    <div className="spinner">
                      <div className="bounce1" />
                      <div className="bounce2" />
                      <div className="bounce3" />
                    </div>
                    
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
              </CardBody>
              <CardFooter className="d-block chat-footer">
                <Form
                  className="align-items-center"
                >
                  <InputGroup
                    className={classnames("d-flex", "form-control-lg", {
                      "input-group-focus" : formValueFocus
                    })}
                  >
                  <span className={`emoji-popup ${!emojiPicker ? 'd-none' : ''}`}>
                    <Picker onSelect={addEmoji} title={'Chain Games'}  />
                  </span>
                    <InputGroupAddon
                      addonType="prepend"
                      className="d-flex hover-pointer"
                    >
                      <InputGroupText onClick={() => {
                        setEmojiPicker(!emojiPicker);
                      }}>
                        <i className="tim-icons icon-satisfied" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
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
                      className="btn-simple ml-2"
                      onClick={(e) => {
                        e.preventDefault();
                        sendMessage();
                      }}
                      color="warning">
                      <i className="tim-icons icon-send" />
                    </Button> 
                </InputGroup>
                </Form>
              </CardFooter>
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
                className='position-fixed d-inline-block'
              >
                <Button
                  className="btn-warning"
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
                    className="tim-icons icon-chat-33"
                  />
                  {showDot && <span className='notify-count'></span>}
                </Button>
              </div>
            </>
          )
        }
      </div>
    </>
  );
}

export default ChatPage;

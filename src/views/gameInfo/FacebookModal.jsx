import { useEffect, useState, useContext, useCallback, Fragment } from "react";
import {
    Box,
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    Grid,
    Paper,
    Typography,
    makeStyles
  } from '@material-ui/core';
import GameConsoleSelection from "./ConsoleSelection";
import {
    useLocation
  } from 'react-router-dom';
import {
    FacebookProvider,
    LoginButton,
    Like,
    ShareButton,
    Initialize,
    Status,
} from 'react-facebook';
import { FacebookAppID, ChainGamesFBID, Devices,} from '../../config/constants'
import Nav from '../initialStepsWizard/Nav';
import { Alert } from '@material-ui/lab';
import * as Sentry from "@sentry/react";


const FaceBookStepsModal = ({
    consoleSelectedValue,
    handleConsoleOnChange,
    handleSponsoredEventRegister,
    fbInfo,
    setFbInfo,
    eventData,
    isSponsoredEvent,
    setShowFacebookModal,
    showFacebookModal,
    facebookNotification,
    isLoading,
    setFacebookNotification,
}) => {
    const [currentStep, setCurrentStep] = useState(1);
    const location = useLocation();


    useEffect(() => {
        if (isSponsoredEvent) {
        checkLoginState();
        }
    }, [isSponsoredEvent, showFacebookModal])
    
    useEffect(() => {
        CheckLikeOnFB();
    }, [fbInfo.isConnected])
    
    
    function checkLoginState() {
        try{
        FB.getLoginStatus(function(response) {   // See the onlogin handler
            console.log("🚀 ~ file: GameInformationSectionOne.jsx ~ line 206 ~ window?.FB?.getLoginStatus ~ response", response)
            if (response.status === 'connected') {
            CheckLikeOnFB();
            setCurrentStep(2);
            setFbInfo((prevState) => {
                return {
                ...prevState, isConnected: true,
                accessToken: response.authResponse?.accessToken,
                }
            })
            }
        });           
    
        }
        catch(error){
            console.log("🚀 ~ file: GameInformationSectionOne.jsx ~ line 230 ~ checkLoginState ~ error", error)
        }
    }
    function onLoginClick() {
        try {
        FB.login(function(response) {
            if (response.status === 'connected') {
            CheckLikeOnFB();
            setCurrentStep(2);
            setFbInfo((prevState) => {
                return {
                ...prevState, isConnected: true,
                accessToken: response.authResponse?.accessToken,
                }
            })
            }
        });
        }
        catch (error) {
            console.log("🚀 ~ file: FacebookModal.js ~ line 95 ~ onLoginClick ~ error", error)
            Sentry.captureException(error, {
                tags: {
                    page: location.pathname,
                },
            });
        }
        
    }
    
    useEffect(() => {
        if (fbInfo.isConnected && (!fbInfo.hasShared)) {
        setCurrentStep(2);
        }
        else if (fbInfo.hasShared) {
        setCurrentStep(3);
        }
    }, [fbInfo.hasShared, fbInfo.isConnected, showFacebookModal]);
    
    function onShareClick() {
        try {
        FB.ui({
            display: 'popup',
            method: 'share',
            href: window.location.href,
            hashtag: eventData.description,
            quote: 'I just enrolled for free in an exciting Chain Games Battle! Join this event and you can win Free CHAIN Tokens.'
            ,
        }, function (response) {
            console.log("🚀 ~ file: GameInformationSectionOne.jsx ~ line 185 ~ onShareClick ~ response", response)
            if (response && !response.error_message) {
            setFbInfo((prevState) => {
                return {...prevState, hasShared: true}
            })
            } else {
            setFbInfo((prevState) => {
                return {...prevState, hasShared: false}
            })
            }
        });
        }
        catch (error) {
            console.log("🚀 ~ file: FacebookModal.js ~ line 132 ~ onShareClick ~ error", error)
            Sentry.captureException(error, {
                tags: {
                    page: location.pathname,
                },
            });
        }
        
    }
    
    
    async function CheckLikeOnFB() {
        if (fbInfo.isConnected) {
        return new Promise((resolve, reject) => {
            FB.api(
            '/me/likes',
            'GET',
            {target_id : ChainGamesFBID},
            function (response) {
                if (response.error_code) {
                }
                else {
                if (response.data?.length > 0) {
                    setFbInfo((prevState) => {
                        return { ...prevState, isFollowing: true };
                    })
                }
                }
                console.log("🚀 ~ file: GameInformationSectionOne.jsx ~ line 139 ~ CheckLikeOnFB ~ response", response)
                resolve(true);
            }
            );
        });
        }
    return;
    }

    const FBStepOneLogin = () => {
        return (
        <>
            <Typography>
            Please login to your Facebook account. Please click the below button
            </Typography>
            <Box display="flex" justifyContent="center">
            <Button color="primary"
                disabled={fbInfo.isConnected}
                onClick={onLoginClick}
            >
                Login via Facebook (ICON
            </Button>
            </Box>
        
            </>
        )
    
    }
    
    const FBStepTwoLikeShare = () => {
    
        return (
        <>
            <Typography>
            Like us and share our post on Facebook to win more.
            </Typography>
            <div>
            {!fbInfo.isFollowing
                && 
                <div>
                <Like
                href="https://www.facebook.com/realchaingames"
                colorScheme="dark" 
                size='large'
                />
                </div>
            }
            <div className='col'>
            <Button color="facebook"
                disabled={fbInfo.hasShared}
                onClick={onShareClick}
                >
                Share on Facebook (ICON)
                </Button>
            </div>
            </div>
        </>
        )
    
    }
    
    const FBStepThreeSelectConsole = () => {
    
        return (
        <>
            <GameConsoleSelection
                consoleSelectedValue={consoleSelectedValue}
                handleConsoleOnChange={handleConsoleOnChange}
                isSponsoredEvent={true}
                deviceID={eventData.deviceID}
                game={eventData.game}
            />
        </>
        )
    }

    const renderAppropriateCard = (currentStep) => {
        switch(currentStep){
            case 1:
            return FBStepOneLogin();
            case 2:
            return FBStepTwoLikeShare();
            case 3:
            return FBStepThreeSelectConsole();
            default:
            return null;
        }
    }

    return (
        <FacebookProvider appId={FacebookAppID}>
            <div>
                <Dialog open={showFacebookModal}
                    onClose={() => setShowFacebookModal(false)}
                    width="lg"
                    maxWidth
                >
                    <DialogHeader>Facebook Steps</DialogHeader>
                    <DialogContent>
                        {facebookNotification.showNotification && (
                            <Alert
                            severity="warning"
                                onClose={() => {
                                    setFacebookNotification((prevValue) => {
                                        return {
                                            ...prevValue,
                                            showNotification: false,
                                        }
                                    })
                                    }
                                }
                            >
                                <span
                                    
                                > icon </span>
                                <span>{facebookNotification.message}</span>
                            </Alert>
                        )}
                        <p>
                            In order to register for the sponsored event, Please complete below steps.
                        </p>
                        <h2>
                            {`Step ${currentStep}`}
                        </h2>
                        <div>
                            {/* <Nav currentStep={currentStep} totalSteps={3} /> */}
                        </div>
                        {
                            renderAppropriateCard(currentStep)
                        }
                    </DialogContent>
                    <DialogActions>
                        {currentStep === 3 &&
                            <>
                                <Button
                                    disabled={!(fbInfo.isConnected && fbInfo.hasShared && consoleSelectedValue !== '') || (isLoading)}
                                    onClick={handleSponsoredEventRegister}>
                                    Register
                                    </Button>{" "}
                            </>
                        }
                        <Button onClick={() => setShowFacebookModal(false)}>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </FacebookProvider>
    );
};


export default FaceBookStepsModal;
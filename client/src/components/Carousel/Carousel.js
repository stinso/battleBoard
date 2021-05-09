import React, { useEffect, useState } from 'react';
import './carousel.css';
    
import {
    ChevronLeft,
    ChevronRight
} from '@material-ui/icons';

import { 
    IconButton,
    SvgIcon,
    makeStyles
} from '@material-ui/core';

 const useStyles = makeStyles((theme) => ({
    arrowLeft: {
        backgroundColor: theme.palette.background.paper,
        opacity: 0.8,
        position: 'absolute',
        zIndex: 1,
        top: '50%',
        transform: 'translateY(-50%)',
        width: '48px',
        height: '48px',
        marginLeft: '24px'
    },
    arrowRight: {
        backgroundColor: theme.palette.background.paper,
        opacity: 0.8,
        position: 'absolute',
        zIndex: 1,
        top: '50%',
        transform: 'translateY(-50%)',
        width: '48px',
        height: '48px',
        marginRight: '24px'
    },
    icon: {
        color: 'white'
    }
}));

const Carousel = (props) => {
    const classes = useStyles();
    const {children, show, infiniteLoop} = props

    const [currentIndex, setCurrentIndex] = useState(infiniteLoop ? show : 0)
    const [length, setLength] = useState(children.length)
    
    const [isRepeating, setIsRepeating] = useState(infiniteLoop && children.length > show)
    const [transitionEnabled, setTransitionEnabled] = useState(true)

    const [touchPosition, setTouchPosition] = useState(null)

    // Set the length to match current children from props
    useEffect(() => {
        setLength(children.length)
        setIsRepeating(infiniteLoop && children.length > show)
    }, [children, infiniteLoop, show])

    useEffect(() => {
        if (isRepeating) {
            if (currentIndex === show || currentIndex === length) {
                setTransitionEnabled(true)
            }
        }
    }, [currentIndex, isRepeating, show, length])

    const next = () => {
        if (isRepeating || currentIndex < (length - show)) {
            setCurrentIndex(prevState => prevState + 1)
        }
    }

    const prev = () => {
        if (isRepeating || currentIndex > 0) {
            setCurrentIndex(prevState => prevState - 1)
        }
    }

    const handleTouchStart = (e) => {
        const touchDown = e.touches[0].clientX
        setTouchPosition(touchDown)
    }

    const handleTouchMove = (e) => {
        const touchDown = touchPosition

        if(touchDown === null) {
            return
        }

        const currentTouch = e.touches[0].clientX
        const diff = touchDown - currentTouch

        if (diff > 5) {
            next()
        }

        if (diff < -5) {
            prev()
        }

        setTouchPosition(null)
    }

    const handleTransitionEnd = () => {
        if (isRepeating) {
            if (currentIndex === 0) {
                setTransitionEnabled(false)
                setCurrentIndex(length)
            } else if (currentIndex === length + show) {
                setTransitionEnabled(false)
                setCurrentIndex(show)
            }
        }
    }

    const renderExtraPrev = () => {
        let output = []
        for (let index = 0; index < show; index++) {
            output.push(children[length - 1 - index])
        }
        output.reverse()
        return output
    }

    const renderExtraNext = () => {
        let output = []
        for (let index = 0; index < show; index++) {
            output.push(children[index])
        }
        return output
    }

    return (
        <div className="carousel-container">
            <div className="carousel-wrapper">
                {
                    (isRepeating || currentIndex > 0) &&
                    <IconButton className={classes.arrowLeft} onClick={prev}>
                        <SvgIcon className={classes.icon}>
                            <ChevronLeft/>
                        </SvgIcon>
                    </IconButton>
                }
                <div
                    className="carousel-content-wrapper"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                >
                    <div
                        className={`carousel-content show-${show}`}
                        style={{
                            transform: `translateX(-${currentIndex * (100 / show)}%)`,
                            transition: !transitionEnabled ? 'none' : undefined,
                        }}
                        onTransitionEnd={() => handleTransitionEnd()}
                    >
                        {
                            (length > show && isRepeating) &&
                            renderExtraPrev()
                        }
                        {children}
                        {
                            (length > show && isRepeating) &&
                            renderExtraNext()
                        }
                    </div>
                </div>
                {
                    (isRepeating || currentIndex < (length - show)) &&
                    <div className="right-arrow">
                    <IconButton className={classes.arrowRight} onClick={next}>
                        <SvgIcon className={classes.icon}>
                            <ChevronRight/>
                        </SvgIcon>
                    </IconButton>
                    </div>
                }
            </div>
        </div>
    )
}

export default Carousel

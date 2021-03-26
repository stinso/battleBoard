import React from 'react';
import Carousel from "react-material-ui-carousel"
import autoBind from "auto-bind"
import '../style/Example.scss';

import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid,
    Button,
    Checkbox,
    FormControlLabel,
    Radio,
    RadioGroup,
    FormLabel,
    Slider,
    IconButton
} from '@material-ui/core';



const items = [
    {
        Name: "Apex",
        Image: "/static/images/apex.jpg"
    },
    {
        Name: "Fifa",
        Image: "/static/images/fifa21.jpg"
    },
    {
        Name: "Fortnite",
        Image: "/static/images/fortnite.png"
    }
]

class BannerExample extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            autoPlay: false,
            animation: "fade",
            indicators: true,
            timeout: 500,
            navButtonsAlwaysVisible: false,
            navButtonsAlwaysInvisible: false,
            cycleNavigation: true
        }

        autoBind(this);
    }

    toggleAutoPlay() {
        this.setState({
            autoPlay: !this.state.autoPlay
        })
    }

    toggleIndicators() {
        this.setState({
            indicators: !this.state.indicators
        })
    }

    toggleNavButtonsAlwaysVisible() {
        this.setState({
            navButtonsAlwaysVisible: !this.state.navButtonsAlwaysVisible
        })
    }

    toggleNavButtonsAlwaysInvisible() {
        this.setState({
            navButtonsAlwaysInvisible: !this.state.navButtonsAlwaysInvisible
        })
    }

    toggleCycleNavigation() {
        this.setState({
            cycleNavigation: !this.state.cycleNavigation
        })
    }

    changeAnimation(event) {
        this.setState({
            animation: event.target.value
        })
    }

    changeTimeout(event, value) {
        this.setState({
            timeout: value
        })
    }

    render() {
        return (

                <Carousel
                    className="Example"
                    autoPlay={this.state.autoPlay}
                    animation={this.state.animation}
                    indicators={this.state.indicators}
                    timeout={this.state.timeout}
                    cycleNavigation={this.state.cycleNavigation}
                    navButtonsAlwaysVisible={this.state.navButtonsAlwaysVisible}
                    navButtonsAlwaysInvisible={this.state.navButtonsAlwaysInvisible}
                    next={(now, previous) => console.log(`Next User Callback: Now displaying child${now}. Previously displayed child${previous}`)}
                    prev={(now, previous) => console.log(`Prev User Callback: Now displaying child${now}. Previously displayed child${previous}`)}
                    onChange={(now, previous) => console.log(`OnChange User Callback: Now displaying child${now}. Previously displayed child${previous}`)}
                    // fullHeightHover={false}
                    // navButtonsProps={{style: {backgroundColor: 'cornflowerblue', borderRadius: 0}}}
                    // navButtonsWrapperProps={{style: {bottom: '0', top: 'unset', }}}
                    // indicatorContainerProps={{style: {margin: "20px"}}}
                    // NextIcon='next'
                >
                    <Card raised className="Banner">
                        <Grid container spacing={3} className="BannerGrid">
                    {
                        items.map((item) => {
                            return(
                                <Grid item xs={4} key={item.Name}>
                                    <CardMedia
                                        className="Media"
                                        image={item.Image}
                                        title={item.Name}
                                    >
                                        <Typography className="MediaCaption">
                                            {item.Name}
                                        </Typography>
                                    </CardMedia>
                                </Grid>
                            )
                        })
                    }
                        </Grid>
                    </Card>
                    {/* <FormLabel component="legend">Options</FormLabel>
                <FormControlLabel
                    control={
                        <Checkbox onChange={this.toggleAutoPlay} checked={this.state.autoPlay} value="autoplay"
                            color="primary" />
                    }
                    label="Auto-play"
                />
                <FormControlLabel
                    control={
                        <Checkbox onChange={this.toggleIndicators} checked={this.state.indicators} value="indicators"
                            color="primary" />
                    }
                    label="Indicators"
                />
                <FormControlLabel
                    control={
                        <Checkbox onChange={this.toggleNavButtonsAlwaysVisible} checked={this.state.navButtonsAlwaysVisible} value="NavButtonsAlwaysVisible" color="primary" />
                    }
                    label="NavButtonsAlwaysVisible"
                />

                <FormControlLabel
                    control={
                        <Checkbox onChange={this.toggleNavButtonsAlwaysInvisible} checked={this.state.navButtonsAlwaysInvisible} value="NavButtonsAlwaysInvisible" color="primary" />
                    }
                    label="NavButtonsAlwaysInvisible"
                />
                <FormControlLabel
                    control={
                        <Checkbox onChange={this.toggleCycleNavigation} checked={this.state.cycleNavigation} value="CycleNavigation" color="primary" />
                    }
                    label="CycleNavigation"
                />

                <FormControlLabel
                    control={
                        <RadioGroup name="animation" value={this.state.animation} onChange={this.changeAnimation} row
                            style={{ marginLeft: "10px" }}>
                            <FormControlLabel value="fade" control={<Radio color="primary" />} label="Fade" />
                            <FormControlLabel value="slide" control={<Radio color="primary" />} label="Slide" />
                        </RadioGroup>
                    }
                />

                <FormControlLabel
                    control={
                        <div style={{ width: 300 }}>
                            <Typography id="discrete-slider" gutterBottom>
                                Animation Duration (Timeout) in ms
                            </Typography>
                            <Slider
                                defaultValue={500}
                                getAriaValueText={() => `${this.state.timeout}ms`}
                                aria-labelledby="discrete-slider"
                                valueLabelDisplay="auto"
                                step={100}
                                marks
                                min={100}
                                max={2000}
                                onChange={this.changeTimeout}
                            />
                        </div>
                    }
                /> */}
                </Carousel>


                

        )
    }
}

export default BannerExample;

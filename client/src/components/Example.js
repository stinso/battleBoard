import Carousel from "./Carousel/Carousel"

import { 
    Card,
    CardMedia,
    Typography,
    makeStyles
 } from '@material-ui/core';

const items = [
    {
        Name: "APEX",
        Image: "/static/images/apex.jpg"
    },
    {
        Name: "FIFA21",
        Image: "/static/images/fifa21.jpg"
    },
    {
        Name: "MADDEN21",
        Image: "/static/images/madden.jpg"
    },
    {
        Name: "APEX1",
        Image: "/static/images/apex.jpg"
    },
    {
        Name: "FIFA211",
        Image: "/static/images/fifa21.jpg"
    },
    {
        Name: "MADDEN211",
        Image: "/static/images/madden.jpg"
    }
]

const useStyles = makeStyles((theme) => ({
    card: {
      width: '100%',
      height: 320,
      backgroundColor: '#00008B',
      color: '#fff',
      margin: '0 15px'
    },
    image: {
      height: 320,
      backgroundColor: theme.palette.background.dark
    },
    title: {
      position: 'relative',
      '&:before': {
        position: 'absolute',
        bottom: -2,
        left: -16,
        content: '" "',
        height: 62,
        width: 6,
        backgroundColor: theme.palette.secondary.main,
        marginRight: '20px'
      }
    },
    media: {
      height: '100%'
    },
    mediaCaption: {
      position: 'absolute',
      bottom: 0,
  
      paddingLeft: '15px',
      paddingBottom: '10px',
      paddingTop: '10px',
  
      backgroundColor: 'black',
      color: 'white',
      opacity: 0.8,
  
      width: '100%',
      height: '30%'    
    },
    banner: {
        height: 320
    }
  }));

const Banner = () => {
    const classes = useStyles();

    return (
        <Card raised className={classes.banner}>
            <Carousel
                className={classes.banner}
                show={3}
                infiniteLoop
            >
                {
                items.map((item) => {
                    return(
                        <CardMedia
                            image={item.Image}
                            title={item.Name}
                        >
                            <Typography>
                                {item.Name}
                            </Typography>
                        </CardMedia>
                    )
                })
                }
            </Carousel>
        </Card>
    )
} 

export default Banner

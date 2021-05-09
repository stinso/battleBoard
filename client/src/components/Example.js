import Carousel from "./Carousel/Carousel"

import { 
    Card,
    CardMedia,
    Link,
    Typography,
    makeStyles
 } from '@material-ui/core';
 import { SuperCryptoKartLink } from '../config/constants';

const items = [
    {
        Name: "Call of Duty",
        Image: "/static/images/cod-warzone-sm.jpg",
        link: '/actionGamePage/cod',
        openInNewTab: false
    },
    {
        Name: "Fifa",
        Image: "/static/images/fifa21.jpg",
        link: '/actionGamePage/fifa',
        openInNewTab: false
    },
    {
        Name: "Madden NFL 21",
        Image: "/static/images/madden.jpg",
        link: '/actionGamePage/madden2021',
        openInNewTab: false
    },
    {
        Name: "Super Crypto Kart",
        Image: "/static/images/sck.jpg",
        link: SuperCryptoKartLink,
        openInNewTab: true
    }
]

const useStyles = makeStyles((theme) => ({
    card: {
      width: '100%',
      height: 320
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
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
        transition: '300ms',
        cursor: 'pointer',
        '&:hover':
        {
            filter: 'brightness(115%)'
        }
    },
    mediaCaption: {
        textOverflow: 'ellipsis',

        position: 'absolute',
        bottom: 0,

        paddingLeft: '15px',
        paddingBottom: '10px',
        paddingTop: '10px',

        backgroundColor: 'black',
        color: 'white',
        opacity: 0.4,

        width: '100%',
        height: '15%',

        transition: '300ms',
        cursor: 'pointer',
        '&:hover': {
          opacity: 0.8
        }
    },
    banner: {
        height: 320
    }
  }));

const Banner = () => {
    const classes = useStyles();

    return (
        <Card raised className={classes.card}>
            <Carousel
                className={classes.banner}
                show={3}
                infiniteLoop
            >
                {
                items.map((item) => {
                    return(
                        <Link
                            href={item.link}
                        >
                            <CardMedia
                                className={classes.media}
                                image={item.Image}
                                title={item.Name}
                            >
                                <Typography className={classes.mediaCaption}>
                                    {item.Name}
                                </Typography>
                            </CardMedia>
                        </Link>
                    )
                })
                }
            </Carousel>
        </Card>
    )
} 

export default Banner

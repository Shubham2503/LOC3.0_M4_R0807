import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, Button, Badge, Col, Row, Container } from 'react-bootstrap'
import styles from './index.module.css'
import { Link } from "react-router-dom"
import Cookies from "js-cookie"
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid'
import Chip from '@material-ui/core/Chip'



const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        height: 570
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    header: {
        height: 100
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    footer: {
        position: 'absolute',
        bottom: 0
    }
}));


const Home = () => {
    const [data, setData] = useState(null)
    const [count, setCount] = useState(10)

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    useEffect(() => {
        getData()
    }, [count])

    const updateCount = () => {
        const new_count = count + 1
        setCount(new_count)
        console.log(count)
    }

    const getData = async () => {
        await axios.get('/post/getAllPost')
            .then(res => {
                setData(res.data)
            }).catch(err => {
                console.log(err)
            })
    }

    console.log(data)
    const handleClick = async (id) => {
        await axios.post('/post/increaselike/' + id)
            .then(res => {
                getData()
            }).catch(err => {
                console.log(err)
            })
    }

    const handleFriendClick = async () => {
        await axios.get(`/post/getFriendsPost/${Cookies.get('id')}`)
            .then(res => {
                setData(res.data)
            }).catch(err => {
                console.log(err)
            })
    }
    if (data === null)
        return null
    return (
        <div className={styles.container}>
            {/* <Container md={3} className={styles.container}>
            <Button variant="primary" className={styles.button} onClick={handleFriendClick}>
                View Friend's posts
            </Button>
            <Row>
            {data.map((val, ind) => {
                    return(
                        <Col>
                            <Card style={{ minWidth: '20rem', maxWidth: '100%', marginBottom: 10 }}>
                            <Card.Img height={220} width={100} variant="top" src={val.images} />
                            <Card.Body>
                                <Card.Title>{val.title}</Card.Title>
                                {(val.tags.length > 0) && (
                                    <>
                                        <Badge pill variant="primary">
                                            <Link className={styles.navLink} to={"/post/" + val.tags[0].tag} onClick={updateCount}>{val.tags[0].tag}</Link>
                                        </Badge>{' '}
                                        <Badge pill variant="success">
                                            <Link className={styles.navLink} to={"/post/" + val.tags[1].tag} onClick={updateCount}>{val.tags[1].tag}</Link>
                                        </Badge>
                                        <br/>
                                    </>
                                )}
                                <Card.Text>{val.description}</Card.Text>
                                <Button variant="primary" onClick={(e) => {
                                    handleClick(val._id)
                                    updateCount()
                                }}>{val.likes} Likes</Button>
                                
                            </Card.Body>
                            </Card>
                        </Col>
                    )
                })
            }
            </Row>                 
            </Container> */}
            <Button variant="primary" className={styles.button} onClick={handleFriendClick}>
                View Friend's posts
            </Button>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="end"
                spacing={6}
            >
                {data.map((val, ind) => {
                    return (
                        <>
                            <Grid item xl={4}>
                                <Card className={classes.root}>
                                    <CardHeader
                                        avatar={
                                            <Avatar aria-label="recipe" className={classes.avatar} style={{ backgroundColor: '#' + Math.floor(Math.random() * 16777215).toString(16) }}>
                                                {val.title.slice(0, 1)}
                                            </Avatar>
                                        }
                                        className={classes.header}
                                        title={val.title}
                                        subheader={val.createdAt.slice(0, 10)}
                                    />
                                    <CardMedia
                                        className={classes.media}
                                        image={val.images}
                                    />
                                    <div className={styles.badge}>
                                        {(val.tags.length > 0) && (
                                            <>
                                                <Badge pill variant="primary">
                                                    <Link className={styles.navLink} to={"/post/" + val.tags[0].tag} onClick={updateCount}>{val.tags[0].tag}</Link>
                                                </Badge>{' '}
                                                <Badge pill variant="success">
                                                    <Link className={styles.navLink} to={"/post/" + val.tags[1].tag} onClick={updateCount}>{val.tags[1].tag}</Link>
                                                </Badge>
                                                <br />
                                            </>
                                        )}
                                    </div>
                                    <CardContent>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {val.description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions disableSpacing className={classes.footer}>
                                        <IconButton aria-label="add to favorites" onClick={(e) => {
                                            handleClick(val._id)
                                            updateCount()
                                        }}>
                                            <FavoriteIcon />
                                        </IconButton>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {val.likes}
                                        </Typography>
                                    </CardActions>
                                </Card>
                            </Grid>
                        </>
                    )
                }
                )}
            </Grid>
        </div>
    )
}

export default Home
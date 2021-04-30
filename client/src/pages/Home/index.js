import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Badge, Col, Row, Container } from "react-bootstrap";
import styles from "./index.module.css";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { makeStyles } from "@material-ui/core/styles";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Grid from "@material-ui/core/Grid";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 900,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  header: {
    height: 100,
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  footer: {
    bottom: 0,
  },
}));

const Home = () => {
  const [data, setData] = useState(null);
  const [count, setCount] = useState(10);
  const [liked, setLiked] = useState([]);
  const [colors, setColors] = useState([]);
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  useEffect(() => {
    getData();
  }, [count]);

  const updateCount = () => {
    const new_count = count + 1;
    setCount(new_count);
  };

  const addFriend = async (fid) => {
    setOpen(true);
    await axios
      .post(`/friendById/${Cookies.get("id")}/${fid}`)
      .then((res) => {
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getData = async () => {
    //get friends
    let friends = [];
    await axios
      .get(`/post/getFriends/${Cookies.get("id")}`)
      .then((res) => {
        friends = res.data;
      })
      .catch((err) => {
        console.log(err);
      });

    await axios
      .get("/post/getAllPost")
      .then((res) => {
        //set friends
        let newData = res.data;
        newData.forEach((el) => {
          el.isFriend = friends.includes(el.user);
        });

        setData(newData);
        if (liked.length === 0) {
          let temp = [];
          let temp_colors = [];
          for (let i = 0; i < res.data.length; i++) {
            temp[i] = false;
            temp_colors[i] =
              "#" + Math.floor(Math.random() * 16777215).toString(16);
          }
          setLiked(temp);
          setColors(temp_colors);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClick = async (id) => {
    await axios
      .post("/post/increaselike/" + id)
      .then((res) => {
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFriendClick = async () => {
    await axios
      .get(`/post/getFriendsPost/${Cookies.get("id")}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <div className={styles.container}>
        <Button
          variant="primary"
          className={styles.button}
          onClick={handleFriendClick}
        >
          View Friend's posts
        </Button>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="end"
          spacing={6}
        >
          {data ? (
            data.map((val, ind) => {
              return (
                <>
                  <Grid item xl={4}>
                    <Card className={classes.root}>
                      <CardHeader
                        avatar={
                          <Avatar
                            aria-label="recipe"
                            className={classes.avatar}
                            style={{
                              backgroundColor: colors[ind],
                            }}
                          >
                            {val.title.slice(0, 1)}
                          </Avatar>
                        }
                        className={classes.header}
                        title={val.title}
                        subheader={val.createdAt.slice(0, 10)}
                      />
                      <CardMedia className={classes.media} image={val.images} />
                      <div className={styles.badge}>
                        {val.tags.length > 0 && (
                          <>
                            <Badge pill variant="primary">
                              <Link
                                className={styles.navLink}
                                to={"/post/" + val.tags[0].tag}
                                onClick={updateCount}
                              >
                                {val.tags[0].tag}
                              </Link>
                            </Badge>{" "}
                            <Badge pill variant="success">
                              <Link
                                className={styles.navLink}
                                to={"/post/" + val.tags[1].tag}
                                onClick={updateCount}
                              >
                                {val.tags[1].tag}
                              </Link>
                            </Badge>
                            <br />
                          </>
                        )}
                      </div>
                      <CardContent>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {val.description}
                        </Typography>
                      </CardContent>
                      <CardActions disableSpacing className={classes.footer}>
                        <IconButton
                          aria-label="add to favorites"
                          style={liked[ind] ? { color: "red" } : {}}
                          onClick={(e) => {
                            handleClick(val._id);
                            updateCount();
                            let temp = liked;
                            temp[ind] = !liked[ind];
                            setLiked(temp);
                          }}
                        >
                          <FavoriteIcon />
                        </IconButton>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {val.likes}
                        </Typography>
                        {!val.isFriend && (
                          <IconButton
                            aria-label="Add Friend"
                            onClick={() => {
                              addFriend(val.user);
                            }}
                          >
                            <PersonAddIcon />
                          </IconButton>
                        )}
                      </CardActions>
                    </Card>
                  </Grid>
                </>
              );
            })
          ) : (
            <div style={{ marginTop: "2rem" }}>
              <Skeleton variant="text" />
              <Skeleton variant="circle" width={70} height={70} />
              <Skeleton variant="rect" width={900} height={1000} />
            </div>
          )}
        </Grid>
      </div>

      {/* snackbar */}
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message="Friend Added"
          action={
            <React.Fragment>
              <Button color="secondary" onClick={handleClose}>
                UNDO
              </Button>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      </div>
    </>
  );
};

export default Home;

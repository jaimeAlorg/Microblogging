import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";

import useStyles from "./Styles";
import { createPost, updatePost } from "../../actions/Posts.js";

const Form = ({ currentId, setCurrentId }) => {
  const dispatch = useDispatch();

  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    selectedFile: "",
  });

  const post = useSelector((state) =>
    currentId ? state.posts.find((message) => message._id === currentId) : null
  );
  const classes = useStyles();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = (e) => {
    //Prevents reload in the browser
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost(postData));
      clear();
    } else {
      dispatch(updatePost(currentId, postData));
      clear();
    }
  };

  const clear = () => {
    setCurrentId(0);
    setPostData({
      creator: "",
      title: "",
      message: "",
      selectedFile: "",
    });
  };

  return (
    <Paper className={classes.paper} elevation={3}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
        fullWidth
      >
        <Typography variant="h6" className={classes.formName}>
          {currentId ? `Editing "${post.title}"` : "Create Post"}
        </Typography>
        <TextField
          id="standard-basic"
          name="creator"
          label="Creator"
          inputProps={{ maxlength: 30 }}
          fullWidth
          value={postData.creator}
          //...postData, all data is going to persist while only changig creator
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        />
        <TextField
          id="standard-basic"
          name="title"
          label="Title"
          inputProps={{ maxlength: 50 }}
          fullWidth
          value={postData.title}
          //...postData, all data is going to persist while only changig creator
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          id="standard-basic"
          name="message"
          label="Message"
          inputProps={{ maxlength: 280 }}
          fullWidth
          value={postData.message}
          //...postData, all data is going to persist while only changig creator
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;

import React, { useState, useEffect } from "react";
import { Container, Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";

import { getPosts } from "./actions/Posts";
import Posts from "./components/posts/Posts";
import Form from "./components/form/Form";
import PrimarySearchAppBar from "./Styles";
import { useStyles } from "./Styles";

function App() {
  const classes = useStyles();

  //Hook useState of id
  const [currentId, setCurrentId] = useState(0);
  
  //Hook useDispatch for easier use of react-redux
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, setCurrentId]);

  return (
    <Container maxWidth="xl" disableGutters="true">
      <PrimarySearchAppBar />
      <Container className={classes.bodyContainer}>
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
          
        >
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Container>
  );

  /*
  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">Microblogging</Typography>
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId}/>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId}/>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
  */
}
export default App;

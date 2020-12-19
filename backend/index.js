import express from "express";
import bodyParser from "body-parser";
import mongoose from 'mongoose';
import cors from "cors";
import postRoutes from "./routes/post.js"

//Initialize express
const app = express();

//bodyParser = middleware = functions called between processing the request and sending the response
//urlencoded and bodyParser = NEEDED FOR POST REQUEST = SENDING DATA
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

//middleware 
app.use(cors());

//Every route inside the postRoutes is going to be localhost:8080/posts
app.use('/posts', postRoutes);

//Connect URL to the database
const CONNECTION_URL =
  "mongodb+srv://jaimeAlorg:AiYjbvYW8CpTSZqc@microblogging.8niwn.mongodb.net/Microblogging-db?retryWrites=true&w=majority";
const PORT = process.env.PORT || 8080;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);
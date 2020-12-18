import express from "express";
import { getPost, createPost, updatePost, deletePost } from "../controllers/post.js"

const router = express.Router();

//All the logic/functions of the routes are in controller
router.get('/', getPost);
router.post('/', createPost);

//Dynamic Upadate
router.patch('/:id', updatePost);

router.delete('/:id', deletePost);

export default router;
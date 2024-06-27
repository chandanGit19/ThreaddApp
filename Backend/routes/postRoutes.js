import express from "express";

const router = express.Router();

import { createPost,getPost ,deletePost,likeUnlinkePost,replyToPost,getFeedPosts,getUserPosts,deletcoment} from "../controller/postController.js";
import { protectRoute } from "../middelWare/protectRoute.js";

router.post("/create",protectRoute,createPost)
router.post("/delete/comment/:cid",protectRoute,deletcoment)
router.get("/:id",getPost)
router.get("/user/:username",getUserPosts)
router.delete("/:id",protectRoute,deletePost)
router.post("/like/:id",protectRoute,likeUnlinkePost)
router.post("/reply/:id",protectRoute,replyToPost)
router.get("/All/feed",protectRoute,getFeedPosts)





export default router;
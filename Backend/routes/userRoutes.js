import express from 'express';

const router =express.Router();

import { signupUser ,loginUser,logoutUser,followUnfollow,updateUsers , getUserProfile} from '../controller/userController.js';
import { protectRoute } from '../middelWare/protectRoute.js';


router.get("/profile/:username",getUserProfile)
router.post("/signup",signupUser);
router.post("/login",loginUser);
router.post("/logout",logoutUser);
router.post("/follow/:id",protectRoute,followUnfollow);
router.put("/update/:id",protectRoute,updateUsers);


export default router;
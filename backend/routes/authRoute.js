import express from "express";
import { getUser, loginUser, registerUser } from "../controllers/authController.js";
import protect from "../middelware/authMiddelware.js";
import admin from "../middelware/admimMiddelware.js";


const authRoute = express.Router()

authRoute.post('/register', registerUser)

authRoute.post('/login', loginUser)

authRoute.get('/users', protect ,admin, getUser)


export default authRoute
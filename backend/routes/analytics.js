import e from "express";
import protect from "../middelware/authMiddelware.js";
import admin from "../middelware/admimMiddelware.js";
import getAdminStats from "../controllers/analytics.controller.js";

const analyticsRoute = e.Router()

analyticsRoute.get('/', protect, admin, getAdminStats)

export default  analyticsRoute
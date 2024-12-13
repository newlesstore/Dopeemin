import express from 'express';
import { getAllData } from '../controllers/AllData.controller.js';


const router = express.Router()

router.get("/all", getAllData)

export default router
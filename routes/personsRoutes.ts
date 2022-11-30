import express from "express";
const router = express.Router();

import { createPerson, getPersons } from "../controllers/PersonsController.js";

router.route("/").post(createPerson).get(getPersons);

export default router;

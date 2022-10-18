import express from "express";
import { createUser } from "../controllers/user";

const router = express.Router();

router.post("/user-create", createUser);

export default router;
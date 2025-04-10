import express, { Router } from "express";

import { getOptimal } from "../controller/optimal"; // Ensure the path is correct!
import { getfifo } from "../controller/fifo";
import { getlru } from "../controller/lru_controller";
const router: Router = Router();

router.post("/lru", getlru);
router.post("/opt", getOptimal); // Check if getOptimal is properly exported
router.post("/fifo", getfifo);

export default router;

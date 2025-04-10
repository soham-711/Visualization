"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const optimal_1 = require("../controller/optimal"); // Ensure the path is correct!
const fifo_1 = require("../controller/fifo");
const lru_controller_1 = require("../controller/lru_controller");
const router = (0, express_1.Router)();
router.post("/lru", lru_controller_1.getlru);
router.post("/opt", optimal_1.getOptimal); // Check if getOptimal is properly exported
router.post("/fifo", fifo_1.getfifo);
exports.default = router;

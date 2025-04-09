
import express,{Router} from "express"
import { getlru } from "../controller/lru_controller";
import { getOptimal } from "../controller/optimal";
import { getfifo } from "../controller/fifo";
const router:Router=Router();
router.get("/lru",getlru);
router.get("/opt",getOptimal)
router.get("/fifo",getfifo)
export default router;

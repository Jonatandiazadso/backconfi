import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { getMenor,getMenores,createMenor,deleteMenor, updateMenor,loginMenor } from "../controllers/menor.controller.js";

const router = Router()

router.get('/menor', authRequired, getMenores );
router.get('/menor/:id', authRequired, getMenor);
router.post('/menor', authRequired, createMenor );
router.delete('/menor/:id', authRequired, deleteMenor );
router.put('/menor/:id', authRequired, updateMenor);
router.post('/menorlogin', loginMenor );
export default router
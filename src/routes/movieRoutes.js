import express from 'express';

const router = express.Router();

router.get("/hello",(req,res)=>{
    res.json({message:"welcome in the world of movies "});
});

export default router;
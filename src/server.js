import express from 'express';

const app = express();



//importing all the routes
//http://localhost:5001/api/vi/movies

import movieRoutes from "./routes/movieRoutes.js";

app.use("/api/v1/movies", movieRoutes)

app.get("/hello",(req,res)=>{
    res.send("hello world");
})


const PORT = 5001;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})


import express, { request, response } from "express";
import { MongoClient } from 'mongodb';
import dotenv from "dotenv";
import { moviesRouter } from "./routes/movies.js";
 
dotenv.config();
console.log(process.env);


const app=express();
const PORT=9000;
app.use(express.json());

 const MONGO_URL=process.env.MONGO_URL;
   async function createConnection(){
        const client= new MongoClient(MONGO_URL );
  await client.connect();
  console.log("Mongodb Connected");
  return client;
    }

    export const client= await createConnection();
app.get("/",(request,response)=>{
    response.send("Hello,world");
});

app.use("/movies",moviesRouter)

app.listen(PORT,()=>console.log("App is started in",PORT));




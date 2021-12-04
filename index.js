import cors from "cors";
import express from "express";
import { MongoClient } from 'mongodb';
import dotenv from "dotenv";
import { moviesRouter } from "./routes/movies.js";
import bcrypt from'bcrypt';
import{usersRouter}from "./routes/users.js";
 
dotenv.config();
console.log(process.env);


const app=express();
const PORT=process.env.PORT;
app.use(cors());
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
    response.send("Hello,world😁");
});

app.use("/movies",moviesRouter);
app.use("/users",usersRouter);
// async function genPassword(password){
//     const NO_OF_ROUNDS=10;
//  const salt=await bcrypt.genSalt(NO_OF_ROUNDS);  
//  console.log(salt); 
//  const hashedPassword=await bcrypt.hash(password,salt);
//  console.log(hashedPassword);
//  return hashedPassword;
// }
// genPassword("password@123");
app.listen(PORT,()=>console.log("App is started in",PORT));




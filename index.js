// const { response } = require("express");
// const express=require("express");

import express, { request, response } from "express";
import { MongoClient } from 'mongodb'


const app=express();
const PORT=9000;
app.use(express.json());
// const movies=
 

const MONGO_URL="mongodb://localhost";
   async function createConnection(){
        const client= new MongoClient(MONGO_URL );
  await client.connect();
  console.log("Mongodb Connected");
  return client;
    }

    const client= await createConnection();
app.get("/",(request,response)=>{
    response.send("Hello,world");
});


app.get("/movies",async(request,response)=>{
    console.log(request.query);

    const filter=request.query;
    console.log(filter);
    if (filter.rating){
        filter.rating=parseInt(filter.rating);
    }
    // console.log(language,rating);
    // let filteredMovies=movies;
    // if(language){
    //  filteredMovies=filteredMovies.filter((mv)=>mv.language == language);
    
    // }
    // if (rating){
    //     filteredMovies=filteredMovies.filter((mv)=>mv.rating == +rating);
    // }
    const filteredMovies=await client.db("b28wd").collection("movies").find(filter).toArray()
    // console.log(filteredMovies);
        response.send( filteredMovies);
   
});
app.post("/movies",async(request,response)=>{
    const data=request.body;
    // console.log(data);
    const result=await client
    .db("b28wd")
    .collection("movies")
    .insertMany(data);
    response.send(result);
});

app.get("/movies/:id",async(request,response)=>{
    console.log(request.params);
    const {id}=request.params;
    const movie= await client
    .db("b28wd")
    .collection("movies")
    .findOne({id:id});
    // const movie=movies.find((mv)=>mv.id==id);
    console.log(movie);
    movie
    ? response.send(movie)
   : response.status(404).send({message:"No matching id with movies found"});
});
app.listen(PORT,()=>console.log("App is started in",PORT));


import express, { request, response } from "express";
import { MongoClient } from 'mongodb';
import dotenv from "dotenv";
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

    const client= await createConnection();
app.get("/",(request,response)=>{
    response.send("Hello,world");
});


app.get("/movies",async(request,response)=>{
    console.log(request.query);

    const filter=request.query;
    console.log(filter);
    if (filter.rating){
        filter.rating=+filter.rating;
    }
    
    const filteredMovies=await getMovies(filter)
   
        response.send( filteredMovies);
   
});
app.post("/movies",async(request,response)=>{
    const data=request.body;
  
    const result=await createMovies(data);


    response.send(result);
});

app.get("/movies/:id",async(request,response)=>{
    console.log(request.params);
    const {id}=request.params;
    
     const movie=await getMovieById(id);
    console.log(movie);
    movie
    ? response.send(movie)
   : response.status(404).send({message:"No matching id with movies found"});

});
app.delete("/movies/:id",async(request,response)=>{
    console.log(request.params);
    const {id}=request.params;
    const result= await deleteMovieById(id);
    
    result.deletedCount>0
    ? response.send(result)
   : response.status(404).send({message:"No matching id with movies found"});

});
app.put("/movies/:id",async(request,response)=>{
    console.log(request.params);
    const {id}=request.params;
    const data=request.body;
    const result= await updateMovieById(id, data);
    
    const movie=await getMovieById(id);
      
   
    response.send(movie);


});

app.listen(PORT,()=>console.log("App is started in",PORT));



async function updateMovieById(id, data) {
    return await client
        .db("b28wd")
        .collection("movies")
        .updateOne({ id: id }, { $set: data });
}

async function createMovies(data) {
    return await client
        .db("b28wd")
        .collection("movies")
        .insertMany(data);
}

async function getMovies(filter) {
    return await client
        .db("b28wd")
        .collection("movies")
        .find(filter)
        .toArray();
}

async function deleteMovieById(id) {
    return await client
        .db("b28wd")
        .collection("movies")
        .deleteOne({ id: id });
}

async function getMovieById(id) {
    return await client
        .db("b28wd")
        .collection("movies")
        .findOne({ id: id });
}
 
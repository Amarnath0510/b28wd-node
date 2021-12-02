 import express from "express";
import { getMovies, createMovies, getMovieById, deleteMovieById, updateMovieById } from "../helper.js";
 const router=express.Router();
router.get("/",async(request,response)=>{
    console.log(request.query);

    const filter=request.query;
    console.log(filter);
    if (filter.rating){
        filter.rating=+filter.rating;
    }
    
    const filteredMovies=await getMovies(filter)
   
        response.send( filteredMovies);
   
});
router.post("/",async(request,response)=>{
    const data=request.body;
  
    const result=await createMovies(data);


    response.send(result);
});

router.get("/:id",async(request,response)=>{
    console.log(request.params);
    const {id}=request.params;
    
     const movie=await getMovieById(id);
    console.log(movie);
    movie
    ? response.send(movie)
   : response.status(404).send({message:"No matching id with movies found"});

});
router.delete("/:id",async(request,response)=>{
    console.log(request.params);
    const {id}=request.params;
    const result= await deleteMovieById(id);
    
    result.deletedCount>0
    ? response.send(result)
   : response.status(404).send({message:"No matching id with movies found"});

});
router.put("/:id",async(request,response)=>{
    console.log(request.params);
    const {id}=request.params;
    const data=request.body;
    const result= await updateMovieById(id, data);
    
    const movie=await getMovieById(id);
      
   
    response.send(movie);


});
export const moviesRouter=router;
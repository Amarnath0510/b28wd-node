 import express from "express";
import { getMovies, createMovies, getMovieById, deleteMovieById, updateMovieById } from "../helper.js";
 const router=express.Router();


router
.route("/")
.get(async(request,response)=>{
    console.log(request.query);

    const filter=request.query;
    console.log(filter);
    if (filter.rating){
        filter.rating=+filter.rating;
    }
    
    const filteredMovies=await getMovies(filter)
   
        response.send( filteredMovies);
   
})

.post(async(request,response)=>{
    const data=request.body;
  
    const result=await createMovies(data);


    response.send(result);
});

router
.route("/:id")
.get(async(request,response)=>{
    console.log(request.params);
    const {id}=request.params;
    
     const movie=await getMovieById(id);
    console.log(movie);
    movie
    ? response.send(movie)
   : response.status(404).send({message:"No matching id with movies found"});

})
.delete(async(request,response)=>{
    console.log(request.params);
    const {id}=request.params;
    const result= await deleteMovieById(id);
    
    result.deletedCount>0
    ? response.send(result)
   : response.status(404).send({message:"No matching id with movies found"});

})
.put(async(request,response)=>{
    console.log(request.params);
    const {id}=request.params;
    const data=request.body;
    const result= await updateMovieById(id, data);
    
    const movie=await getMovieById(id);
      
   
    response.send(movie);


});
export const moviesRouter=router;
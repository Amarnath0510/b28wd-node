import express, { request, response } from "express";
import { createUser, genPassword,getUserByName } from "../helper.js";
 const router=express.Router();
 import bcrypt from "bcrypt";
router
.route("/signup")

.post(async(request,response)=>{
    const {username,password}=request.body;
    const userFromDB=await getUserByName(username);
  

console.log(userFromDB);
if(userFromDB){
    response.status(400).send({message:"Username already exists"});
    return;
}
if (password.length<8){
    response.status(400).send({message:"Password must be larger"})
    return;
}
const hashedPassword= await genPassword(password);
const result= await createUser({username,password:hashedPassword});
    response.send(result);
});
router.route("/login").post(async(request,response)=>{
    const {username,password}=request.body;
    const userFromDB=await getUserByName(username);
    if(!userFromDB){
        response.status(400).send({message:"Invalid credentials"});
        return;
    }
    const storedPassword=userFromDB.password;
    console.log(storedPassword);
    const isPasswordMatch=await bcrypt.compare(password,storedPassword);
    console.log(isPasswordMatch);
    if(isPasswordMatch){
        response.send({message:"Successful login"});
    }else{
        response.status(400).send({message:"Invalid credentials"});
    }
});
export const usersRouter=router;
import express from "express";
import { mongoDbURL, port } from "./config.js"; 
import mongoose from "mongoose";
import  {Book} from "./models/bookModel.js";
import booksRouter from "./booksRouter/booksRouter.js";
import cors from "cors";
const app=express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use('/books',booksRouter);

mongoose.connect(mongoDbURL)
.then(()=>{
  console.log("mongodb connected with online database");
  app.listen(port, () => {    
      console.log(`App is listening on port ${port}`); 
  });
})
.catch((err)=>{
  console.log(err)
})




import express from "express";
import { mongoDbURL, port } from "./config.js"; 
import mongoose from "mongoose";
import  {Book} from "./models/bookModel.js";
const app=express();
app.use(express.json()); 
app.use(express.urlencoded({extended:true}));
app.get("/",((req,res)=>{
    console.log(req.query);
    res.send("<h1>Hello this is first tag</h1>");

}))




app.post("/books", async (req, res) => {
  try {
    console.log("Received POST request"); // Log when request is received
    console.log("Request Body:", req.body); // Log request body

    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      console.log("Validation Failed: Missing Fields");
      return res.status(400).send("All fields are required.");
    }

    const book = await Book.create(req.body);
    return res.status(201).send(book);
  }
  
  catch (err) {
    console.error("Error:", err.message);
    res.status(500).send({ message: err.message });
  }
});
  

app.get("/books",async(req,res)=>{
 
  try{
  const books= await Book.find();
  res.status(200).send(
    {
    count: books.length,
    data:books
  }

  );
  
  }

  catch(error){
    console.log(error.message);
  }


})





app.get("/books/:id",async(req,res)=>{
 
  try{
    const {id}=req.params;
  const books= await Book.findById(id);
  res.status(200).send(
    {
    count: books.length,
    data:books
  }

  );
  
  }

  catch(error){
    console.log(error.message);
  }


})









app.get("/books/:id",async(req,res)=>{
 
  try{
    const {id}=req.params;
  const books= await Book.findById(id);
  res.status(200).send(
    {
    count: books.length,
    data:books
  }

  );
  
  }

  catch(error){
    console.log(error.message);
  }


})













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




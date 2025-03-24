import  {Book} from "../models/bookModel.js";
import express from "express";
import mongoose from "mongoose";

const router=express.Router();

router.post("/", async (req, res) => {
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
  



// To get all books

router.get("/",async(req,res)=>{
 
  try{
  const books= await Book.find();
  console.log(books);
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





// To get a specific book according by id

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //   return res.status(400).json({ message: "Invalid Book ID format" });
    // }

    const book = await Book.findById(id);
    console.log(book);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});






router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, publishYear } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Book ID format" });
    }

    // if (!title || !author || !publishYear) {
    //   console.error("Error:", error);
    //   return res.status(400).json({ message:"Invalid Input"});
    // }
    console.log("Request Body:", req.body);
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    console.log(updatedBook);
    if (!updatedBook) return res.status(404).json({ message: "Book not found" });

    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});








// To delete books
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Received DELETE request for ID:", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Book ID format" });
    }

    const deletedBook = await Book.findOneAndDelete({ _id: id });

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found or already deleted" });
    }

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

export default router;

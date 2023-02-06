const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)){
      users.push({"username":username,"password": password});
      return res.sendStatus(200).json({message: "User successfully registered. Please try logging in"});
    } else {
      return res.status(404).json({message:"User Already Exists"});
    }
  }
  return res.status(404).json({message:"Unable to register user"});
});

let allBooks = async (req,res) => {
    res.send(JSON.stringify(books,null,4))
    return res.status(404).json({message: "Can't find any Books"});
}

let bookNum =  async (req,res) => {
    const isbn = await req.params.isbn;
    res.send(books[isbn])
    return res.status(300).json({message: "Can't get ISBN"});
 }
// Get the book list available in the shop
public_users.get('/', [allBooks])

// Get book details based on ISBN
public_users.get('/isbn/:isbn',[bookNum])
  
// Get book details based on author
public_users.get('/author/:author', async function (req, res) {
  const author = await req.params.author;
  const y = Object.values(books);
  let filtered_authors = y.filter((d) => d.author === author);
  res.send(filtered_authors)
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title', async function (req, res) {
  const title = await req.params.title;
  const a = Object.values(books);
  let filtered_titles = a.filter((d) => d.title === title);
  res.send(filtered_titles)
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn', async function (req, res) {
  const isbn =  await req.params.isbn;
  res.send(books[isbn].reviews)
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;



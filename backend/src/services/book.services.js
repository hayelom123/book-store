const { Book } = require("../entity");

const createBook = async (body) => {
  return Book.create(body);
};

const updateBook = async (body) => {
  findByIdAndUpdate(body._id, body);
};

const deleteBook = async (id) => {
  return Book.findByIdAndDelete(id);
};

const getBook = async (id) => {
  return Book.findById(id);
};

const getAllBooks = async (body) => {
  let page = 0;
  let size = 20;
  if (body && body.size) {
    page = body["page"] * body["size"];
    size = body["size"];
  }
  return Book.find({}).skip(page).limit(size).sort({ createdAt: -1 });
};

module.exports = {
  createBook,
  updateBook,
  deleteBook,
  getBook,
  getAllBooks,
};

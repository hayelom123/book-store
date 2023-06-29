const path = require("path");
const catchAsync = require("../utils/catchAsync");
const deleteFile = require("../utils/delete.files");

const apiResponse = require("../helpers/apiResponse");
const { bookServices } = require("../services");

const createBook = catchAsync(async (req, res) => {
  const newbook = await bookServices.createBook(req.body);
  return apiResponse.successResponseWithData(
    res,
    "Book created successfully",
    newbook
  );
});

const updateBook = catchAsync(async (req, res) => {
  const updatedBook = await bookServices.updateBook(req.params.id);
  return apiResponse.successResponseWithData(
    res,
    "Book updated successfully",
    updatedBook
  );
});

const deleteBook = catchAsync(async (req, res) => {
  const book = await bookServices.deleteBook(req.params.id);
  if (book) {
    let dir = path.join(__dirname, "..", "public");
    dir = dir + book.coverImage;
    console.log(dir);
    deleteFile(dir);
  }

  return apiResponse.successResponse(res, "Book deleted successfully");
});

const getBook = catchAsync(async (req, res) => {
  const book = await bookServices.getBook(req.params.id);
  return apiResponse.successResponseWithData(res, "success", book);
});

const getAllBooks = catchAsync(async (req, res) => {
  const books = await bookServices.getAllBooks(req.query);
  return apiResponse.successResponseWithData(res, "sucess", books);
});

module.exports = {
  createBook,
  updateBook,
  deleteBook,
  getBook,
  getAllBooks,
};

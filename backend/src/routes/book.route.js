const express = require("express");
const validate = require("../middlewares/validate");
const upload = require("../middlewares/imageupload");
const { bookController } = require("../controllers");
const { bookValidations } = require("../validations");

const router = express.Router();

//create and get product post for creating and get for getting all books
router
  .route("/")
  .post(
    upload("images", "image/").single("coverImage"),
    async (req, res, next) => {
      if (req.file) {
        req.body["coverImage"] = "/images/" + req.file.filename;
      }
      next();
    },
    validate(bookValidations.createBook),
    bookController.createBook
  )
  .get(bookController.getAllBooks);
// for deleting and updating
router
  .route("/:id")
  .delete(validate(bookValidations.deleteBook), bookController.deleteBook)
  .put(validate(bookValidations.updateBook), bookController.updateBook)
  .get(validate(bookValidations.getBook), bookController.getBook);

module.exports = router;

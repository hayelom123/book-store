const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Book Title is required"],
    },
    description: {
      type: String,
      required: [true, "Book Description is required"],
    },
    discountRate: {
      type: Number,
      min: 1,
      max: 100,
    },
    coverImage: {
      type: String,
      required: [true, "Book Cover is required"],
    },
    price: {
      type: Number,
      required: [true, "Book Price is required"],
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
bookSchema.pre("validate", function (next, data) {
  this.bookId = this._id;

  next();
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;

const fs = require("fs");

const deleteFile = (path) => {
  try {
    fs.unlink(path, function (err) {
      if (err) return console.log(err);
      console.log("file deleted successfully");
    });

    //file removed
  } catch (err) {
    console.error(err);
  }
};

module.exports = deleteFile;

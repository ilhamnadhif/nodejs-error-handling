const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res, next) => {
  function sum(...numbers) {
    if (numbers < 1) {
      const err = new Error("harus lebih dari 1");
      err.errorStatus = 400;
      err.data = "error bos";
      throw err;
    }
    return "succes";
  }

  try {
    // console.log(sum());
    sum();
    res.end();
  } catch (error) {
    next(error);
  }
});

// 404 Handler
app.use(function (req, res, next) {
  res.status(404).json({
    status: "Fail",
    errors: "Error Found 404",
  });
});

// Internal Server Error handler
app.use((error, req, res, next) => {
  const status = error.errorStatus || 500;
  res.status(status).json({
    message: error.message,
    data: error.data,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

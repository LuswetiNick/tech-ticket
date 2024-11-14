const express = require("express");
const path = require("path");

const { logger } = require("./middlewares/logger");
const errorHandler = require("./middlewares/error-handler");

const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/cors-options");
const app = express();

const PORT = process.env.PORT || 8000;

// Log Events
app.use(logger);

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.use("/", express.static(path.join(__dirname, "/public")));

app.use("/", require("./routes/home"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 not found!" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});
// Error Handler
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

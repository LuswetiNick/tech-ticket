// Import required packages:
// - date-fns: for formatting dates
// - uuid: for generating unique IDs
// - path: for handling file paths
// - fs: for working with files
const { format } = require("date-fns");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;

// This function creates log entries and saves them to a file
// It takes two parameters:
// - message: what we want to log
// - logFileName: where to save the log
const logEvents = async (message, logFileName) => {
  // Create a timestamp in format: "25-Dec-2023 | 2:30 pm"
  const dateTime = `${format(new Date(), "dd-MMM-yyyy | h:mm a")}`;
  // Combine timestamp, a unique ID, and the message into one log entry
  const log = `${dateTime}\t${uuidv4()}\t${message}\n`;
  try {
    // If the logs folder doesn't exist, create it
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    // Add the new log entry to the log file
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logFileName),
      log
    );
  } catch (err) {
    console.log(err);
  }
};

// This is middleware that runs on every request to our server
// It logs information about each request:
// - What type of request (GET, POST, etc)
// - What URL was requested
// - Where the request came from
const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.url}\t ${req.headers.origin}`, "reqLog.log");
  // Also show a simpler log in the console
  console.log(`${req.method}\t ${req.path}`);
  // Continue to the next middleware or route handler
  next();
};

// Make these functions available to other parts of our application
module.exports = { logEvents, logger };

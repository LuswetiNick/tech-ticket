const allowedOrigins = require("./allowed-origins");

const corsOptions = {
  // origin determines which domains can access the API
  origin: (origin, callback) => {
    // Check if origin is in allowedOrigins array or if there's no origin (like local requests)
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      // Allow the request by calling callback with null (no error) and true
      callback(null, true);
    } else {
      // Block the request by calling callback with an error
      callback(new Error("Not allowed by CORS"));
    }
  },
  // credentials: true allows cookies and authentication headers
  credentials: true,
  // status code for legacy browsers
  optionsSuccessStatus: 200,
};

const express = require("express");

const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

// Configure body parsing for AJAX requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add routes, both API and view
app.use(routes);

// Connect to the MongoDB
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://testuser:password1@ds161001.mlab.com:61001/heroku_386sb5pg",
    {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true 
    },
    console.log("Connected to MongoDB!")
);

// Start the API server
app.listen(PORT, () =>
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
);
//OPEN 2 TERMINAL TABS one for server(BE) one for client(FE) :))

// nodemon is just for convenience sake so that we dont have to keep starting
// express is the framework we use to build our APIs
const express = require("express");
// app variable represents all the express stuff from the library
const app = express();

// library to make DB queries and actions
const mongoose = require("mongoose");
const UserModel = require("./models/Users");

// this allows us to connect our APIs with the react FE without giving any errors
const cors = require("cors");

// so that no need manually convert JSON to JS object
app.use(express.json());
app.use(cors());

// mongoose.connect(
//   "mongodb+srv://RJuser:Password1!@cluster0.zhojy.mongodb.net/FirstMERNapp"
// );

mongoose.connect(
  "mongodb+srv://RJuser:Password1@cluster0.zhojy.mongodb.net/FirstMERNapp?retryWrites=true&w=majority"
);

// app.get()
// app.post() HTTP requests if needed
// /getUsers route, callback function that takes in request and response
// return the list of all the users present in the table
app.get("/getUsers", (req, res) => {
  // return back a list of all the users
  // empty object returns all the data in the collection
  UserModel.find({}, (err, result) => {
    // callback function error and result from the database
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/createUser", async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  await newUser.save();

  res.json(user);
});

// port 3001 because react runs on port 3000, call the callback function when the app is started
app.listen(3001, () => {
  console.log("server runs perfectly");
});

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/tweets");

dotenv.config();

/*mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);*/
//mongoose.connect('mongodb+srv://chqirsamia:samia24799@cluster0.fnn2o.mongodb.net/albc_twitter?retryWrites=true&w=majority');
//mongoose.connect('mongodb://chqirsamia:samia24799@cluster0.fnn2o.mongodb.net/albc_twitter?retryWrites=true&w=majority');
const uri = 'mongodb+srv://chqirsamia:samia24799@cluster0.fnn2o.mongodb.net/' +
'albc_twitter?retryWrites=true&w=majority';
// Prints "MongoServerError: bad auth Authentication failed."
mongoose.connect(uri, {
  serverSelectionTimeoutMS: 5000
}).catch(err => console.log(err.reason));
//middleware
app.get("/",(req,res)=>{
    res.send("welcome to home page");
})
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

app.listen(8800, () => {
  console.log("Backend server is running!");
});
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')




const app = express()
const port = 3000


app.use(bodyParser.json())

// connect to mongodb with 27017 port in localhost 
mongoose.connect('mongodb://localhost:27017/users').then(()=>console.log("connectd to MongoDB"))
.catch(err=>console.error("MongoDB connection error: ", err));

// define userschema 
const UserSchema = new mongoose.Schema({
  name: String,
  email: String
})





// define model user to use User schema blueprint

const User = mongoose.model('User', UserSchema)

app.post('/users', async(req, res)=>{
  const {name, email} = req.body;

  try {
    const user = new User({name, email});
    await user.save();
    res.status(201).json(user);
    console.log("Success ")
  } catch (error) {
    console.error("Error saving: ", err)
    res.status(500).json({error: "Internal Servel Error"})
  }
})

//get api

app.get('/users',async (req,res) => {
  const users = await User.find();
  res.json(users);
})




app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

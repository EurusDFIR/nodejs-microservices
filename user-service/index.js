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

//define taskSchema

const taskSchema = new mongoose.Schema({
  title: String,
  description: String
})

//define model task to user task schema blueprint
const Task = mongoose.model('Task',taskSchema)
app.post('/tasks',async (req,res) => {
 const {title, description} = req.body;

 try{
  const title = new Task({title, description});
  await task.save();
  res.status(201).json(task); // success to create task with status 201

 }catch(error){
  console.error("Error Saving: ", err)
  res.status(500).json({error: "Internal Server Error"})
 }
})

// define model user to use User schema blueprint

const User = mongoose.model('User', UserSchema)

app.post('/users', async(req, res)=>{
  const {name, email} = req.body;

  try {
    const user = new User({name, email});
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error("Error saving: ", err)
    res.status(500).json({error: "Internal Servel Error"})
  }
})


//define products Schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number
})

const Product = mongoose.model('Product', productSchema)
app.post('/products', async(req,res)=>{
  const {name, price} = req.body;
  try{
    const product = new Product({name, price});
      await product.save()
      res.status(201).json(product);

    }
  
  catch{
    console.error("Error: saving", Error);
    res.status(500).json({error: "Internal Server Error"})
  }

})



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

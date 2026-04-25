const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://karchana2603_db_user:oTepbi3XUhrG6Vba@cluster0.dc3lnu1.mongodb.net/?appName=Cluster0')
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


const productRoutes = require('./routes/productRoutes');
app.use('/api', productRoutes);

app.get('/', (req, res) => {
  res.send("API is running...");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

const jwt = require('jsonwebtoken');

app.get('/login', (req, res) => {
  const token = jwt.sign({ user: "admin" }, "secretkey");
  res.json({ token });
});
const express = require('express');
const path = require('path');
const db = require('./config/connections');
const User = require("./models/User")

const app = express();
const PORT = process.env.PORT || 3001;

// add express middleward
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


app.get('/test', async (req, res) => {
    const data = await User.findOneAndUpdate({ username: "bo123" }).populate('totalScore');
    console.log("user test data:", data);
    res.json(data);
//    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.get('/test2', async (req, res) => {
    const data = await User.findOneAndDelete({username:"bo123"})
    console.log("user test data:", data);
    res.json(data);
//    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
  

// Create a new instance server
const startServer = async () => {

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    })
  })
};
  
// Call the async function to start the server
startServer();


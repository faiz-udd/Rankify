const express = require('express');
const cors = require('cors');
const sequelize = require('./db/sequelize');
// const sequelize = require('./db/aivenDb');
const app = express();
const expressListRoutes = require('express-list-routes');
const port = process.env.PORT || 3000

const { teacherRouter, userRouter, ratingRouter, facultyRouter, 
        departmentRouter, subjectRouter, reviewRouter } = require('./routes/index');
app.use(cors());
app.use(express.json());

// import utility functions
const listRoutes = require('./utils/sendRoutes');

app.get('/',(req,res) => {
    res.json({message: "development started"});
})

// get list of all routes that are available in the application
app.get('/routes', (req, res) => {
  const routes = listRoutes(app);
  res.send(routes);
});


// Middleware to log the request endpoint
app.use((req, res, next) => {
  if (!req.url.startsWith('/socket.io/')) {
    console.log(`Request to: ${req.method} ${req.url}`);
  }
  next();
});

// routes 
app.use('/',teacherRouter);
app.use('/',userRouter);
app.use('/',ratingRouter);
app.use('/',facultyRouter);
app.use('/',departmentRouter);
app.use('/',subjectRouter);
app.use('/',reviewRouter)

// will log out all the available routes
expressListRoutes(app);


sequelize.sync({alter:true}).then(connection => {
  console.log('Connected To Database');
  app.listen(port, () => {
     console.log(`Server Started On Port ${port}`);
  });

}).catch(err => {
  console.log('Unable To Connect To Database ,Cant Start Server');
  console.log(err);
});

// Run the server without db connection
// app.listen(port, () => {
//   console.log(`Server Started On Port ${port}`);
// });
const express = require('express');
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const {errorHandler, notFound} = require("./middlewares/errorMiddleware");


dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;


app.use('/api/user', userRoutes);
app.use('/api/task', taskRoutes);




app.use(notFound);
app.use(errorHandler);



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})











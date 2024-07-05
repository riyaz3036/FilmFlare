const express= require('express');
const dotenv= require('dotenv');
const mongoose= require('mongoose');
const cors= require('cors');
const path = require('path');
const movieRoute = require('./routes/movies.js');
const authRoute = require('./routes/auth.js');
const userRoute = require('./routes/users.js');
const actorRoute = require('./routes/actors.js');
const producerRoute = require('./routes/producers.js');


dotenv.config();

const app= express();
const port = process.env.PORT || 8000;

const corsOptions={
    origin: true,
    methods: ["POST", "GET" ,"PUT", "DELETE"],
    credentials: true
}

//Database connection
const connect = async()=>{
    try{
        await mongoose.connect("mongodb+srv://riyazmittu:CNe7l6Hssa89lxiF@cluster0.p2o8scr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('connected to Mongodb');


    }catch(err){
        console.log('Mongodb connection failed',err.message);
    }
}


//Middleware
app.use(express.json());
app.use(cors(corsOptions));


// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//any req to Movie
app.use("/movie",movieRoute);

//any req to Actor
app.use("/actor",actorRoute);

//any req to Producer
app.use("/producer",producerRoute);

//login and register
app.use('/auth',authRoute);

//any request to /user
app.use('/user', userRoute);


app.listen(port,()=>{
    connect();  
    console.log('server listening on port',port);
})

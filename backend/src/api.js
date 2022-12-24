const express = require('express')
const serverless =  require('serverless-http')
const cors = require('cors')
const app = express();

require('dotenv').config();
require('./config/database')
app.use(cors({origin: '*', methods: "GET, POST, PUT, DELETE, PATCH", credentials: true}))


//ROUTES
const postRoutes = require('./routes/postRoutes')


//MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({extended: true}))
// app.use(require('./config/authorization'))
// Need auth for token later on






// const router = express.Router();


// router.get('/', (req,res) => {
//     res.json({
//         'hello': 'hi'
//     })
// })


app.use(`/.netlify/functions/api/`, postRoutes)






module.exports.handler = serverless(app)

const exp = require('express')
const app = exp()
require('dotenv').config() // process
const mongoClient = require('mongodb').MongoClient;
const path = require('path')

//deploy react build in this server
app.use(exp.static(path.join(__dirname,'../frontend/build')))

//to parse the body of req
app.use(exp.json())

mongoClient.connect(process.env.DB_URL)
.then(client=>{
    const fundifydb = client.db('fundifydb')
    const usersCollection = fundifydb.collection('usersCollection')
    const projectsCollection = fundifydb.collection('projectsCollection')
    app.set('usersCollection',usersCollection)
    app.set('projectsCollection',projectsCollection)
    console.log('DB Connection Success')
})
.catch(err=>{
    console.log(err)
})


const userApp = require('./API/user-api')

//if path starts with user-api ,send req to userApp
app.use('/user-api',userApp)

//for all paths deals with page refresh
app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname,'../frontend/build/index.html'))
})

//express error handler
app.use((err,req,res,next)=>{
    res.send({message:"error",payload:err.message})
})

//assign port number
const port = process.env.PORT || 5000;//if port number not specified it takes 5000
app.listen(port,()=>{console.log(`server on port ${port}`)})
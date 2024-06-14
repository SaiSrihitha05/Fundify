//create userApp
const exp = require('express')
const bcryptjs = require('bcryptjs')
const expressAsyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const verifyToken = require('../Middlewares/verifyToken')
require('dotenv').config()

const userApp = exp.Router()

//const commonApp = require('./common-api')

let usersCollection;
let projectsCollection;
//get usersCollection app
userApp.use((req,res,next)=>{
    usersCollection = req.app.get('usersCollection')
    projectsCollection = req.app.get('projectsCollection')
    next()
})

userApp.get('/projects/:username', verifyToken, expressAsyncHandler(async (req, res) => {
    const username = req.params.username;
    try {
        let allProjects = await projectsCollection.find({ username: username }).toArray();
        res.send({ message: "All Projects by User", payload: allProjects });
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}));

userApp.get('/project/:projectId/donate', verifyToken, expressAsyncHandler(async (req, res) => {
    const projectId = req.params.projectId;
    try {
        const project = await projectsCollection.findOne({ projectId: projectId });
        if (project) {
            res.send({ message: "Donate to Project", payload: project });
        } else {
            res.status(404).send({ message: "Project not found" });
        }
    } catch (error) {
        console.error("Error fetching project:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}));

userApp.get('/projects',verifyToken, expressAsyncHandler(async (req, res) => {
    const projectsCollection = req.app.get('projectsCollection'); // Accessing articlesCollection from middleware
    let projects = await projectsCollection.find().toArray(); // Using find() to get all documents in the collection
    res.send({ message: "This from user app", payload: projects });
}))

// userApp.get('/:projectId/donate',verifyToken, expressAsyncHandler(async (req, res) => {
//     const projectId = req.params.projectId;
//     try {
//         const project = await projectsCollection.findOne({ projectId: projectId });
//         if (project) {
//             res.send({ message: "Donate to Project", payload: project });
//         } else {
//             res.status(404).send({ message: "Project not found" });
//         }
//     } catch (error) {
//         console.error("Error fetching project:", error);
//         res.status(500).send({ message: "Internal Server Error" });
//     }
// }))

userApp.get('/project/:projectId/donate', verifyToken, expressAsyncHandler(async (req, res) => {
    const projectId = req.params.projectId;
    try {
        const project = await projectsCollection.findOne({ projectId: projectId });
        if (project) {
            res.send({ message: "Donate to Project", payload: project });
        } else {
            res.status(404).send({ message: "Project not found" });
        }
    } catch (error) {
        console.error("Error fetching project:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}));


userApp.post('/project/:projectId/donate', verifyToken, expressAsyncHandler(async (req, res) => {
    const projectId = req.params.projectId;
    const donationAmount = req.body.amount; // Assuming amount is sent in the request body

    try {
        // Perform logic to update project with donation amount
        // For example, update the collected fund for the project

        const updatedProject = await projectsCollection.findOneAndUpdate(
            { projectId: projectId },
            { $inc: { collectedFund: donationAmount } }, // Increment the collected fund by the donation amount
            { returnOriginal: false }
        );

        if (updatedProject.value) {
            res.send({ message: "Donation successful", project: updatedProject.value });
        } else {
            res.status(404).send({ message: "Project not found" });
        }
    } catch (error) {
        console.error("Error processing donation:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}));


userApp.post('/user',expressAsyncHandler(async(req,res)=>{
    const newUser = req.body
    const dbUser = await usersCollection.findOne({username:newUser.username})
    console.log(dbUser)
    if(dbUser!==null){
        res.send({message:"User Existed"})
        console.log("User existed")
    }else{
        const hashedPass = await bcryptjs.hash(newUser.password,6)
        newUser.password = hashedPass
        await usersCollection.insertOne(newUser)
        res.send({message:"User Created"})
        console.log("User created")
    }
}))

userApp.post('/login', expressAsyncHandler(async (req, res) => {
    const userCred = req.body;
    console.log('Received login request:', userCred);

    const dbUser = await usersCollection.findOne({ username: userCred.username });
    console.log('Database User:', dbUser);

    if (dbUser === null) {
        console.log('Invalid Username');
        res.status(401).send({ "message": "Invalid Username" });
    } else {
        try {
            const status = await bcryptjs.compare(userCred.password, dbUser.password);
            console.log('Bcrypt Comparison Result:', status);

            if (status === false) {
                console.log('Invalid Password');
                res.status(401).send({ "message": "Invalid Password" });
            } else {
                const signedToken = jwt.sign({ "username": dbUser.username }, process.env.SECRET_KEY, { expiresIn: '1d' });
                console.log('Login success');
                res.send({ "message": "login success", token: signedToken, user: dbUser });
            }
        } catch (error) {
            console.error('Error during password comparison:', error);
            res.status(500).send({ "message": "Internal Server Error" });
        }
    }
}));

userApp.put('/project',verifyToken,expressAsyncHandler(async(req,res)=>{
    const modifiedProject = req.body
    let result = await projectsCollection.updateOne({projectId:modifiedProject.projectId},{$set:{...modifiedArticle}})
    console.log(result)
    let latestProject = await projectsCollection.findOne({projectId:modifiedProject.projectId})
    res.send({message:"Project Modified",project:latestProject})
}))

userApp.post('/report/:projectId',verifyToken,expressAsyncHandler(async(req,res)=>{
    const reportBody = req.body
    const projectId = (+req.params.projectId)
    console.log(reportBody)
    let result = await projectsCollection.updateOne({projectId:projectId},{$addToSet:{reports:reportBody}})
    console.log(result)
    res.send({message:"Report Added"})
}))

userApp.post('/project',verifyToken,expressAsyncHandler(async(req,res)=>{
    const newProject = req.body
    console.log('new Project',newProject)
    await projectsCollection.insertOne(newProject)
    console.log('Project Added')
    res.send({message:"Project Added"})
}))

//export user app
module.exports = userApp;
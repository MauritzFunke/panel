import express from 'express';
import { port } from './config.json';


const PORT = process.env.PORT || port

const app = express();

app.get('/', (req, res) => {
    res.send("Hi!")
})


app.listen(PORT, (err) => {
    if(err) throw err;
    else console.log(`Server is now running on port ${PORT}`)
})
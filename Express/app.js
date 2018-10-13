// Grabbing express module from the package
const express = require('express');

const app = express();
const serveIndex = require('serve-index');


// app.get('/', (req, res) => {
//     res.send('Hello word');
// });

app.use('/nest', function (req, res, next); => {
    // console.log("Time: ", Date.now());
    console.log('Request type: ', req.method);
    next();
});

app.use('/gators', express.static('public'));
app.use('/gators', serveIndex('public'));

app.listen(3000, ()=> {
    console.log("Server listen on port 3000");
});
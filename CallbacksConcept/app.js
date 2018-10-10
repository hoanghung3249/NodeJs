var fs = require('fs');

// var data = fs.readFileSync('input.txt');

fs.readFile('input.txt',function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data.toString());
    }
});

// console.log(data.toString());
console.log("Program end");
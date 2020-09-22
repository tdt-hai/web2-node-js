const express = require('express');
const port = process.env.PORT  || 3000;

const app = express();

app.get('/',function(req,res){
    const name = req.query.name || 'world';
    res.end(`Hello ${name} from module xpress`);
})
app.listen(port);
console.log(`Server is listening on port ${port}`);

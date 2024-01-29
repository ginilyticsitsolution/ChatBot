const express = require('express')
const app = express()
const path = require('path')
const hostname = "192.168.10.118";
const port = 3000;
app.get('/Product', (req, res) => {

    res.json({
       "tags": [
           {
               "tag": "select",
               "cf-input-placeholder": "Ask away",
               "size": "1",
               "cf-questions": `Product is added to cart!`,
               "children":[
                   {
                       "tag": "option",
                       "cf-label": "Done",
                       "value": "opt-end"
                   }
               ]
           }
       ]
    });
});

app.use(express.static(__dirname));

app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/index.html')));

//app.listen(3000, () => console.log('Bot start on port 3000'));
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
const express = require('express')
const app = express()
const path = require('path')
app.get('/product1', (req, res) => {

    res.json({
       "tags": [
           {
               "tag": "select",
               "cf-input-placeholder": "Ask away",
               "size": "1",
               "cf-questions": "Produc1 is added to cart!",
               "children":[
                   {
                       "tag": "option",
                       "cf-label": "Done",
                       "value": "opt-start"
                   }
                   
               ]
           }
       ]
    })
})
app.use(express.static(__dirname))
app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/index.html')))



app.listen(3000, () => console.log('Bot start on port 3000'))
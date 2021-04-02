const express = require('express')
const app = express()
const port = 80
const DataClient = require('./test');

app.get('/all-posts', (req, res) => {
    DataClient.connectToServer()
        .then(() => {
            DataClient.findDocuments()
                .then((data) => {
                    res.send(data);
                })  
        })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
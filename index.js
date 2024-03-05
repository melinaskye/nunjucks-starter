require('dotenv').config()
const express = require('express');
const nunjucks = require('nunjucks');
const app = express();
const port = process.env.PORT || 3000
// configure pg
const pg = require('pg')

const client = new pg.Client({
    connectionString: process.env.CONNECTION_STRING
})
// Configure Nunjucks
nunjucks.configure('views', {
    autoescape: true,
    noCache: process.env.NODE_ENV !== 'production',
    express: app
});
app.get('/', async(req, res) => {
    await client.connect()
    const results = await client.query('select name from artist')
    await client.end()
    // Render index.njk using the variable "title"
    res.render('index.njk', { title: "Artists", rows: results.rows });
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.get('/artist/:id', async (req,res) =>){
    
}
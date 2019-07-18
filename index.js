import express from 'express';
import cors from 'cors';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express()
const __dirname = dirname( fileURLToPath( import.meta.url ) )

// TODO: create a directory, server, for API routes

app.use( cors() )

// TODO: Replace with better logger
app.use( async (req, res, next) => {
  await console.log( Date.now(), req.originalUrl )
  next()
})

app.get('/api/articles', async (req, res, next) => {
  try {
    // TODO: Grab articles from the database. Requires mongoose.
    res.json( { articles: ['They went that way', 'In the Upside-Down', 'Milquetoast'] } )
  } catch( e ) {
    next( e )
  }
})

app.post('/api/articles', async (req, res, next) => {
  try {
    // TODO: Create a new article and save to the database.
    res.sendStatus(204)
  } catch(e) {
    next( e )
  }
})

// Serve static files from the React frontend app
app.use(express.static(join(__dirname, '/client/build')))

// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  console.log(__dirname)
  res.sendFile(join(__dirname, '/client/build/index.html'))
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Express server listening on port ${ PORT }`)
})

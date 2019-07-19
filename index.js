import sslRedirect from 'heroku-ssl-redirect';
import listEndpoints from 'express-list-endpoints';
import express from 'express';
import cors from 'cors';
import logger from './server/middleware/logger.js';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { connect } from './server/database.js';

const app = express()
const __dirname = dirname( fileURLToPath( import.meta.url ) )

// TODO: create a directory, server, for API routes

app.use( sslRedirect() )
app.use( cors() )
app.use( express.json() )
app.use( express.urlencoded({ extended: true }) )

// TODO: Replace with better logger
app.use( logger );

import api from './server/api/index.js';

app.use('/api', api);

// Serve static files from the React frontend app
app.use(express.static(join(__dirname, '/client/build')))

// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  console.log(__dirname)
  res.sendFile(join(__dirname, '/client/build/index.html'))
})

const PORT = process.env.PORT || 5000

connect().then(async () => {
  app.listen(PORT, () => {
    console.log(`Express server listening on port ${ PORT }`)
    console.log(listEndpoints(app));
  })
}).catch(async (err) => {
  console.error( err )
})

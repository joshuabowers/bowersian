const express = require('express')
const cors = require('cors')

const app = express()

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

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Express server listening on port ${ PORT }`)
})

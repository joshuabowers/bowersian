import mongoose from 'mongoose';
import chalk from 'chalk';
import config from './database.config.js';

const { cyan: connected, yellow: error, red: disconnected, magenta: termination } = chalk.bold;

export const connect = () => {
  const connection = mongoose.connect( config.databaseUrl, config.options );

  mongoose.connection.on('connected', () => {
    console.log( connected(`Mongoose connected to ${ config.databaseUrl }`) )
  })

  mongoose.connection.on('error', err => {
    console.warn( error(`Mongoose connection error: ${ err }`) )
  })

  mongoose.connection.on('disconnected', () => {
    console.error( disconnected('Mongoose no longer connected') )
  })

  process.on('SIGINT', () => {
    mongoose.connection.close( () => {
      console.log( termination('Shutting down mongoose connection due to process exit'))
      process.exit(0)
    })
  })

  return connection;
}
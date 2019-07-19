import chalk from 'chalk';

const timestamp = chalk.yellow;
const method = chalk.bold.cyan;
const uri = chalk.underline.cyan;
const data = chalk.bold.green;

export default async function logger( req, res, next ) {
  const out = `\n${ timestamp( new Date().toUTCString() ) }: ${ method( req.method ) } ${ uri( req.originalUrl ) }`;
  await console.log( out );
  await console.info( data('body'), ':', req.body );
  next();
}
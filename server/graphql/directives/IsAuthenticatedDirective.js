import { SchemaDirectiveVisitor } from "graphql-tools";
import { AuthenticationError } from "apollo-server-core";
import { defaultFieldResolver } from "graphql";

export class IsAuthenticatedDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function(...args) {
      const context = args[2];
      console.log( 'IsAuthenticated Field Resolver:');
      console.log( 'context.isAuthenticated:', context.isAuthenticated() );
      if( !context.isAuthenticated() ){
        throw new AuthenticationError('You must be logged in to perform this action');
      }
      // return result[field.name];
      return resolve.apply(this, args);
    }
  }
}
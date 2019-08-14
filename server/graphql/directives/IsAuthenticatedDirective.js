import { SchemaDirectiveVisitor } from "graphql-tools";
import { AuthenticationError } from "apollo-server-core";
import { defaultFieldResolver } from "graphql";

export class IsAuthenticatedDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function(...args) {
      const context = args[2];
      if( !context.isAuthenticated() ){
        throw new AuthenticationError('You must be logged in to perform this action');
      }
      return resolve.apply(this, args);
    }
  }
}
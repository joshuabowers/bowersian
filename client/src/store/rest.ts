export enum Endpoints {
  Browse = 1,
  Read = 1 << 1,
  Add = 1 << 2,
  Edit = 1 << 3,
  Destroy = 1 << 4,
  All = Browse | Read | Add | Edit | Destroy
}

export interface Identifiable {
  id: string;
}

export interface IModel extends Identifiable {}

export interface IApi<TModel extends IModel, TRequest = TModel> {
  resource: string;
  allowed: Endpoints;

  browse(subresource?: string, query?: string): Promise<TModel[]>;
  read(idOrSlug: string): Promise<TModel>;
  add(request: TRequest): Promise<TModel>;
  edit(request: TRequest): Promise<TModel>;
  destroy(resource: TModel): Promise<boolean>;
}

/**
 * Defines an API for communicating with a REST API over a set of
 * endpoints. This is typed: indexable models, with an option for
 * slightly different requests, as needed.
 */
export class Api<TModel extends IModel, TRequest = TModel>
  implements IApi<TModel, TRequest> {
  resource: string;
  allowed: Endpoints;

  constructor(resource: string, allowed: Endpoints = Endpoints.All) {
    this.resource = resource;
    this.allowed = allowed;
  }

  endpoint(...rest: string[]) {
    return [this.resource, ...rest].join('/');
  }

  async browse(subresource?: string, query?: string) {
    this.verifyEndpointAllowed(Endpoints.Browse);
    const res = await fetch(this.endpoint(subresource || ''));
    return (await res.json()) as TModel[];
  }

  async read(idOrSlug: string) {
    this.verifyEndpointAllowed(Endpoints.Read);
    const res = await fetch(this.endpoint(idOrSlug));
    return (await res.json()) as TModel;
  }

  // NOTE: using this for login seems dubious, as this will need to
  // send credentials for non-login requests.
  async add(request: TRequest) {
    this.verifyEndpointAllowed(Endpoints.Add);
    const res = await fetch(this.resource, {
      method: 'POST',
      body: JSON.stringify(request),
      credentials: 'include'
    });
    return (await res.json()) as TModel;
  }

  async edit(request: TRequest) {
    this.verifyEndpointAllowed(Endpoints.Edit);
    const res = await fetch(this.resource, {
      method: 'PUT',
      body: JSON.stringify(request),
      credentials: 'include'
    });
    return (await res.json()) as TModel;
  }

  async destroy(resource: TModel) {
    this.verifyEndpointAllowed(Endpoints.Destroy);
    const res = await fetch(this.endpoint(resource.id), {
      method: 'DELETE',
      credentials: 'include'
    });
    return await res.json();
  }

  verifyEndpointAllowed(endpoint: Endpoints) {
    if ((this.allowed & endpoint) === 0) {
      throw `resource ${this.resource} does not allow access to endpoint ${endpoint}`;
    }
  }
}

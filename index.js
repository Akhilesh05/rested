class Request {
  constructor() {
    this.method = 'GET';
  }
}

function camelToUnderscore(text) {
  let underscored = text.replace(/[A-Z]/g, char => `_${char.toLowerCase()}`);
  if (underscored[0] === '_') {
    underscored = underscored.substr(1);
  }
  return underscored;
}

function formatString(text, params) {
  return text.replace(/:(\w+)/g, function() {
    return params[arguments[1]]
  })
}

const Methods = Object.freeze({
  GET: Symbol('get'),
  POST: Symbol('post'),
  PUT: Symbol('put'),
  DELETE: Symbol('delete'),
});

const actionToUrlMapping = Object.freeze({
  index: {
    url: '/:resource',
    method: Methods.GET,
  },
  show: {
    url: '/:resource/:id',
    method: Methods.GET,
  },
  create: {
    url: '/:resource',
    method: Methods.POST,
  },
  update: {
    url: '/:resource/:id',
    method: Methods.PUT,
  },
  destroy: {
    url: '/:resource/:id',
    method: Methods.DELETE,
  },
});

function buildRequest(resource, action, params = {}) {
  params.resource = resource;
  url = formatString(actionToUrlMapping[action].url, params);
  method = actionToUrlMapping[action].method;

  return new Request({
    method: this.method(),
    url: this.url()
  })
}

export default {
  Model: {
    find(id) {
      return buildRequest(this.name, 'index', {id});
    }
  }
}

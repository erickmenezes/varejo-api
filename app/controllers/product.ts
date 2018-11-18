import { Request, Response, Next } from 'restify';

import * as querystring from 'querystring';

import { Product } from '../models/Product';

export default class ProductController {
  get = (req: Request, res: Response, next: Next) => {
    let query = req.query;
    let where = Object.assign({}, query, {})

    delete where.show;
    delete query.page;
    delete where.page;

    let limit = parseInt(query.limit) || 8;
    let page = parseInt(query.page) || 1;

    Product.find(query, null, {skip: (page - 1) * limit, limit: limit}, (err, products) => {
      if (err) {
        return next(err);
      }

      let count = products.length;

      let qs = querystring.stringify(query);
      qs = Object.keys(query).length > 0 ? '&' + qs : qs;
      let paginationUrl = '/products?page=';

      res.json({
        count: count, 
        page: page,
        previous: page === 1 ? null : paginationUrl + (page - 1) + qs,
        next: count - (page * limit) <= 0 ? null : paginationUrl + (page + 1) + qs,
        results: products
      });
      next();
    });
  }
}

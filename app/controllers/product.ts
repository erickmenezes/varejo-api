import { Request, Response, Next } from 'restify';

import * as querystring from 'querystring';

import { Product } from '../models/Product';

export default class ProductController {
  get = (req: Request, res: Response, next: Next) => {
    let query = req.query;
    let limit = parseInt(query.limit) || 8;
    let page = parseInt(query.page) || 1;

    let filters = Object.assign({}, query, {})

    delete filters.limit;
    delete filters.page;
    delete query.page;

    if (filters.search) {
      filters.category = querystring.unescape(filters.search);
      delete filters.search;
    }

    filters.category = new RegExp(filters.category, 'i');

    Product.count(filters, function(err, count) {
      Product.find(filters, null, {skip: (page - 1) * limit, limit: limit}, (err, products) => {
        if (err) {
          return next(err);
        }
  
        let qs = querystring.stringify(query);
        qs = Object.keys(query).length > 0 ? '&' + qs : qs;
  
        let paginationUrl = '/products?page=';
        res.json({
          count: count, 
          page: page,
          totalPages: Math.ceil(count/limit),
          previous: page === 1 ? null : paginationUrl + (page - 1) + qs,
          next: count - (page * limit) <= 0 ? null : paginationUrl + (page + 1) + qs,
          results: products
        });
        next();
      });
    });
  }
}

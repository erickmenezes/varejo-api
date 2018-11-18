import { expect } from 'chai';
import 'mocha';
import { server } from '../../app/app';
import * as supertest from 'supertest';

describe('Route Products', () => {
    it('should return 200', (done) => {
      supertest(server)
        .get('/products')
        .end((err: any, response: supertest.Response) => {
          if (err) { done(err); }
          else {
            expect(response.status).to.equal(200);

            done();
          }

          server.close();
        });
    });

    it('should accept null parameters with trailing slash', function(done) {
      supertest(server)
        .get('/products/')
        .end((err: any, response: supertest.Response) => {
          if (err) { done(err); }
          else {
            expect(response.status).to.equal(200);

            done();
          }

          server.close();
        });
    });

});

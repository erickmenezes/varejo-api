import { expect } from 'chai';
import 'mocha';
import { server } from '../../app/app';
import * as supertest from 'supertest';

describe('Route Echo', () => {
    it('should return 200', (done) => {
      supertest(server)
        .get('/echo')
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
        .get('/echo/')
        .end((err: any, response: supertest.Response) => {
          if (err) { done(err); }
          else {
            expect(response.status).to.equal(200);

            done();
          }

          server.close();
        });
    });

    it('should echo back message', function(done){
      supertest(server)
        .get('/echo/hello')
        .end((err: any, response: supertest.Response) => {
          expect(response.status).to.equal(200);
          expect(response.body.message).to.equal('hello');

          done();
      });
    });    

});

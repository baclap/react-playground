'use strict';

const app = require('../../app').listen();
// supertest allows us to make request to our endpoints and test the response
const request = require('supertest');
// chai is our assert library, it has helpful assert functions such as expect
const expect = require('chai').expect;

// this is how mocha test are started
describe('/hello endpoint', function() {

  // could potentially have multiple `it`s in here
  it('should return hello world', function (done) {

    // must pass in the listening app... TODO make better
    request(app)

      // get request to /hello endpoint
      .get('/hello')

      // expect 200 status (this expect is part of supertest)
      .expect(200)

      // supertest's end function calls callback with any potential errors as first param and the response as second
      .end(function(error, response) {
        // use chai's expect function to assert the response text is in fact hello world
        expect(response.text).to.equal('hello world\n');
        done();
      });

  });

});

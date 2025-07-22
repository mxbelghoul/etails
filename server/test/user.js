const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe('Users', () => {
  it('it should not register a user without a name', (done) => {
    const user = {
      email: 'test@test.com',
      password: 'password',
    };
    chai
      .request(server)
      .post('/api/users/register')
      .send(user)
      .end((err, res) => {
        res.should.have.status(500);
        done();
      });
  });

  it('it should register a user', (done) => {
    const user = {
      name: 'Test User',
      email: 'test@test.com',
      password: 'password',
    };
    chai
      .request(server)
      .post('/api/users/register')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('token');
        done();
      });
  });
});

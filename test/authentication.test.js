const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../app');
chai.use(chaiHttp);

describe("Authentication Tests", () => {
    
});

 describe("Registering User Test", () => {
    it("Should register a new user", (done) => {
        chai.request(server)
        .post('/auth/register')
        .send({
            username: "Bob",
            password: "password"
        })
        .end((err, res) => {
            should.not.exist(err);
            res.redirects.length.should.eql(0);
            res.status.should.eql(200);
            res.type.should.eql('application/json');
            res.body.status.should.eql('success');
            done();
        });
    });
 });   

import * as chai from "chai";
import chaiHttp from "chai-http";
import exp from "constants";
chai.use(chaiHttp);
import request from "supertest";
const expect = chai.expect;

describe("USER JOURNERY PROCESS", () => {
  it("Return user, after the creation", (done) => {
    const sampleObj = {
      name: "Test",
      email: "test@email.com",
      password: "Test@1234",
    };
    request("http://localhost:4000")
      .post("/signup")
      .expect(201)
      .send(sampleObj)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).to.equal("User has been created successfully");
        done();
      });
  });

  it("Duplicate entry of user", (done) => {
    const sampleObj = {
      name: "Test",
      email: "test@email.com",
      password: "Test@1234",
    };
    request("http://localhost:4000")
      .post("/signup")
      .expect(409)
      .send(sampleObj)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.error.message).to.equal("Email is already exist");
        expect(res.body.success).to.equal(false);
        done();
      });
  });

  it("For Bad Request", (done) => {
    const sampleObj = {
      name: "Test",
      email: "test@email.com",
      password: "Test@1234",
    };
    request("http://localhost:4000")
      .post("/signup")
      .expect(400)
      .send(sampleObj)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.error.message).to.equal("Something Went Wrong");
        expect(res.body.success).to.equal(false);
        done();
      });
  });
});

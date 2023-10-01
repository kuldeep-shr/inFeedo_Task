import * as chai from "chai";
import chaiHttp from "chai-http";
chai.use(chaiHttp);
import request from "supertest";
const expect = chai.expect;
import * as dotenv from "dotenv";
dotenv.config();
const api_endpoint = String(process.env.API_ENDPOINT);
const guest_token = `Bearer ${String(process.env.GUEST_TOKEN)}`;

describe("Initial Or Testing Route", () => {
  it("it should return the message", (done) => {
    request(api_endpoint)
      .get("/")
      .set("Authorization", guest_token)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an("object");
        expect(res.body.message).to.equal("Task Management Service");
        expect(res.body.data).to.be.an("array").that.is.empty;
        expect(res.body.success).to.equal(true);
        done();
      });
  });

  it("it should create the Task", (done) => {
    const sampleTask = {
      tasks: [
        {
          title: "Title-1", // mandatory parameter
          description: "Description 1", // optional parameter
          scheduled_at: "", //optional parameter, but dont send past date otherwise it will throw an error
        },
      ],
    };

    request(api_endpoint)
      .post("/create-task")
      .set("Authorization", guest_token)
      .send(sampleTask)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an("object");
        expect(res.body.message).to.equal("Task has been created successfully");
        expect(res.body.success).to.equal(true);
        done();
      });
  });

  it("it should update the Task", (done) => {
    /*
      whatever field to update it, just send the field name for ex, if you want to update only update <title> field then body should be like
      {
        id:<TASK ID>
        title:<TITLE MESSAGE>
      }
      NOTE:
      1) Dont send <scheduled_at> key empty, otherwise it will throw an error, either you send this key with Future Date not the Past Date or dont send it
      2) sending <status> key to update, it will allow you to send only these status 'open_tasks' ,'inprogress_tasks' ,'completed_tasks' otherwise it will throw an error
    
    */
    const updateSampleTask = {
      id: 1, // mandatory parameter
      title: "Updating Title 1", // optional parameter
      description: "Updating Description 1", // optional parameter
      scheduled_at: "2025-01-01 15:30:20", //optional parameter
      status: "open_tasks", // optional parameter
    };

    request(api_endpoint)
      .post("/update-task")
      .set("Authorization", guest_token)
      .send(updateSampleTask)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an("object");
        expect(res.body.message).to.equal("Task has been updated successfully");
        expect(res.body.success).to.equal(true);
        done();
      });
  });

  it("it should return the List of Tasks, according to the loginned user", (done) => {
    /*

      NOTE:t
      1) sending <status> key to update, it will allow you to send only these status 'open_tasks' ,'inprogress_tasks' ,'completed_tasks' otherwise it will throw an error
    
    */
    const getSampleTask = {
      id: 0,
      title: "",
      status: [],
      scheduled_at: "",
      created_at: "",
      updated_at: "",
      current_page: 1,
      total_item: 5,
    };

    request(api_endpoint)
      .post("/tasks")
      .set("Authorization", guest_token)
      .send(getSampleTask)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an("object");
        expect(res.body.message).to.equal("Task list");
        expect(res.body.success).to.equal(true);
        done();
      });
  });

  it("it should return the count of task", (done) => {
    /*

      NOTE:t
      1) sending <status> key to update, it will allow you to send only these status 'open_tasks' ,'inprogress_tasks' ,'completed_tasks' otherwise it will throw an error
      2) When you pass the <scheduled_at>  it will return the count of all status according to the scheduled_at
      3) When you dont pass the <scheduled_at>  it will return the overall count of all status     
    */
    const getSampleTask = {
      status: ["open_tasks", "completed_tasks"],
      scheduled_at: "",
    };

    request(api_endpoint)
      .post("/tasks-pagination")
      .set("Authorization", guest_token)
      .send(getSampleTask)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an("object");
        expect(res.body.message).to.equal("Task list");
        expect(res.body.success).to.equal(true);
        done();
      });
  });
});

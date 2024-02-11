const { mongoose } = require("mongoose");
const { DB_HOST_TEST } = require("../../config");
const app = require('../../app');
const request = require("supertest");
const User = require("../../models/user");

describe('User Registration and Login', () => {
  beforeAll(async () => {
    await mongoose
      .connect(DB_HOST_TEST)
      .then(() => console.log("Database connection successful"))
      .catch((err) => {
        console.error(err)
      })
    
    await User.deleteMany()

  })

  it("should registration a new user", async () => {
    const response = await request(app).post("/api/users/register").send({
      email: "test1@gmail.com",
      password: "password"
    });
    
    expect(response.statusCode).toBe(201); 
    expect(response.body.user.email).toBe("test1@gmail.com");
    expect(response.body.user.subscription).toBeTruthy();
  });

    it("should log in user", async () => {
      const response = await request(app).post("/api/users/login").send({
      email: "test1@gmail.com",
      password: "password"
      })
      
      expect(response.statusCode).toBe(200);
      expect(response.body.token).toBeTruthy();
      expect(response.body.user.email).toBe("test1@gmail.com");
      expect(response.body.user.subscription).toBeTruthy();
    })
  

    afterAll(async () => {
      await mongoose
        .disconnect(DB_HOST_TEST)
        .then(() => console.log("Database disconnected"))
    })
  })



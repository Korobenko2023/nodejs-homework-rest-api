const { mongoose } = require("mongoose");
const { DB_HOST_TEST } = require("../../config");
const app = require('../../app');
const request = require("supertest");
const User = require("../../models/user");

describe('User Login', () => {
  beforeAll(async () => {
    await mongoose
      .connect(DB_HOST_TEST)
      .then(() => console.log("Database connection successful"))
      .catch((err) => {
        console.error(err)
      })
  })

  it("should log in user", async () => {
      await request(app).post("/api/users/register").send({
      email: "test1@gmail.com",
      password: "password"
      });
    
      const response = await request(app).post("/api/users/login").send({
      email: "test1@gmail.com",
      password: "password"
      })
      
      expect(response.statusCode).toBe(200);
      expect(response.body.token).toBeTruthy();
      expect(response.body.user.email).toBe("test1@gmail.com");
      expect(typeof response.body.user.email).toEqual(expect.any(String));
      expect(response.body.user.subscription).toBeTruthy();
      expect(typeof response.body.user.subscription).toEqual(expect.any(String));
    })  

  afterAll(async () => {
      await User.deleteMany();
      await mongoose
        .disconnect(DB_HOST_TEST)
        .then(() => console.log("Database disconnected"))
    })
  })





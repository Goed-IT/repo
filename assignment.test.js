const request = require("supertest")("https://gorest.co.in/public/v2/");
const faker = require("faker");

let token = "3170ea4bc896a441c270b70f13ea679369a551de8d502b1d2b4c0d3eae793156";
let userId;
let userEmail;
let userName;

describe("Users CRUD Operations", () => {
  beforeAll(() => {
    userEmail = faker.internet.email();
    userName = faker.name.firstName();
  });

  it("should create a new user", async () => {
    const response = await request
      .post("/users")
      .send({
        name: userName,
        email: userEmail,
        gender: "male",
        status: "active",
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(201);
    userId = response.body.id;
  });

  it("should retrieve the created user", async () => {
    const response = await request
      .get(`/users/${userId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(userId);
  });

  it("should update the created user", async () => {
    const updatedName = `${userName}_updated`;
    const updatedEmail = `updated_${userEmail}`;

    const response = await request
      .patch(`/users/${userId}`)
      .send({
        name: updatedName,
        email: updatedEmail,
        gender: "male",
        status: "active",
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe(updatedName);
    expect(response.body.email).toBe(updatedEmail);
  });

  it("should delete the created user", async () => {
    const response = await request
      .delete(`/users/${userId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(204);
  });
});

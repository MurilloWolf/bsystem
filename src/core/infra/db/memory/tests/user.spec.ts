import UserTable from "../user";
import userMock from "../mock/user.table";

describe("DB In Memory - User", () => {
  let dbUser = new UserTable([]);
  const user1 = {
    id: "X",
    name: "Test",
    email: "test@gmail.com",
    password: "1234",
    cpf: "12345678900",
    zipCode: "12345678",
    phone: "123456789",
    type: "user",
    role: [],
    companyId: null,
    companyName: null,
    birthdate: new Date(),
  };
  beforeEach(() => {
    dbUser = new UserTable([]);
  });

  it("Should create a new user", async () => {
    const newUser = user1;
    const response = await dbUser.create(newUser);
    expect(response).toStrictEqual(newUser);
  });

  it("should create a new user with other users in table", async () => {
    dbUser = new UserTable();
    const newUser = user1;
    const response = await dbUser.create(newUser);
    expect(response).toStrictEqual(newUser);
  });

  it("Should find a user by id", async () => {
    dbUser = new UserTable();
    const response = await dbUser.findById("4");
    expect(response).toStrictEqual(userMock[3]);
  });

  it("Should find a user by email", async () => {
    dbUser = new UserTable();
    const response = await dbUser.findByEmail("carlos.souza@example.com");
    expect(response).toStrictEqual(userMock[2]);
  });

  it("Should find a user by cpf", async () => {
    dbUser = new UserTable();
    const response = await dbUser.findByCpf("987.654.321-00");
    expect(response).toStrictEqual(userMock[1]);
  });

  it("Should find a user by name", async () => {
    dbUser = new UserTable();
    const response = await dbUser.findByName("Carlos");
    expect(response).toStrictEqual([userMock[2]]);
  });

  it("Should find more than one user by name", async () => {
    const user2 = { ...user1, name: "Test 2", id: "Y" };
    dbUser = new UserTable([user1, user2]);

    const response = await dbUser.findByName("Test");
    expect(response.length).toBe(2);
  });

  it("Should list all users", async () => {
    dbUser = new UserTable();
    const response = await dbUser.listAll();
    expect(response).toStrictEqual(userMock);
    expect(response.length).toBe(userMock.length);
  });

  it("Should update a user", async () => {
    dbUser = new UserTable();
    const userUpdate = { ...userMock[0], name: "Alice Silva Updated" };
    const response = await dbUser.update(userUpdate);
    expect(response).toStrictEqual(userUpdate);
  });

  it("Should delete a user", async () => {
    dbUser = new UserTable();
    const response = await dbUser.delete("1");
    expect(response).toBe(true);
  });

  it("Should return null if user not found", async () => {
    dbUser = new UserTable();
    const response = await dbUser.findById("100");
    expect(response).toBeNull();
  });

  it("Should not create a user if email already exist", async () => {
    dbUser = new UserTable();
    const newUser = { ...user1, email: "support@gamatech.com" };
    const response = await dbUser.create(newUser);
    expect(response).toBeNull();
  });

  it("Should not create a user if cpf already exist", async () => {
    dbUser = new UserTable();
    const newUser = { ...user1, cpf: "123.456.789-00" };
    const response = await dbUser.create(newUser);
    expect(response).toBeNull();
  });

  it("Should return a empty array if user not found by name", async () => {
    dbUser = new UserTable();
    const response = await dbUser.findByName("Not Found");
    expect(response).toStrictEqual([]);
  });

  it("Should return a empty array if there is no user", async () => {
    dbUser = new UserTable([]);
    const response = await dbUser.listAll();
    expect(response).toStrictEqual([]);
  });
});

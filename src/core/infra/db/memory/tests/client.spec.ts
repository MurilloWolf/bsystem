import Client from "../client";
import mockedClients from "../mock/client.table";

describe("DB in Memory - Client", () => {
  let dbClient = new Client([]);

  it("Should create a new client", async () => {
    dbClient = new Client([]);
    const newClient = {
      id: "X",
      name: "Joana Silva",
      email: "",
      document: "12.345.678/0001-90",
      phone: "(11) 91234-5678",
      zipCode: "01001-000",
      birthDate: "1985-03-12",
      userId: "1",
    };
    const response = await dbClient.create(newClient);
    expect(response).toStrictEqual(newClient);
  });

  it("Should return all clients", async () => {
    dbClient = new Client();
    const response = await dbClient.findAll();
    expect(response).toStrictEqual(mockedClients);
    expect(response).toHaveLength(mockedClients.length);
  });

  it("Should return a client by id", async () => {
    dbClient = new Client();
    const response = await dbClient.findById("1");
    expect(response).toStrictEqual(mockedClients[0]);
  });

  it("Should return a client by document", async () => {
    dbClient = new Client();
    const response = await dbClient.findByDocument("12.345.678/0001-90");
    expect(response).toStrictEqual(mockedClients[0]);
  });

  it("Should return a client by email", async () => {
    dbClient = new Client();
    const response = await dbClient.findByEmail("ricardo.almeida@email.com");
    expect(response).toStrictEqual(mockedClients[8]);
  });

  it("Should return a client by name", async () => {
    dbClient = new Client();
    const response = await dbClient.findByName("Roberto Lima");
    expect(response).toStrictEqual(mockedClients[4]);
  });

  it("Should update a client", async () => {
    dbClient = new Client();
    const clientToUpdate = {
      id: "4",
      name: "Ana Souza",
      email: "test@test.com",
      document: "987.654.321-99",
      phone: "(41) 96543-2109",
      zipCode: "80010-100",
      birthDate: "1995-01-30",
      userId: "2",
    };
    const response = await dbClient.update(clientToUpdate);
    expect(response).toStrictEqual(clientToUpdate);
  });

  it("Should delete a client", async () => {
    dbClient = new Client();
    const response = await dbClient.delete("4");
    expect(response).toBe(true);
  });

  it("Should return all clients by user id", async () => {
    dbClient = new Client();
    const response = await dbClient.findAllByUserId("4");
    expect(response).toHaveLength(3);
  });

  describe("Error cases", () => {
    it("Should return null when try to create a client with an existing email", async () => {
      dbClient = new Client();
      const newClient = {
        id: "X",
        name: "Ricardo",
        email: "ricardo.almeida@email.com",
        document: "12.345.678/0001-90",
        phone: "(11) 91234-5678",
        zipCode: "01001-000",
        birthDate: "1985-03-12",
        userId: "1",
      };
      const response = await dbClient.create(newClient);
      expect(response).toBeNull();
    });

    it("Should return null when try to create a client with an existing document", async () => {
      dbClient = new Client();
      const newClient = {
        id: "X",
        name: "Ricardo",
        email: "test@test.com",
        document: "12.345.678/0001-90",
        phone: "(11) 91234-5678",
        zipCode: "01001-000",
        birthDate: "1985-03-12",
        userId: "1",
      };
      const response = await dbClient.create(newClient);
      expect(response).toBeNull();
    });

    it("Should return null when try to create a client with an invalid user id", async () => {
      dbClient = new Client();
      const newClient = {
        id: "X",
        name: "Ricardo",
        email: "test@test.com",
        document: "12.345.678/0001-90",
        phone: "(11) 91234-5678",
        zipCode: "01001-000",
        birthDate: "1985-03-12",
        userId: "100",
      };
      const response = await dbClient.create(newClient);
      expect(response).toBeNull();
    });

    it("Should return null when client not found by id", async () => {
      dbClient = new Client();
      const response = await dbClient.findById("100");
      expect(response).toBeNull();
    });

    it("Should return null when client not found by document", async () => {
      dbClient = new Client();
      const response = await dbClient.findByDocument("123.456.789-99");
      expect(response).toBeNull();
    });

    it("Should return null when client not found by email", async () => {
      dbClient = new Client();
      const response = await dbClient.findByEmail("teste22@gmail.com");
      expect(response).toBeNull();
    });

    it("Should return null when not found userId in clients", async () => {
      dbClient = new Client();
      const response = await dbClient.findAllByUserId("100");
      expect(response).toBeNull();
    });

    it("Should return null when not found client by name", async () => {
      dbClient = new Client();
      const response = await dbClient.findByName("Teste");
      expect(response).toBeNull();
    });
  });
});

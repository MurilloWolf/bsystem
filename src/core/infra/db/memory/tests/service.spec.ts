import ServiceTable from "../service";
import mockService from "../mock/service.table";

describe("DB In Memory - Service", () => {
  let dbService = new ServiceTable([]);
  const service1 = {
    id: "X",
    name: "Carlos",
    description: "Instalação de placas",
    price: 100,
    category: "operational",
  };

  it("should create a service", async () => {
    dbService = new ServiceTable([]);

    const newService = service1;

    const result = await dbService.create(newService);
    expect(result).toEqual(newService);
  });

  it("should find all services", async () => {
    dbService = new ServiceTable();
    const result = await dbService.findAll();
    expect(result).toStrictEqual(mockService);
    expect(result).toHaveLength(mockService.length);
  });

  it("Should find a service by id", async () => {
    dbService = new ServiceTable();
    const result = await dbService.findById("1");
    expect(result).toStrictEqual(mockService[0]);
  });

  it("Should update a service", async () => {
    dbService = new ServiceTable();
    const newService = {
      id: "1",
      name: "Carlos",
      description: "Instalação de placas",
      price: 100,
      category: "operational",
    };

    const result = await dbService.update(newService);
    expect(result).toEqual(newService);
  });

  it("Should delete a service", async () => {
    dbService = new ServiceTable();
    const result = await dbService.delete("1");
    expect(result).toBe(true);
  });

  it("Should find a service by category", async () => {
    dbService = new ServiceTable();
    const result = await dbService.findByCategory("Suporte");
    expect(result).toStrictEqual([mockService[2]]);
  });

  it("Should get all categories", async () => {
    dbService = new ServiceTable();
    const result = await dbService.getAllCategories();
    expect(result).toStrictEqual([
      "Desenvolvimento",
      "Consultoria",
      "Suporte",
      "Design",
    ]);
  });

  describe("Error cases", () => {
    it("Should return null if there is no service with the id", async () => {
      dbService = new ServiceTable([]);
      const result = await dbService.findById("Y");
      expect(result).toBeNull();
    });

    it("Should return a empty array if there is no service", async () => {
      dbService = new ServiceTable([]);
      const result = await dbService.findAll();
      expect(result).toStrictEqual([]);
    });
  });
});

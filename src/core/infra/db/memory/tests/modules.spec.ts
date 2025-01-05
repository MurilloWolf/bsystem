import Modules from "../modules";
import mockModules from "../mock/modules.table";

describe("DB Memory - Modules", () => {
  let modules = new Modules([]);

  it("should create a module", async () => {
    modules = new Modules([]);
    const response = await modules.create(mockModules[0]);
    expect(response).toEqual(mockModules[0]);
  });

  it("should return all modules", async () => {
    modules = new Modules();

    const response = await modules.findAll();
    expect(response).toHaveLength(mockModules.length);
  });

  it("should return a module by id", async () => {
    modules = new Modules();

    const response = await modules.findById(mockModules[0].id);
    expect(response).toEqual(mockModules[0]);
  });

  it("should return all modules by power", async () => {
    modules = new Modules();

    const response = await modules.findAllByPower(555);
    expect(response).toHaveLength(7);
  });

  it("should return all modules by type", async () => {
    modules = new Modules();

    const response = await modules.findAllByType("bifacial");
    expect(response).toHaveLength(1);
  });

  it("should return all modules by producer", async () => {
    modules = new Modules();

    const response = await modules.findAllByProducer("Canadian");
    expect(response).toHaveLength(3);
  });

  it("should return a module by name", async () => {
    modules = new Modules();

    const response = await modules.findByName("Canadian Solar");
    expect(response).toEqual(mockModules[0]);
  });

  it("should update a module", async () => {
    modules = new Modules();

    const response = await modules.update({
      ...mockModules[0],
      name: "Updated Name",
    });
    expect(response.name).toEqual("Updated Name");
  });

  it("should delete a module", async () => {
    modules = new Modules();

    const response = await modules.delete(mockModules[0].id);
    expect(response).toBeTruthy();
  });

  describe("Error cases", () => {
    it("should return null if module already exists", async () => {
      modules = new Modules();

      const response = await modules.create(mockModules[0]);
      expect(response).toBeNull();
    });

    it("should return null if module not found", async () => {
      modules = new Modules();

      const response = await modules.findById("invalid-id");
      expect(response).toBeNull();
    });

    it("should return empty array if no modules found by power", async () => {
      modules = new Modules();

      const response = await modules.findAllByPower(0);
      expect(response).toHaveLength(0);
    });

    it("should return empty array if no modules found by type", async () => {
      modules = new Modules();

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const response = await modules.findAllByType("invalid-type");
      expect(response).toHaveLength(0);
    });

    it("should return empty array if no modules found by producer", async () => {
      modules = new Modules();

      const response = await modules.findAllByProducer("invalid-producer");
      expect(response).toHaveLength(0);
    });

    it("should return null if module not found by name", async () => {
      modules = new Modules();

      const response = await modules.findByName("invalid-name");
      expect(response).toBeNull();
    });
  });
});

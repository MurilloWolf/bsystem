import Material from "../material";
import mockMaterials from "../mock/material.table";

describe("DB Memory - Mareial", () => {
  let dbMaterial = new Material([]);

  it("Should create a new part", async () => {
    const newMaterial = {
      id: "X",
      name: "Part 1",
      category: "Category 1",
      description: "Description 1",
      price: 100,
      powerRange: "normal",
      image: "image.jpg",
    };

    dbMaterial = new Material([]);

    const response = await dbMaterial.create(newMaterial);
    expect(response).toStrictEqual(newMaterial);
  });

  it("Should return all parts", async () => {
    dbMaterial = new Material();
    const response = await dbMaterial.findAll();
    expect(response).toStrictEqual(mockMaterials);
    expect(response.length).toBe(mockMaterials.length);
  });

  it("Should return a part by id", async () => {
    dbMaterial = new Material();
    const response = await dbMaterial.findById("1");
    expect(response).toStrictEqual(mockMaterials[0]);
  });

  it("Should return all parts by category", async () => {
    dbMaterial = new Material();
    const response = await dbMaterial.findAllByCategory("cabos");
    expect(response.length).toBe(4);
  });

  it("Should return all categories", async () => {
    dbMaterial = new Material();
    const response = await dbMaterial.getAllCategories();
    expect(response).toEqual(["cabos", ""]);
  });

  it("Should return a part by name", async () => {
    dbMaterial = new Material();
    const response = await dbMaterial.findByName("Cabo fases 6mm");
    expect(response).toStrictEqual(mockMaterials[0]);
  });

  it("Should return all parts by category", async () => {
    dbMaterial = new Material();
    const response = await dbMaterial.findByCategory("cabos");
    expect(response.length).toBe(4);
  });

  it("Should update a part", async () => {
    dbMaterial = new Material();
    const material = {
      id: "1",
      name: "Cabo fases 6mm",
      description: "Cabos de fases de 6mm",
      price: 4.6,
      category: "cabos",
      powerRange: "normal",
      image: "",
    };

    const response = await dbMaterial.update(material);
    expect(response).toStrictEqual(material);
  });

  it("Should delete a part", async () => {
    dbMaterial = new Material();
    const response = await dbMaterial.delete("1");
    expect(response).toBe(true);
  });

  describe("Error cases", () => {
    it("Should return null if part not found", async () => {
      dbMaterial = new Material();
      const response = await dbMaterial.findById("100");
      expect(response).toBeNull();
    });

    it("Should return null if part not found by name", async () => {
      dbMaterial = new Material();
      const response = await dbMaterial.findByName("Part not found");
      expect(response).toBeNull();
    });

    it("Should return null if the given part already exists on create", async () => {
      dbMaterial = new Material();
      const material = {
        id: "1",
        name: "Cabo fases 6mm",
        description: "Cabos de fases de 6mm",
        price: 4.6,
        category: "cabos",
        powerRange: "normal",
        image: "",
      };

      const response = await dbMaterial.create(material);
      expect(response).toBeNull();
    });
  });
});

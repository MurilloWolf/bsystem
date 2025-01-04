import Part from "../part";
import mockParts from "../mock/part.table";

describe("DB Memory - Part", () => {
  let dbPart = new Part([]);

  beforeEach(() => {
    dbPart = new Part([]);
  });

  it("Should create a new part", async () => {
    const newPart = {
      id: "X",
      name: "Part 1",
      category: "Category 1",
      description: "Description 1",
      price: 100,
      priceRange: "normal",
      image: "image.jpg",
    };

    const response = await dbPart.create(newPart);
    expect(response).toStrictEqual(newPart);
  });

  it("Should return all parts", async () => {
    dbPart = new Part();
    const response = await dbPart.findAll();
    expect(response).toStrictEqual(mockParts);
    expect(response.length).toBe(mockParts.length);
  });

  it("Should return a part by id", async () => {
    dbPart = new Part();
    const response = await dbPart.findById("1");
    expect(response).toStrictEqual(mockParts[0]);
  });

  it("Should return all parts by category", async () => {
    dbPart = new Part();
    const response = await dbPart.findAllByCategory("cabos");
    expect(response.length).toBe(4);
  });

  it("Should return all categories", async () => {
    dbPart = new Part();
    const response = await dbPart.getAllCategories();
    expect(response).toEqual(["cabos", ""]);
  });

  it("Should return a part by name", async () => {
    dbPart = new Part();
    const response = await dbPart.findByName("Cabo fases 6mm");
    expect(response).toStrictEqual(mockParts[0]);
  });

  it("Should return all parts by category", async () => {
    dbPart = new Part();
    const response = await dbPart.findByCategory("cabos");
    expect(response.length).toBe(4);
  });

  it("Should update a part", async () => {
    dbPart = new Part();
    const part = {
      id: "1",
      name: "Cabo fases 6mm",
      description: "Cabos de fases de 6mm",
      price: 4.6,
      category: "cabos",
      priceRange: "normal",
      image: "",
    };

    const response = await dbPart.update(part);
    expect(response).toStrictEqual(part);
  });

  it("Should delete a part", async () => {
    dbPart = new Part();
    const response = await dbPart.delete("1");
    expect(response).toBe(true);
  });

  it("Should return null if part not found", async () => {
    dbPart = new Part();
    const response = await dbPart.findById("100");
    expect(response).toBeNull();
  });

  it("Should return null if part not found by name", async () => {
    dbPart = new Part();
    const response = await dbPart.findByName("Part not found");
    expect(response).toBeNull();
  });
});

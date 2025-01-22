import PartBudget from "../material-budget";

jest.spyOn(Math, "random").mockReturnValue(0.123456789);

describe("DB in Memory - Part Budget - Table NxN", () => {
  let dbPartBudget: PartBudget = new PartBudget([]);
  const mockId = "4fzzzxjyl";

  it("Should create a new part budget", async () => {
    dbPartBudget = new PartBudget([]);
    const newPartBudget = {
      budgetId: "1",
      partId: "1",
      quantity: 1,
    };

    const response = await dbPartBudget.create(newPartBudget);
    const partBudgets = await dbPartBudget.findPartsByBudgetId(
      newPartBudget.budgetId
    );

    expect(response).toEqual({ ...newPartBudget, id: mockId });
    expect(partBudgets).toHaveLength(1);
  });

  it("Should find a part budget by id", async () => {
    dbPartBudget = new PartBudget();
    const partBudget = await dbPartBudget.findById("2");

    expect(partBudget).toEqual({
      budgetId: "1",
      partId: "2",
      quantity: 1,
      id: "2",
    });
  });

  it("Should find all parts by budget id", async () => {
    dbPartBudget = new PartBudget();
    const partBudgets = await dbPartBudget.findPartsByBudgetId("1");

    expect(partBudgets).toHaveLength(2);
  });

  it("Should update a part budget", async () => {
    dbPartBudget = new PartBudget();
    const partBudget = await dbPartBudget.findById("2");

    if (!partBudget) return;
    partBudget.quantity = 2;

    const response = await dbPartBudget.update(partBudget);

    expect(response).toEqual(partBudget);
  });

  it("Should change the quantity of a part budget", async () => {
    dbPartBudget = new PartBudget();
    const partBudget = await dbPartBudget.findById("2");

    if (!partBudget) return;
    const response = await dbPartBudget.changeQuantity(partBudget.id, 3);

    expect(response).toEqual({ ...partBudget, quantity: 3 });
  });

  it("Should delete a part budget", async () => {
    dbPartBudget = new PartBudget();
    const response = await dbPartBudget.delete("2");
    const partBudget = await dbPartBudget.findById("2");

    expect(response).toBeTruthy();
    expect(partBudget).toBeNull();
  });

  describe("Error cases", () => {
    it("Should return null if the part budget does not exist", async () => {
      dbPartBudget = new PartBudget();
      const partBudget = await dbPartBudget.findById("X");

      expect(partBudget).toBeNull();
    });

    it("Should return an empty array if the part budget does not exist", async () => {
      dbPartBudget = new PartBudget();
      const partBudgets = await dbPartBudget.findPartsByBudgetId("X");

      expect(partBudgets).toHaveLength(0);
    });

    it("Should return null if the part budget does not exist", async () => {
      dbPartBudget = new PartBudget();
      const partBudget = await dbPartBudget.changeQuantity("X", 1);

      expect(partBudget).toBeNull();
    });

    it("Should return false if the part budget does not exist", async () => {
      dbPartBudget = new PartBudget();
      const response = await dbPartBudget.delete("X");

      expect(response).toBeFalsy();
    });

    it("Should return null if the part does not exist", async () => {
      dbPartBudget = new PartBudget();
      const newPartBudget = {
        budgetId: "1",
        partId: "X",
        quantity: 1,
      };

      const response = await dbPartBudget.create(newPartBudget);

      expect(response).toBeNull();
    });
  });
});

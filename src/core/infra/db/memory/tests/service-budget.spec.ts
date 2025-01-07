import ServiceBudget from "../service-buget";

jest.spyOn(Math, "random").mockReturnValue(0.123456789);

describe("DB in Memory - Service Budget - NxN Table", () => {
  let dbServiceBudget: ServiceBudget = new ServiceBudget([]);
  const mockId = "4fzzzxjyl";

  it("Should create a new service budget", async () => {
    dbServiceBudget = new ServiceBudget([]);
    const serviceBudget = await dbServiceBudget.create({
      budgetId: "1",
      serviceId: "1",
      quantity: 1,
    });
    expect(serviceBudget).toEqual({
      budgetId: "1",
      id: mockId,
      quantity: 1,
      serviceId: "1",
    });
  });

  it("Should find a service budget by id", async () => {
    dbServiceBudget = new ServiceBudget();
    const serviceBudget = await dbServiceBudget.findServicesByBudgetId("2");
    expect(serviceBudget).toHaveLength(1);
  });

  it("Should update a service budget", async () => {
    dbServiceBudget = new ServiceBudget();
    const serviceBudget = await dbServiceBudget.update({
      budgetId: "1",
      id: "1",
      quantity: 2,
      serviceId: "1",
    });
    expect(serviceBudget).toEqual({
      budgetId: "1",
      id: "1",
      quantity: 2,
      serviceId: "1",
    });
  });

  it("Should delete a service budget", async () => {
    dbServiceBudget = new ServiceBudget();
    const serviceBudget = await dbServiceBudget.delete("1");
    expect(serviceBudget).toBeTruthy();
  });

  it("Should change the quantity of a service budget", async () => {
    dbServiceBudget = new ServiceBudget();
    const serviceBudget = await dbServiceBudget.changeQuantity("1", 3);
    expect(serviceBudget).toEqual({
      budgetId: "1",
      id: "1",
      quantity: 3,
      serviceId: "1",
    });
  });

  describe("Error cases", () => {
    it("Should not create a new service budget if the service does not exist", async () => {
      dbServiceBudget = new ServiceBudget();
      const serviceBudget = await dbServiceBudget.create({
        budgetId: "1",
        serviceId: "4",
        quantity: 1,
      });
      expect(serviceBudget).toBeNull();
    });

    it("Should not create a new service budget if the service budget already exists", async () => {
      dbServiceBudget = new ServiceBudget();
      const serviceBudget = await dbServiceBudget.create({
        budgetId: "1",
        serviceId: "1",
        quantity: 1,
      });
      expect(serviceBudget).toBeNull();
    });

    it("Should not update a service budget if it does not exist", async () => {
      dbServiceBudget = new ServiceBudget();
      const serviceBudget = await dbServiceBudget.update({
        budgetId: "1",
        id: "4",
        quantity: 2,
        serviceId: "X",
      });
      expect(serviceBudget).toBeNull();
    });

    it("Should not delete a service budget if it does not exist", async () => {
      dbServiceBudget = new ServiceBudget();
      const serviceBudget = await dbServiceBudget.delete("4");
      expect(serviceBudget).toBeFalsy();
    });

    it("Should not change the quantity of a service budget if it does not exist", async () => {
      dbServiceBudget = new ServiceBudget();
      const serviceBudget = await dbServiceBudget.changeQuantity("4", 3);
      expect(serviceBudget).toBeNull();
    });
  });
});

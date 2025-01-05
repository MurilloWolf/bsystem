import Panel from "../panel";
import mockPanel from "../mock/panel.table";

describe("DB Memory - Panel", () => {
  let dbPanel: Panel = new Panel([]);

  it("Should create a new panel", async () => {
    dbPanel = new Panel([]);
    const newPanel = {
      id: "1",
      model: "Panel 1",
      power: 100,
      voltage: 100,
      description: "Panel 1 description",
      price: 1000,
      producer: "Producer 1",
    };

    const response = await dbPanel.create(newPanel);
    const panels = await dbPanel.findAll();

    expect(response).toEqual(newPanel);
    expect(panels).toHaveLength(1);
  });

  it("Should find all panels", async () => {
    dbPanel = new Panel();
    const panels = await dbPanel.findAll();

    expect(panels).toHaveLength(mockPanel.length);
  });

  it("Should find a panel by id", async () => {
    dbPanel = new Panel();
    const panel = await dbPanel.findById("1");

    expect(panel).toEqual(mockPanel[0]);
  });

  it("Should find all panels by power", async () => {
    dbPanel = new Panel();
    const panel = await dbPanel.findAllByPower(1.8);

    expect(panel).toHaveLength(1);
    expect(panel[0]).toStrictEqual(mockPanel[84]);
  });

  it("Should find all panels by voltage", async () => {
    dbPanel = new Panel();
    const panels = await dbPanel.findAllByVoltage(220);

    expect(panels).toHaveLength(90);
  });

  it("Should find a panel by name", async () => {
    dbPanel = new Panel();
    const panel = await dbPanel.findByName("Canadian Solar 5kW 220V");

    expect(panel).toStrictEqual(mockPanel[0]);
  });

  it("Should update a panel", async () => {
    dbPanel = new Panel();
    const panel = {
      id: "1",
      model: "Panel 1",
      power: 100,
      voltage: 100,
      description: "Panel 1 description",
      price: 1000,
      producer: "Producer 1",
    };

    const response = await dbPanel.update(panel);
    const updatedPanel = await dbPanel.findById("1");

    expect(response).toEqual(panel);
    expect(updatedPanel).toEqual(panel);
  });

  it("Should delete a panel", async () => {
    dbPanel = new Panel();
    const response = await dbPanel.delete("1");
    const panels = await dbPanel.findAll();

    expect(response).toBeTruthy();
    expect(panels).toHaveLength(mockPanel.length - 1);
  });

  describe("Error cases", () => {
    it("Should return false if the panel does not exist", async () => {
      dbPanel = new Panel();
      const response = await dbPanel.delete("X");

      expect(response).toBeFalsy();
    });

    it("Should return null if the panel does not exist", async () => {
      dbPanel = new Panel();
      const panel = await dbPanel.findById("X");

      expect(panel).toBeNull();
    });

    it("Should return null if the panel does not exist", async () => {
      dbPanel = new Panel();
      const panel = await dbPanel.findByName("X");

      expect(panel).toBeNull();
    });
  });
});

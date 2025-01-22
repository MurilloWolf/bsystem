export type ModuleModel = {
  id: string;
  model: string;
  description: string;
  price: number;
  power: number;
  type: "mono" | "bifacial" | "poly";
  producer: string;
};

export type ModuleModel = {
  id: string;
  name: string;
  description: string;
  price: number;
  power: number;
  type: "mono" | "bifacial" | "poly";
  producer: string;
};
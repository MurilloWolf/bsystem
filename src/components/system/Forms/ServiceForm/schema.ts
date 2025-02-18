import * as zod from "zod";

export const ServiceFormSchema = zod.object({
  id: zod.string().optional(),
  name: zod.string(),
  description: zod.string(),
  price: zod.number(),
  category: zod.string().optional(),
});

export const ServiceFormDefaultValues = {
  id: "",
  name: "",
  description: "",
  price: 0,
  category: "",
};

export const fieldsTranslation = [
  { key: "name", translation: "Nome" },
  { key: "description", translation: "Descrição" },
  { key: "price", translation: "Preço" },
  { key: "category", translation: "Categoria" },
];

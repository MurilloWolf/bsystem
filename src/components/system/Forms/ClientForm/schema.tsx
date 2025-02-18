import * as zod from "zod";

export const ClientFormSchema = zod.object({
  name: zod.string(),
  email: zod.string().email(),
  phone: zod.string(),
  address: zod.string(),
  neighborhood: zod.string(),
  city: zod.string(),
  state: zod.string(),
  zip: zod.string(),
  uf: zod.string(),
});

export const ClientFormDefaultValues = {
  name: "",
  email: "",
  phone: "",
  address: "",
  neighborhood: "",
  city: "",
  state: "",
  zip: "",
  uf: "",
};

export const fieldsTranslation = [
  { key: "name", translation: "Nome" },
  { key: "email", translation: "Email" },
  { key: "phone", translation: "Telefone" },
  { key: "zip", translation: "CEP" },
  { key: "address", translation: "Endereço" },
  { key: "neighborhood", translation: "Bairro" },
  { key: "city", translation: "Cidade" },
  { key: "uf", translation: "Estado" },
];

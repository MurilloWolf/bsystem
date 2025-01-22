export type ClientModel = {
  id: string;
  userId: string;
  name: string;
  email: string;
  document: string; // CPF or CNPJ
  phone: string;
  zipCode: string;
  city: string;
  uf: string;
  neighborhood: string;
  birthDate: Date;
};

export type CreateClientDTO = {
  name: string;
  email: string;
  phone: string;
  zipCode: string;
  city: string;
  uf: string;
  neighborhood: string;
  document: string;
  userId: string;
  birthDate: Date;
};

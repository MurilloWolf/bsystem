export type UserModel = {
  id: string;
  name: string;
  email: string;
  password: string;
  cpf: string;
  phone: string;
  zipCode: string;
  birthdate: Date;
  type: "user" | "company" | string; // user or company
  companyId: string | null; // user_id from company
  companyName: string | null;
  role: string[];
};

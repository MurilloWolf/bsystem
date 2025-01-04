import { ServiceModel } from "@/core/model/service.model";

const service: ServiceModel[] = [
  {
    id: "1",
    name: "Desenvolvimento Web",
    description: "Criação de sites e aplicações web responsivas e funcionais.",
    price: 2000,
    category: "Desenvolvimento",
  },
  {
    id: "2",
    name: "Consultoria em Marketing Digital",
    description:
      "Estratégias de marketing para aumentar a visibilidade e vendas online.",
    price: 1500,
    category: "Consultoria",
  },
  {
    id: "3",
    name: "Suporte Técnico",
    description:
      "Atendimento especializado para resolução de problemas de TI e manutenção de sistemas.",
    price: 100,
    category: "Suporte",
  },
  {
    id: "4",
    name: "Design Gráfico",
    description:
      "Criação de logos, materiais publicitários e identidade visual.",
    price: 1200,
    category: "Design",
  },
  {
    id: "5",
    name: "Desenvolvimento de Aplicativos Móveis",
    description: "Desenvolvimento de aplicativos móveis para Android e iOS.",
    price: 3500,
    category: "Desenvolvimento",
  },
  {
    id: "6",
    name: "Consultoria Jurídica",
    description:
      "Consultoria e assessoria jurídica para empresas e pessoas físicas.",
    price: 2500,
    category: "Consultoria",
  },
];
export const serviceBudget: ServiceModel[] = [];

export default service;

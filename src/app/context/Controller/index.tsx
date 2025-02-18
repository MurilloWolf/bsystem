import IClientRepository from "@/core/repository/client.repository";
import MemoryClient from "@/core/infra/db/memory/client";
import MemoryModules from "@/core/infra/db/memory/modules";
import MemoryPanels from "@/core/infra/db/memory/panel";
import MemoryMaterial from "@/core/infra/db/memory/material";
import MemoryService from "@/core/infra/db/memory/service";

import { createContext, useContext } from "react";

import IModulesRepository from "@/core/repository/modules.repository";
import IPanelRepository from "@/core/repository/panel.repository";
import IMaterialRepository from "@/core/repository/material.repository";
import IServiceRepository from "@/core/repository/service.repository";

type ControllerProviderProps = {
  children: React.ReactNode;
};

interface ControllerContextType {
  ClientRepository: IClientRepository;
  ModulesRepository: IModulesRepository;
  PanelsRepository: IPanelRepository;
  MaterialRepository: IMaterialRepository;
  ServiceRepository: IServiceRepository;
}

export const ControllerContext = createContext<ControllerContextType>({
  ClientRepository: new MemoryClient(),
  ModulesRepository: new MemoryModules(),
  PanelsRepository: new MemoryPanels(),
  MaterialRepository: new MemoryMaterial(),
  ServiceRepository: new MemoryService(),
});

export default function ControllerProvider(props: ControllerProviderProps) {
  const { children } = props;
  const ClientRepository = new MemoryClient();
  const ModulesRepository = new MemoryModules();
  const PanelsRepository = new MemoryPanels();
  const MaterialRepository = new MemoryMaterial();
  const ServiceRepository = new MemoryService();

  const controllerContextValue = {
    ClientRepository,
    ModulesRepository,
    PanelsRepository,
    MaterialRepository,
    ServiceRepository,
  };

  return (
    <ControllerContext.Provider value={controllerContextValue}>
      {children}
    </ControllerContext.Provider>
  );
}

export function useControllerContext() {
  const context = useContext(ControllerContext);
  if (!context) {
    throw new Error(
      "useControllerContext must be used within a ControllerProvider"
    );
  }
  return context;
}

import * as zod from "zod";
import { ModuleFormDefaultValues, ModuleFormSchema } from "./ModuleFormSchema";
import { PanelFormDefaultValues, PanelFormSchema } from "./PanelFormSchema";

export const ProjectSchema = zod.object({
  module: ModuleFormSchema,
  panel: PanelFormSchema,
});

export const ProjectFormDefaultValues = {
  module: ModuleFormDefaultValues,
  panel: PanelFormDefaultValues,
};

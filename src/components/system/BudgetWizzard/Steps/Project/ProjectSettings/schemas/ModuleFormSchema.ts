import * as zod from "zod";

export const ModuleFormSchema = zod.object({
  producer: zod.string().nonempty(),
  model: zod.string().nonempty(),
  power: zod.string().nonempty(),
  type: zod.string().nonempty(),
  systemType: zod.string().nonempty(),
});

export const ModuleFormDefaultValues = {
  producer: "Todos",
  model: "",
  power: "",
  systemType: "",
  type: "",
};

import * as zod from "zod";

export const PanelFormSchema = zod.object({
  producer: zod.string().nonempty(),
  model: zod.string().nonempty(),
  power: zod.number().nonnegative(),
  voltage: zod.number().nonnegative(),
  type: zod.string().nonempty(),
  quantity: zod.number().nonnegative(),
  trafo: zod.boolean(),
});

export const PanelFormDefaultValues = {
  producer: "",
  model: "",
  power: 0,
  voltage: 0,
  type: "",
  quantity: 0,
  trafo: false,
};

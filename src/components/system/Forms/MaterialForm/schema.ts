import * as zod from "zod";

export const MaterialFormSchema = zod.object({
  name: zod.string().nonempty(),
  price: zod.number().nonnegative(),
  description: zod.string(),
});

export const MaterialFormDefaultValues = {
  name: "",
  price: 0,
  description: "",
};

import * as zod from "zod";

export const ConsumptionCalculatorSchema = zod.object({
  january: zod.number().min(0),
  february: zod.number().min(0),
  march: zod.number().min(0),
  april: zod.number().min(0),
  may: zod.number().min(0),
  june: zod.number().min(0),
  july: zod.number().min(0),
  august: zod.number().min(0),
  september: zod.number().min(0),
  october: zod.number().min(0),
  november: zod.number().min(0),
  december: zod.number().min(0),
});

export const ConsumptionCalculatorDefualtValues = {
  january: 0,
  february: 0,
  march: 0,
  april: 0,
  may: 0,
  june: 0,
  july: 0,
  august: 0,
  september: 0,
  october: 0,
  november: 0,
  december: 0,
};

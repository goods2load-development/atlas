import { z } from 'zod';

const schemaChart = z.object({
  label: z.string(),
  value: z.string(),
});

export const formSchema = z
  .object({
    name: z.string().nonempty('Name is required'),
    description: z.string().nonempty('Description is required'),
    mission: z.string().nonempty('Mission is required'),
    airFreight: z.string().nonempty('Air Freight is required'),
    seaFreight: z.string().nonempty('Sea Freight is required'),
    roadFreight: z.string().nonempty('Road Freight is required'),
    focus: z.array(schemaChart).nonempty('At least one focus item is required'),
    industries: z
      .array(schemaChart)
      .nonempty('At least one industry item is required'),
    missions: z
      .array(
        z.object({
          label: z.string(),
        }),
      )
      .nonempty('At least one mission item is required'),
    placementId: z.string().nonempty('Place ID is required'),
    awardedBy: z.union([
      z.string(),
      z
        .unknown()
        .transform((value) => value as FileList)
        .refine((files) => files?.length >= 1, 'You need to provide a file'),
    ]),
  })
  .refine(
    (data) => {
      const total =
        Number(data.airFreight) +
        Number(data.seaFreight) +
        Number(data.roadFreight);

      return total === 100;
    },
    {
      message:
        'The sum of Air Freight, Sea Freight, and Road freight must be 100%',
    },
  )
  .refine(
    (data) => {
      const total = data.industries.reduce((sum, item) => +item.value + sum, 0);

      return total === 100;
    },
    {
      message: 'The sum of industries fields must be 100%',
    },
  )
  .refine(
    (data) => {
      const total = data.focus.reduce((sum, item) => +item.value + sum, 0);

      return total === 100;
    },
    {
      message: 'The sum of Focus fields must be 100%',
    },
  );

import { yup, validateYupSchema } from '@resillix/utils';

const settingsSchema = yup.object({
  aiLocalizations: yup.boolean().default(false),
});

export default validateYupSchema(settingsSchema);

export type Settings = yup.InferType<typeof settingsSchema>;

import { yup, validateYupSchema } from '@resillix/utils';
import validators from '../common-validators';

const forgotPasswordSchema = yup
  .object()
  .shape({
    email: validators.email.required(),
  })
  .required()
  .noUnknown();

export default validateYupSchema(forgotPasswordSchema);

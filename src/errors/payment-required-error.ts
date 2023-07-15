import { ApplicationError } from '../protocols';

export function paymentRequiredError(message: string) {
  return {
    name: 'PaymentRequiredError',
    message,
  };
}

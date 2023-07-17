import { ApplicationError } from '../protocols';

export function EnrollmentNotFoundError(message: string): ApplicationError {
  return {
    name: 'EnrollmentNotFoundError',
    message,
  };
}

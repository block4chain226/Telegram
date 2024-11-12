import { ValidateBy, ValidationArguments } from 'class-validator';

export const Is_PhoneOrUUID = 'validatePhoneOrUUID';

/**
 * Checks if value is a valid password.
 */
function validatePhoneOrUUID(args: ValidationArguments): boolean {
  const property = args.value;
  console.log('=>(validate-operands-length.decorator.ts:11) property', property);
  switch (property) {

  }
  return true;
}

/**
 * Checks if value is an valid password.
 */
export function ValidatePhoneOrUUID(): PropertyDecorator {
  return ValidateBy(
    {
      name: Is_PhoneOrUUID,
      validator: {
        validate: (value, args): boolean => validatePhoneOrUUID(args),
        defaultMessage: () => 'Operands length is not according to filter operator',
      },
    },
  );
}
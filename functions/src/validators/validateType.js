const validateType = (value, type, variableName) => {
  if (typeof value !== type) {
    throw new Error(`${variableName} must be ${type}`);
  }
};

export default validateType;

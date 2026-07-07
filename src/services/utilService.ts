export const validateCreditCardNumber = (cardNumber: string | number) => {
  // test: 4012888888881881
  // orig: 4375517833960000
  console.log(cardNumber)
}

export const stringToSlug = (str: string) => {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "-");
};

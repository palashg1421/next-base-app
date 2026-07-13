export const validateCreditCardNumber = (cardNumber: string | number) => {
  if (cardNumber.toString().length !== 16) {
    return false;
  }
  const salted = [...cardNumber.toString()].map((digit, index) => (index % 2 === 0 ? Number(digit) * 2 : digit)).join("");
  const sum = [...salted].reduce((acc, digit) => acc + Number(digit), 0);
  return !(sum % 10);
}

export const stringToSlug = (str: string) => {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "-");
};

export const removeScriptTag = (str: string) => {
  return str.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
}

export function validatePhoneNumber(phone: string) {
  // only digits
  phone = phone.replace(/\D/g, "");
  // only normal 10 digit USA phones numbers
  return phone.trim().length === 10;
}
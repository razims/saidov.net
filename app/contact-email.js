const CONTACT_EMAIL_CODE_POINTS = [
  114, 97, 122, 105, 109, 64, 115, 97, 105, 100, 111, 118, 46, 110, 101, 116
];

export function getContactEmail() {
  return String.fromCodePoint(...CONTACT_EMAIL_CODE_POINTS);
}

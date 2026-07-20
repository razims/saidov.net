const CONTACT_EMAIL_CODE_POINTS = [
  105, 110, 98, 111, 120, 64, 115, 97, 105, 100, 111, 118, 46, 110, 101, 116
];

export function getContactEmail() {
  return String.fromCodePoint(...CONTACT_EMAIL_CODE_POINTS);
}

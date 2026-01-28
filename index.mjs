export function makeFetchRequest() {
  return fetch("https://example.com/test");
}

export function invalidUserNameRequest() {
  return fetch("https://www.codewars.com/api/v1/users/invalidUserName");
}

export function emptyUserNameRequest() {
  return fetch("https://www.codewars.com/api/v1/users/ ");
}

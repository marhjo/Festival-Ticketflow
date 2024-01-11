export const baseUrl = "https://fe-fi-foofest.glitch.me";

// Fetches an url with fetch and returns the json response
// Takes a json input and stringifies it
export const jsonFetch = async (url, options) => {
  options ??= {};
  options.headers ??= {};

  // Remember to set content type, otherwise the server won't understand the body
  options.headers["Content-Type"] = "application/json";

  options.body = JSON.stringify(options.body);

  const response = await fetch(url, options);
  const json = await response.json();

  return json;
};

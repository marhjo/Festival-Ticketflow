export const baseUrl = "https://fe-fi-foofest.glitch.me";

export const jsonFetch = async (url, options) => {
  options ??= {};
  options.headers ??= {};

  options.headers["Content-Type"] = "application/json";

  options.body = JSON.stringify(options.body);

  const response = await fetch(url, options);
  const json = await response.json();

  return json;
};

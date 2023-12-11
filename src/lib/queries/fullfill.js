import { baseUrl, jsonFetch } from ".";

export const fullfill = async (id) =>
  await jsonFetch(`${baseUrl}/fullfill-reservation`, {
    method: "POST",
    body: {
      id,
    },
  });

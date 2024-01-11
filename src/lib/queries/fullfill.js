import { baseUrl, jsonFetch } from ".";

// Does a fullfillment of a reservation
export const fullfill = async (id) =>
  await jsonFetch(`${baseUrl}/fullfill-reservation`, {
    method: "POST",
    body: {
      id,
    },
  });

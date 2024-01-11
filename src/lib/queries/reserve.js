import { baseUrl, jsonFetch } from ".";

// Reserve a spot in an area
export const reserve = async (area, amount) =>
  await jsonFetch(`${baseUrl}/reserve-spot`, {
    method: "PUT",
    body: {
      area,
      amount,
    },
  });

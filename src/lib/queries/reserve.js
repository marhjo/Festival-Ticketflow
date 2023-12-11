import { baseUrl, jsonFetch } from ".";

export const reserve = async (area, amount) =>
  await jsonFetch(`${baseUrl}/reserve-spot`, {
    method: "PUT",
    body: {
      area,
      amount,
    },
  });

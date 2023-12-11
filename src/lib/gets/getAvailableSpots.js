import { createQuery } from "@tanstack/solid-query";
import { baseUrl, getQueryClient } from ".";

export const getAvailableSpots = () =>
  createQuery(
    () => ({
      queryKey: ["getAvailableSpots"],
      queryFn: async () => {
        const response = await fetch(`${baseUrl}/available-spots`);
        return await response.json();
      },
      refetchInterval: 10000,
      refetchOnWindowFocus: true,
    }),
    getQueryClient,
  );

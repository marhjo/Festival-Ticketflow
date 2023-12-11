import { createQuery } from "@/lib/query";
import { baseUrl } from ".";

export const getAvailableSpots = () =>
  createQuery({
    key: () => ["getAvailableSpots"],
    refetch: () => 10000,
    fn: async () => {
      const response = await fetch(`${baseUrl}/available-spots`);
      return await response.json();
    },
  });

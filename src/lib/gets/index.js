import { QueryClient } from "@tanstack/solid-query";

export const baseUrl = "https://fe-fi-foofest.glitch.me";

export const queryClient = new QueryClient();

export const getQueryClient = () => queryClient;

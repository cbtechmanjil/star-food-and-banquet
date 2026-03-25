import { useQuery } from "@tanstack/react-query";

export interface ContactSettings {
  address: string;
  phone: string;
  email: string;
  workingHours: string;
}

export const useContactSettings = () => {
  return useQuery<ContactSettings>({
    queryKey: ['contactSettings'],
    queryFn: async () => {
      const res = await fetch("/api/settings/contact");
      const json = await res.json();
      return json.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

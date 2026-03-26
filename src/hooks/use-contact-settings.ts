import { useQuery } from "@tanstack/react-query";
import { apiGet } from "@/lib/api";

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
      const data = await apiGet("/settings/contact");
      return data.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

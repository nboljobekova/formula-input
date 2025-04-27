import { inputService } from "@/services/input.service";
import { useQuery } from "@tanstack/react-query";

export function useGetSuggestionsList() {
  const { data, isLoading } = useQuery({
    queryKey: ["get-list"],
    queryFn: () => inputService.getList(),
  });

  return { data, isLoading };
}

import { getSettings } from "@/services/apiSettings";
import { useQuery } from "@tanstack/react-query";

function useSettings() {
    const {
        data: settings,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["settings"],
        queryFn: getSettings,
    });

    return {
        settings,
        isLoading,
        error,
    };
}

export default useSettings;

import { Cabin } from "@/types";

import { useQuery } from "@tanstack/react-query";
import { getCabins } from "@/services/apiCabins";

type UseCabinsType = {
    isLoading: boolean;
    data: Array<Cabin> | undefined;
    error: string | null;
};

function useCabins() {
    const {
        isLoading,
        data: cabins,
        error,
    }: UseCabinsType = useQuery({
        queryKey: ["cabins"],
        queryFn: getCabins,
    });

    return { isLoading, cabins, error };
}

export default useCabins;

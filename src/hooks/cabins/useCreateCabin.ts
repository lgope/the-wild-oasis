import { createEditCabin } from "@/services/apiCabins";
import { Cabin } from "@/types";
import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useCreateCabin() {
    const queryClient = useQueryClient();

    const { mutate, isLoading } = useMutation({
        mutationFn: (newCabinData: Cabin) => createEditCabin(newCabinData),
        onSuccess: () => {
            toast.success("New cabin successfully created");
            queryClient.invalidateQueries({ queryKey: ["cabins"] });
        },
        onError: (err: { message: string }) => toast.error(err.message),
    });

    return {
        createCabin: mutate,
        isCreating: isLoading,
    };
}

export default useCreateCabin;

import { createEditCabin } from "@/services/apiCabins";
import { Cabin } from "@/types";
import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useEditCabin() {
    const queryClient = useQueryClient();

    const { mutate, isLoading } = useMutation({
        mutationFn: ({
            cabinData,
            cabinId,
        }: {
            cabinData: Cabin;
            cabinId: number;
        }) => createEditCabin(cabinData, cabinId),
        onSuccess: () => {
            toast.success("Cabin successfully edited");
            queryClient.invalidateQueries({ queryKey: ["cabins"] });
        },
        onError: (err: { message: string }) => toast.error(err.message),
    });

    return {
        editCabin: mutate,
        isEditing: isLoading,
    };
}

export default useEditCabin;

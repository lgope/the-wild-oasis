import { deleteCabin } from "@/services/apiCabins";
import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useDeleteCabin() {
    const queryClient = useQueryClient();
    const { mutate, isLoading } = useMutation({
        mutationFn: (id: number) => deleteCabin(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cabins"] });
            toast.success("Cabin deleted successfully");
        },
        onError: (error: { message: string }) => {
            toast.error(error.message);
        },
    });

    return {
        deleteCabin: mutate,
        isDeleting: isLoading,
    };
}

export default useDeleteCabin;

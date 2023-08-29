import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateCurrentUser } from "@/services/apiAuth";

export default function useUpdateUser() {
    const queryClient = useQueryClient();

    const { mutate: updateUser, isLoading: isUpdating } = useMutation({
        mutationFn: updateCurrentUser,
        onSuccess: ({ user }) => {
            toast.success("User account successfully updated");
            queryClient.setQueryData(["user"], user);
        },
        onError: (err: any) => toast.error(err.message),
    });

    return { updateUser, isUpdating };
}

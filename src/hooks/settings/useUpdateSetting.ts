import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

function useUpdateSetting() {
    const queryClient = useQueryClient();

    const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
        mutationFn: updateSettingApi,
        onSuccess: () => {
            toast.success("Setting successfully edited");
            queryClient.invalidateQueries({ queryKey: ["settings"] });
        },
        onError: (err: { message: string }) => toast.error(err.message),
    });

    return { isUpdating, updateSetting };
}
export default useUpdateSetting;

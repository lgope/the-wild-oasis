import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { useLogout } from "@/hooks/authentication";

import { ButtonIcon, SpinnerMini } from "@/components/ui";

function Logout() {
    const { logout, isLoading } = useLogout();

    return (
        <ButtonIcon disabled={isLoading} onClick={() => logout()}>
            {!isLoading ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
        </ButtonIcon>
    );
}

export default Logout;

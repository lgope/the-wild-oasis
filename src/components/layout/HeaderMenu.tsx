import styled from "styled-components";
import { HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { ButtonIcon } from "@/components/ui";
import { DarkModeToggle } from "@/components/utils";
import { Logout } from "@/features/authentication";

const StyledHeaderMenu = styled.ul`
    display: flex;
    gap: 0.4rem;
`;

function HeaderMenu() {
    const navigate = useNavigate();

    return (
        <StyledHeaderMenu>
            <li>
                <ButtonIcon onClick={() => navigate("/account")}>
                    <HiOutlineUser />
                </ButtonIcon>
            </li>
            <li>
                <DarkModeToggle />
            </li>
            <li>
                <Logout />
            </li>
        </StyledHeaderMenu>
    );
}

export default HeaderMenu;

import styled from "styled-components";

import { Logo, MainNav } from "@/components/ui";
import Uploader from "@/data/Uploader";
const StyledSidebar = styled.aside`
    background-color: var(--color-grey-0);
    grid-row: 1/-1;
    border-right: 1px solid var(--color-grey-100);
    padding: 3.25rem 2.5rem;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    overflow-y: auto;
`;

function Sidebar() {
    return (
        <StyledSidebar>
            <Logo />
            <MainNav />
            <Uploader />
        </StyledSidebar>
    );
}

export default Sidebar;

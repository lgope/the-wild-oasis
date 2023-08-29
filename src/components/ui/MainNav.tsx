/* MODULE IMPORTS */
import styled from "styled-components";

/* ICON IMPORTS */
import {
    HiOutlineCalendarDays,
    HiOutlineCog6Tooth,
    HiOutlineHome,
    HiOutlineHomeModern,
    HiOutlineUsers,
} from "react-icons/hi2";

/* COMPONENT IMPORTS */
import NavListItem from "./NavListItem";

const NavList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
`;

const NAV_LIST_DATA = [
    {
        to: "/dashboard",
        icon: <HiOutlineHome />,
        label: "Home",
    },
    {
        to: "/bookings",
        icon: <HiOutlineCalendarDays />,
        label: "Bookings",
    },
    {
        to: "/cabins",
        icon: <HiOutlineHomeModern />,
        label: "Cabins",
    },
    {
        to: "/users",
        icon: <HiOutlineUsers />,
        label: "Users",
    },
    {
        to: "/settings",
        icon: <HiOutlineCog6Tooth />,
        label: "Settings",
    },
];

function MainNav() {
    return (
        <nav>
            <NavList>
                {NAV_LIST_DATA.map((item) => (
                    <NavListItem
                        key={item.to}
                        to={item.to}
                        icon={item.icon}
                        label={item.label}
                    />
                ))}
            </NavList>
        </nav>
    );
}

export default MainNav;

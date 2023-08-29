import styled from "styled-components";

import { Spinner } from "@/components/ui";

import { useRecentBookings, useRecentStays } from "@/hooks/bookings";
import { useCabins } from "@/hooks/cabins";

import Statistics from "./Statistics";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";

import { TodayActivity } from "../check-in-out";

const StyledDashboardLayout = styled.div`
    margin: 2.5rem auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto 34rem auto;
    gap: 2.4rem;
`;

function DashboardLayout() {
    const { bookings, isLoading: isLoading1 } = useRecentBookings();
    const { confirmedStays, isLoading: isLoading2, numDays } = useRecentStays();
    const { cabins, isLoading: isLoading3 } = useCabins();

    if (isLoading1 || isLoading2 || isLoading3) return <Spinner />;

    return (
        <StyledDashboardLayout>
            <Statistics
                bookings={bookings}
                confirmedStays={confirmedStays}
                numDays={numDays}
                cabinCount={cabins?.length}
            />
            <TodayActivity />
            <DurationChart confirmedStays={confirmedStays} />
            <SalesChart bookings={bookings} numDays={numDays} />
        </StyledDashboardLayout>
    );
}

export default DashboardLayout;

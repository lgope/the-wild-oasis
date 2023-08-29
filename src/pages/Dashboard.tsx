// import DashboardLayout from "../features/dashboard/DashboardLayout";
import { Row } from "@/components/layout";
import { Heading } from "@/components/typography";
import { DashboardFilter, DashboardLayout } from "@/features/dashboard";

function Dashboard() {
    return (
        <>
            <Row>
                <Heading as="h1">Dashboard</Heading>
                <DashboardFilter />
            </Row>

            <DashboardLayout />
        </>
    );
}

export default Dashboard;

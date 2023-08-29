import { Row } from "@/components/layout";
import { Heading } from "@/components/typography";
import { BookingsTable, BookingsTableOperations } from "@/features/bookings";

function Bookings() {
    return (
        <>
            <Row style={{ marginBottom: "2.5rem" }}>
                <Heading as="h1">All Bookings</Heading>
                <BookingsTableOperations />
            </Row>
            <BookingsTable />
        </>
    );
}

export default Bookings;

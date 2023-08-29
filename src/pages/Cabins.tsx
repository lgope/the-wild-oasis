import { Heading } from "@/components/typography";

import { Column, Row } from "@/components/layout";
import { CabinTable, AddCabin, CabinTableOperations } from "@/features/cabins";
function Cabins() {
    return (
        <>
            <Row style={{ marginBottom: "2.5rem" }}>
                <Heading as="h1">All cabins</Heading>
                <CabinTableOperations />
            </Row>
            <Column>
                <Column align="start">
                    <AddCabin />
                </Column>
                <CabinTable />
            </Column>
        </>
    );
}

export default Cabins;

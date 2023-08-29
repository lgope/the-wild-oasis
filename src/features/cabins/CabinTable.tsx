import { useCabins } from "@/hooks/cabins";
import { Menus, Spinner } from "@/components/ui";
import { Cabin } from "@/types";
import { CabinRow } from ".";
import { useSearchParams } from "react-router-dom";
import { Table } from "@/components/ui";

function CabinTable() {
    const { cabins, isLoading } = useCabins();
    const [searchParams] = useSearchParams();

    if (isLoading) return <Spinner />;

    // 1) FILTER
    const filterValue = searchParams.get("discount") || "all";

    let filteredCabins;
    if (filterValue === "all") filteredCabins = cabins;
    if (filterValue === "no-discount")
        filteredCabins = cabins?.filter((cabin) => cabin.discount === 0);
    if (filterValue === "with-discount")
        filteredCabins = cabins?.filter((cabin) => cabin.discount > 0);

    // 2) SORT
    const sortBy = searchParams.get("sortBy") || "startDate-asc";
    const [field, direction] = sortBy.split("-");
    const modifier = direction === "asc" ? 1 : -1;
    const sortedCabins = filteredCabins?.sort(
        (a, b) => (a[field] - b[field]) * modifier
    );

    return (
        <Menus>
            <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
                <Table.Header>
                    <div></div>
                    <div>Cabin</div>
                    <div>Capacity</div>
                    <div>Price</div>
                    <div>Discount</div>
                    <div></div>
                </Table.Header>

                <Table.Body
                    // data={cabins}
                    // data={filteredCabins}
                    data={sortedCabins}
                    render={(cabin: Cabin) => (
                        <CabinRow cabin={cabin} key={cabin.id} />
                    )}
                />
            </Table>
        </Menus>
    );
}

export default CabinTable;

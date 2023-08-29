import { useSearchParams } from "react-router-dom";
import { Select } from "@/components/form";

type SortByProps = {
    options: Array<{ value: string; label: string }>;
};

function SortBy({ options }: SortByProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const sortBy = searchParams.get("sortBy") || "";

    function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        searchParams.set("sortBy", e.target.value);
        setSearchParams(searchParams);
    }

    return (
        <Select
            options={options}
            type="white"
            value={sortBy}
            onChange={handleChange}
        />
    );
}

export default SortBy;

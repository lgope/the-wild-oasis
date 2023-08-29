import styled from "styled-components";

const StyledSelect = styled.select`
    font-size: 1.4rem;
    padding: 0.8rem 1.2rem;
    border: 1px solid
        ${(props: { type?: "white" }) =>
            props.type === "white"
                ? "var(--color-grey-100)"
                : "var(--color-grey-300)"};
    border-radius: var(--border-radius-sm);
    background-color: var(--color-grey-0);
    font-weight: 500;
    box-shadow: var(--shadow-sm);
`;

type SelectProps = {
    options: Array<{ value: string; label: string }>;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    type?: "white";
};

function Select({ options, value, onChange, ...props }: SelectProps) {
    return (
        <StyledSelect value={value} onChange={onChange} {...props}>
            {options.map((option) => (
                <option value={option.value} key={option.value}>
                    {option.label}
                </option>
            ))}
        </StyledSelect>
    );
}

export default Select;

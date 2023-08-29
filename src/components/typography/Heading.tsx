import styled, { css } from "styled-components";

const h1Styles = css`
    font-size: 3rem;
    font-weight: 600;
`;
const h2Styles = css`
    font-size: 2.25rem;
    font-weight: 600;
`;
const h3Styles = css`
    font-size: 2rem;
    font-weight: 500;
`;
const h4Styles = css`
    font-size: 1.75rem;
    font-weight: 500;
`;
const h5Styles = css`
    font-size: 1.5rem;
    font-weight: 500;
`;
const h6Styles = css`
    font-size: 1.25rem;
    font-weight: 500;
`;

type HeadingProps = {
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    align?: "left" | "center" | "right";
};

const Heading = styled.h1`
    ${(props: HeadingProps) => {
        switch (props.as) {
            case "h1":
                return h1Styles;
            case "h2":
                return h2Styles;
            case "h3":
                return h3Styles;
            case "h4":
                return h4Styles;
            case "h5":
                return h5Styles;
            case "h6":
                return h6Styles;
            default:
                return h1Styles;
        }
    }}

    ${(props: { align?: string; as?: string }) =>
        props.align &&
        css`
            text-align: ${props.align};
        `}
`;

Heading.defaultProps = {
    as: "h1",
    align: "left",
};
export default Heading;

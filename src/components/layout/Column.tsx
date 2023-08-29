import styled from "styled-components";

/**
 * Align Items in flexbox
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/align-items
 *
 * */

const ALIGNMENTS = {
    start: "flex-start",
    end: "flex-end",
    center: "center",
    stretch: "stretch",
    baseline: "baseline",
};

/**
 * Column component
 *
 * @description Places items in a column
 * @param {string} align - align-items property for flexbox
 * @returns {React.JSX.Element}
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/align-items
 *
 * */

const Column = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    ${(props: {
        align?: "start" | "end" | "center" | "stretch" | "baseline";
    }) => props.align && `align-items: ${ALIGNMENTS[props.align]};`}
`;

Column.defaultProps = {
    align: "stretch",
};

export default Column;

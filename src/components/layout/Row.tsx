import styled from "styled-components";

/**
 * Justify Content in flexbox
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content
 *
 * */
const ALIGNMENTS = {
    start: "flex-start",
    end: "flex-end",
    center: "center",
    between: "space-between",
    around: "space-around",
    even: "space-evenly",
};

/**
 * Row component
 *
 * @description Places items in a row
 * @param {string} justify - justify-content property for flexbox
 * @returns {React.JSX.Element}
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content
 */
const Row = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1.5rem;
    align-items: center;

    ${(props: {
        justify?: "start" | "end" | "center" | "between" | "around" | "even";
    }) =>
        props.justify
            ? `justify-content: ${ALIGNMENTS[props.justify]};`
            : `justify-content: space-between;`}
`;

export default Row;

import React, {
    cloneElement,
    createContext,
    useContext,
    useState,
} from "react";

import styled from "styled-components";
import { HiXMark } from "react-icons/hi2";
import { useOutsideClick } from "@/hooks";
import { createPortal } from "react-dom";

const StyledModal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--color-grey-0);
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-lg);
    padding: 3.2rem 4rem;
    transition: all 0.5s;
    max-height: 90vh;

    overflow: auto;
`;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: var(--backdrop-color);
    backdrop-filter: blur(5px);
    z-index: 1000;
    transition: all 0.5s;
`;

const ButtonCloseModal = styled.button`
    background: none;
    border: none;
    padding: 0.4rem;
    border-radius: var(--border-radius-sm);
    transform: translateX(0.8rem);
    transition: all 0.2s;
    position: absolute;
    top: 1.2rem;
    right: 1.9rem;

    &:hover {
        background-color: var(--color-grey-100);
    }

    & svg {
        width: 2.4rem;
        height: 2.4rem;
        color: var(--color-grey-500);
    }
`;

type ModalContextType = {
    open: (value: string) => void;
    openName: string;
    close: () => void;
};

const ModalContext = createContext<ModalContextType>({
    open: (a: string) => {
        a;
        return;
    },
    openName: "",
    close: () => {
        return;
    },
});

function Modal({ children }: { children: React.ReactNode }) {
    const [openName, setOpenName] = useState("");
    const open = (val: string) => setOpenName(val);
    const close = () => setOpenName("");

    return (
        <ModalContext.Provider value={{ open, openName, close }}>
            {children}
        </ModalContext.Provider>
    );
}

function Open({
    children,
    opens: opensWindowName,
}: {
    children: React.ReactElement;
    opens: string;
}) {
    const { open } = useContext(ModalContext);

    return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({
    children,
    name: windowName,
}: {
    children: React.ReactElement;
    name: string;
}) {
    const { openName, close } = useContext(ModalContext);
    const ref: any = useOutsideClick(close);

    if (openName != windowName) return null;

    return createPortal(
        <Overlay>
            <StyledModal ref={ref}>
                <ButtonCloseModal onClick={close}>
                    <HiXMark />
                </ButtonCloseModal>
                <div>{cloneElement(children, { onCloseModal: close })}</div>
            </StyledModal>
        </Overlay>,
        document.body
    );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;

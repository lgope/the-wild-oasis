import styled from "styled-components";
import { Cabin } from "@/types";
import { formatCurrency } from "@/utils/helpers";
import { useCreateCabin, useDeleteCabin } from "@/hooks/cabins";
import { CreateCabinForm } from ".";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { Menus, Modal } from "@/components/ui";
import ConfirmDelete from "@/components/ui/ConfirmDelete";

const TableRow = styled.div`
    display: grid;
    grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
    column-gap: 2.4rem;
    align-items: center;
    padding: 1.4rem 2.4rem;

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
    }
`;

const Img = styled.img`
    display: block;
    width: 6.4rem;
    aspect-ratio: 3 / 2;
    object-fit: cover;
    object-position: center;
    transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: "Sono";
`;

const Price = styled.div`
    font-family: "Sono";
    font-weight: 600;
`;

const Discount = styled.div`
    font-family: "Sono";
    font-weight: 500;
    color: var(--color-green-700);
`;

function CabinRow({ cabin }: { cabin: Cabin }) {
    const { isDeleting, deleteCabin } = useDeleteCabin();
    const { isCreating: isDuplicating, createCabin: duplicateCabin } =
        useCreateCabin();

    const {
        id: cabinId,
        name,
        maxCapacity,
        regularPrice,
        discount,
        description,
        image,
    }: Cabin = cabin;

    function handleDuplicate() {
        duplicateCabin({
            name: `Copy of ${name}`,
            maxCapacity,
            regularPrice,
            discount,
            image,
            description,
        } as Cabin);
    }

    return (
        <>
            <TableRow>
                <Img src={image} />
                <Cabin>{name}</Cabin>
                <div>Fits up to {maxCapacity} guests</div>
                <Price>{formatCurrency(regularPrice)}</Price>
                {discount ? (
                    <Discount>{formatCurrency(discount)}</Discount>
                ) : (
                    <span>&mdash;</span>
                )}
                <div>
                    <Modal>
                        <Menus.Menu>
                            <Menus.Toggle id={cabinId.toString()} />

                            <Menus.List id={cabinId.toString()}>
                                <Menus.Button
                                    icon={<HiSquare2Stack />}
                                    onClick={handleDuplicate}
                                    disabled={isDuplicating}
                                >
                                    Duplicate
                                </Menus.Button>

                                <Modal.Open opens="edit">
                                    <Menus.Button icon={<HiPencil />}>
                                        Edit
                                    </Menus.Button>
                                </Modal.Open>

                                <Modal.Open opens="delete">
                                    <Menus.Button icon={<HiTrash />}>
                                        Delete
                                    </Menus.Button>
                                </Modal.Open>
                            </Menus.List>

                            <Modal.Window name="edit">
                                <CreateCabinForm cabinToEdit={cabin} />
                            </Modal.Window>

                            <Modal.Window name="delete">
                                <ConfirmDelete
                                    resourceName="cabins"
                                    disabled={isDeleting}
                                    onConfirm={() => deleteCabin(cabinId)}
                                />
                            </Modal.Window>
                        </Menus.Menu>
                    </Modal>
                </div>
            </TableRow>
        </>
    );
}

export default CabinRow;

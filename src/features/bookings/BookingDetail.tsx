import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";

import { useMoveBack } from "@/hooks";
import { useBooking, useDeleteBooking } from "@/hooks/bookings";

import { Heading } from "@/components/typography";
import { Row } from "@/components/layout";
import {
    Spinner,
    ConfirmDelete,
    Empty,
    Modal,
    Button,
    Tag,
    ButtonGroup,
    ButtonText,
} from "@/components/ui";

import { useNavigate } from "react-router-dom";
import { useCheckout } from "@/hooks/check-in-out";

const HeadingGroup = styled.div`
    display: flex;
    gap: 2.4rem;
    align-items: center;
`;

function BookingDetail() {
    const { booking, isLoading } = useBooking();
    const { checkout, isCheckingOut } = useCheckout();
    const { deleteBooking, isDeleting } = useDeleteBooking();

    const moveBack = useMoveBack();
    const navigate = useNavigate();

    if (isLoading) return <Spinner />;
    if (!booking) return <Empty resourceName="booking" />;

    const { status, id: bookingId } = booking;

    const statusToTagName: any = {
        unconfirmed: "blue",
        "checked-in": "green",
        "checked-out": "silver",
    };

    return (
        <>
            <Row>
                <HeadingGroup>
                    <Heading as="h1">Booking #{bookingId}</Heading>
                    <Tag type={statusToTagName[status]}>
                        {status.replace("-", " ")}
                    </Tag>
                </HeadingGroup>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking as any} />

            <ButtonGroup>
                {status === "unconfirmed" && (
                    <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
                        Check in
                    </Button>
                )}

                {status === "checked-in" && (
                    <Button
                        // icon={<HiArrowUpOnSquare />}
                        onClick={() => checkout(bookingId)}
                        disabled={isCheckingOut}
                    >
                        {/* <HiArrowUpOnSquare /> */}
                        Check out
                    </Button>
                )}

                <Modal>
                    <Modal.Open opens="delete">
                        <Button variant="danger">Delete booking</Button>
                    </Modal.Open>

                    <Modal.Window name="delete">
                        <ConfirmDelete
                            resourceName="booking"
                            disabled={isDeleting}
                            onConfirm={() =>
                                deleteBooking(bookingId, {
                                    onSettled: () => navigate(-1),
                                })
                            }
                        />
                    </Modal.Window>
                </Modal>

                <Button variant="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default BookingDetail;

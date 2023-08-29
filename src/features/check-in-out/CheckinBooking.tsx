import styled from "styled-components";

import BookingDataBox from "../bookings/BookingDataBox";

import { useMoveBack } from "@/hooks";
import { useBooking } from "@/hooks/bookings";

import { Heading } from "@/components/typography";
import { Row } from "@/components/layout";
import {
    Spinner,
    Empty,
    Button,
    Tag,
    ButtonGroup,
    ButtonText,
} from "@/components/ui";

import { formatCurrency } from "@/utils/helpers";
import { Checkbox } from "@/components/form";
import { useEffect, useState } from "react";
import { useCheckin } from "@/hooks/check-in-out";
import { useSettings } from "@/hooks/settings";

const Box = styled.div`
    /* Box */
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);
    padding: 2.4rem 4rem;
`;

const HeadingGroup = styled.div`
    display: flex;
    gap: 2.4rem;
    align-items: center;
`;

function CheckinBooking() {
    const [confirmPaid, setConfirmPaid] = useState(false);
    const [addBreakfast, setAddBreakfast] = useState(false);

    const { booking, isLoading } = useBooking();
    const { checkin, isCheckingIn } = useCheckin();
    const { settings, isLoading: isLoadingSettings } = useSettings();

    useEffect(() => {
        setConfirmPaid(booking?.isPaid ?? false);
    }, [booking]);

    const moveBack = useMoveBack();

    if (isLoading || isLoadingSettings) return <Spinner />;
    if (!booking) return <Empty resourceName="booking" />;

    const {
        status,
        id: bookingId,
        guests,
        totalPrice,
        numGuests,
        hasBreakfast,
        numNights,
    } = booking;
    const optionalBreakfastPrice =
        settings?.breakfastPrice * numNights * numGuests;

    const statusToTagName: any = {
        unconfirmed: "blue",
        "checked-in": "green",
        "checked-out": "silver",
    };

    function handleCheckin() {
        if (!confirmPaid) return;

        if (addBreakfast) {
            checkin({
                bookingId,
                breakfast: {
                    hasBreakfast: true,
                    extrasPrice: optionalBreakfastPrice,
                    totalPrice: totalPrice + optionalBreakfastPrice,
                },
            });
        } else {
            checkin({ bookingId, breakfast: {} });
        }
    }

    return (
        <>
            <Row>
                <HeadingGroup>
                    <Heading as="h1">Check in Booking #{bookingId}</Heading>
                    <Tag type={statusToTagName[status]}>
                        {status.replace("-", " ")}
                    </Tag>
                </HeadingGroup>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking as any} />

            {!hasBreakfast && (
                <Box>
                    <Checkbox
                        checked={addBreakfast}
                        onChange={() => {
                            setAddBreakfast((add) => !add);
                            setConfirmPaid(false);
                        }}
                        id="breakfast"
                    >
                        Want to add breakfast for{" "}
                        {formatCurrency(optionalBreakfastPrice)}?
                    </Checkbox>
                </Box>
            )}

            <Box>
                <Checkbox
                    checked={confirmPaid}
                    onChange={() => setConfirmPaid((confirm) => !confirm)}
                    disabled={confirmPaid || isCheckingIn}
                    id="confirm"
                >
                    I confirm that {guests.fullName} has paid the total amount
                    of{" "}
                    {!addBreakfast
                        ? formatCurrency(totalPrice)
                        : `${formatCurrency(
                              totalPrice + optionalBreakfastPrice
                          )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                              optionalBreakfastPrice
                          )})`}
                </Checkbox>
            </Box>

            <ButtonGroup>
                <Button
                    onClick={handleCheckin}
                    disabled={!confirmPaid || isCheckingIn}
                >
                    Check in booking #{bookingId}
                </Button>
                <Button variant="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default CheckinBooking;

import { Button } from "@/components/ui";
import { useCheckout } from "@/hooks/check-in-out";

function CheckoutButton({ bookingId }: any) {
    const { checkout, isCheckingOut } = useCheckout();

    return (
        <Button
            variant="primary"
            size="small"
            onClick={() => checkout(bookingId)}
            disabled={isCheckingOut}
        >
            Check out
        </Button>
    );
}

export default CheckoutButton;

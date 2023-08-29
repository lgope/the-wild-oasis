import { Heading } from "@/components/typography";
import { SignupForm } from "@/features/authentication";

function NewUsers() {
    return (
        <>
            <Heading as="h1">Create a new user</Heading>
            <SignupForm />
        </>
    );
}

export default NewUsers;

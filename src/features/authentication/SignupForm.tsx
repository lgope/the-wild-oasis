import { useForm } from "react-hook-form";

import { useSignup } from "@/hooks/authentication";

import { Button } from "@/components/ui";
import { Form, FormRow, Input } from "@/components/form";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
    const { signup, isLoading } = useSignup();
    const { register, formState, getValues, handleSubmit, reset } = useForm();
    const { errors } = formState;

    function onSubmit({ fullName, email, password }: any) {
        signup(
            { fullName, email, password },
            {
                onSettled: () => reset(),
            }
        );
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow
                label="Full name"
                error={errors?.fullName?.message?.toString()}
            >
                <Input
                    type="text"
                    id="fullName"
                    disabled={isLoading}
                    {...register("fullName", {
                        required: "This field is required",
                    })}
                />
            </FormRow>

            <FormRow
                label="Email address"
                error={errors?.email?.message?.toString()}
            >
                <Input
                    type="email"
                    id="email"
                    disabled={isLoading}
                    {...register("email", {
                        required: "This field is required",
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Please provide a valid email address",
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Password (min 8 characters)"
                error={errors?.password?.message?.toString()}
            >
                <Input
                    type="password"
                    id="password"
                    disabled={isLoading}
                    {...register("password", {
                        required: "This field is required",
                        minLength: {
                            value: 8,
                            message: "Password needs a minimum of 8 characters",
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Repeat password"
                error={errors?.passwordConfirm?.message?.toString()}
            >
                <Input
                    type="password"
                    id="passwordConfirm"
                    disabled={isLoading}
                    {...register("passwordConfirm", {
                        required: "This field is required",
                        validate: (value) =>
                            value === getValues().password ||
                            "Passwords need to match",
                    })}
                />
            </FormRow>

            <FormRow>
                <>
                    <Button
                        variant="secondary"
                        type="reset"
                        disabled={isLoading}
                        onClick={reset}
                    >
                        Cancel
                    </Button>
                    <Button disabled={isLoading}>Create new user</Button>
                </>
            </FormRow>
        </Form>
    );
}

export default SignupForm;

import { Input, Form, FileInput, Textarea, FormRow } from "@/components/form";

import { Button } from "@/components/ui";

import { useForm } from "react-hook-form";
import { Cabin } from "@/types";
import { useCreateCabin, useEditCabin } from "@/hooks/cabins";

function CreateCabinForm({
    cabinToEdit,
    onCloseModal,
}: {
    cabinToEdit?: Cabin;
    onCloseModal?: () => void;
}) {
    const { isCreating, createCabin } = useCreateCabin();
    const { isEditing, editCabin } = useEditCabin();
    const isWorking = isCreating || isEditing;

    const { id: editId, ...editValues } = (cabinToEdit as Cabin) || {};
    const isEditSession = Boolean(editId);

    const { register, handleSubmit, reset, getValues, formState } =
        useForm<Cabin>({
            defaultValues: isEditSession ? editValues : {},
        });
    const { errors } = formState;

    function onSubmit(data: Cabin) {
        const image =
            typeof data.image === "string" ? data.image : data.image[0];

        if (isEditSession)
            editCabin(
                { cabinData: { ...data, image }, cabinId: editId },
                {
                    onSuccess: () => {
                        reset();
                        onCloseModal?.();
                    },
                }
            );
        else
            createCabin(
                { ...data, image: image },
                {
                    onSuccess: () => {
                        reset();
                        onCloseModal?.();
                    },
                }
            );
    }

    function onError(errors: any) {
        errors;
    }

    return (
        <Form
            onSubmit={handleSubmit(onSubmit, onError)}
            type={onCloseModal ? "modal" : "regular"}
        >
            <FormRow label="Cabin name" error={errors?.name?.message as string}>
                <Input
                    type="text"
                    id="name"
                    disabled={isWorking}
                    {...register("name", {
                        required: "This field is required",
                    })}
                />
            </FormRow>

            <FormRow
                label="Maximum capacity"
                error={errors?.maxCapacity?.message as string}
            >
                <Input
                    type="number"
                    id="maxCapacity"
                    disabled={isWorking}
                    {...register("maxCapacity", {
                        required: "This field is required",
                        min: {
                            value: 1,
                            message: "Capacity should be at least 1",
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Regular price"
                error={errors?.regularPrice?.message as string}
            >
                <Input
                    type="number"
                    id="regularPrice"
                    disabled={isWorking}
                    {...register("regularPrice", {
                        required: "This field is required",
                        min: {
                            value: 1,
                            message: "Capacity should be at least 1",
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Discount"
                error={errors?.discount?.message as string}
            >
                <Input
                    type="number"
                    id="discount"
                    disabled={isWorking}
                    defaultValue={0}
                    {...register("discount", {
                        required: "This field is required",
                        validate: (discountValue) =>
                            discountValue <= getValues().regularPrice ||
                            "Discount should be less than regular price",
                    })}
                />
            </FormRow>

            <FormRow
                label="Description for website"
                error={errors?.description?.message as string}
            >
                <Textarea
                    id="description"
                    defaultValue=""
                    disabled={isWorking}
                    {...register("description", {
                        required: "This field is required",
                    })}
                />
            </FormRow>

            <FormRow
                label="Cabin photo"
                error={errors?.image?.message as string}
            >
                <FileInput
                    disabled={isWorking}
                    id="image"
                    accept="image/*"
                    {...register("image", {
                        required: isEditSession
                            ? false
                            : "This field is required",
                    })}
                />
            </FormRow>

            <FormRow>
                <>
                    <Button
                        variant="secondary"
                        type="reset"
                        onClick={() => onCloseModal?.()}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isWorking}>
                        {isEditSession ? "Edit Cabin" : "Add cabin"}
                    </Button>
                </>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;

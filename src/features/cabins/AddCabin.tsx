import { Button, Modal } from "@/components/ui";
import { Column } from "@/components/layout";
import { CreateCabinForm } from ".";

function AddCabin() {
    return (
        <div>
            <Modal>
                <Modal.Open opens="add-cabin">
                    <Column align="stretch">
                        <Button>Add Cabin</Button>
                    </Column>
                </Modal.Open>
                <Modal.Window name="add-cabin">
                    <CreateCabinForm />
                </Modal.Window>
            </Modal>
        </div>
    );
}

export default AddCabin;

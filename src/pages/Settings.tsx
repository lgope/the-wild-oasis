import { Heading } from "@/components/typography";
import { Column } from "@/components/layout";
import { UpdateSettingsForm } from "@/features/settings";

function Settings() {
    return (
        <Column>
            <Heading>Update hotel settings</Heading>
            <UpdateSettingsForm />
        </Column>
    );
}

export default Settings;

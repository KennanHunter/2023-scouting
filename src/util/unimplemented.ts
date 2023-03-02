import { showNotification } from "@mantine/notifications";

export const sendUnimplemented = () => {
    showNotification({
        title: "Unimplemented",
        message: "This feature has not been implemented yet",
        color: "red",
    });
};

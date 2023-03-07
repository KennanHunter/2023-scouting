import { Box, Flex, Title, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { FC, useState } from "react";
import QrReader from "react-web-qr-reader"; // note: the types for this library are entirely wrong for some reason, ignore the "any" type

export const ScanQR: FC = () => {
    const delay = 500;

    const handleScan = (result: any) => {
        if (result) {
            //setData(result.data);
            
            showNotification({
                title: "Scan Complete!",
                message: `Imported ${2} ${"Match"} Entries`,
                color: "green",
            });
            console.log(result)
        }
    };

    const handleError = (error : any) => {
        console.log(error);
    };

    return (
        <Box>
            <Title align="center" mb={16}>QR Code Scanner</Title>
            <QrReader
                delay={delay}
                onError={handleError}
                onScan={handleScan}
            />
        </Box>
    );
};

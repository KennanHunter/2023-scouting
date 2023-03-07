import { Box, Flex, Title } from "@mantine/core";
import { FC } from "react";

export const ScanQR: FC = () => {
    return (
        <Flex gap={"lg"} justify={"space-between"} p={"xl"} wrap={"wrap"}>
            <Box>
                <Title align={"center"}>Match</Title>
                <div>insert qr code here</div>
            </Box>
            <Box>
                <Title align={"center"}>Pit</Title>
                <div>insert qr code here</div>
            </Box>
        </Flex>
    );
};

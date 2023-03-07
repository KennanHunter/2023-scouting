import { Box, Flex, Title } from "@mantine/core";
import { FC } from "react";

export const CreateQR: FC = () => {
    return (
        <Flex>
            <Box>
                <Title>Match</Title>
                <div>insert qr code here</div>
            </Box>
            <Box>
                <Title>Pit</Title>
                <div>insert qr code here</div>
            </Box>
        </Flex>
    );
};

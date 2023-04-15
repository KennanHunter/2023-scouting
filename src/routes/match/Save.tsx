import { Button, Center } from "@mantine/core";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useActiveMatch } from "../../stores/match/activeMatch";
import { useMatchDB } from "../../stores/match/matchDB";

export const Save: FC = () => {
    const pushToDB = useMatchDB((state) => state.push);
    const saveActiveMatch = useActiveMatch((state) => state.save);
    const resetActiveMatch = useActiveMatch((state) => state.clear);
    const navigate = useNavigate();

    return (
        <Center>
            <Button
                onClick={() => {
                    const lastMatchNumber =
                        useActiveMatch.getState().matchNumber;

                    pushToDB(saveActiveMatch());

                    resetActiveMatch();

                    navigate("/final/");
                }}
            >
                Save
            </Button>
        </Center>
    );
};

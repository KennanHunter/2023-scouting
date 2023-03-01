import { AspectRatio, Box } from "@mantine/core";
import { IconMapPin } from "@tabler/icons-react";
import { FC, MouseEvent } from "react";

export type FieldPoint = {
    x: number;
    y: number;
};

export type FieldData = FieldPoint[];

type FieldInputParams = {
    onChange: (data: FieldData) => void;
    singlePoint?: boolean;
    data: FieldData;
};

export const FieldInput: FC<FieldInputParams> = ({
    data,
    singlePoint,
    onChange,
}) => {
    return (
        <AspectRatio
            ratio={458 / 200}
            sx={{
                backgroundImage: "url(field.png)",
                backgroundOrigin: "center",
                backgroundSize: "cover",
            }}
            onClick={(event: MouseEvent<HTMLDivElement>) => {
                const eventTarget = (event.target as HTMLDivElement);

                const percentX = (event.clientX - eventTarget.offsetLeft) / eventTarget.clientWidth;
                const percentY = (event.clientY - eventTarget.offsetTop) / eventTarget.clientHeight;

                if (singlePoint) {
                    onChange([
                        {
                            x: percentX,
                            y: percentY
                        }
                    ])
                    return
                }

                onChange(data.concat({
                    x: percentX,
                    y: percentY
                }));
            }}
        >
            {data.map((point: FieldPoint, index: number) => (
                <Box sx={{
                    pointerEvents: "none"
                }} key={`point#${index}`}>
                    <IconMapPin
                        size={32}
                        style={{
                            position: "absolute",
                            top: `${point.y * 100}%`,
                            left: `${point.x * 100}%`,
                            transform: "translate(-50%, -90%)",
                            pointerEvents: "none",
                            color: "#00ff00"
                        }}
                    ></IconMapPin>
                </Box>
            ))}
        </AspectRatio>
    );
};

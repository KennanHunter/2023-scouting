import { AspectRatio, Box } from "@mantine/core";
import { IconMapPin } from "@tabler/icons-react";
import { FC, MouseEvent } from "react";
import z from "zod";

export const FieldPoint = () =>
    z.object({
        x: z.number().min(0).max(1),
        y: z.number().min(0).max(1),
    });

export type FieldPoint = z.infer<ReturnType<typeof FieldPoint>>;

export const FieldData = () => FieldPoint().array();
export type FieldData = z.infer<ReturnType<typeof FieldData>>;

type FieldInputParams = {
    onChange: (data: FieldData) => void;
    singlePoint?: boolean;
    data: FieldData;
    readonly?: boolean;
};

export const FieldInput: FC<FieldInputParams> = ({
    data,
    singlePoint,
    readonly,
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
            my={8}
            onClick={(event: MouseEvent<HTMLDivElement>) => {
                if (readonly) return;

                const eventTarget = event.target as HTMLDivElement;

                const percentX =
                    (event.clientX - eventTarget.offsetLeft + window.scrollX) /
                    eventTarget.clientWidth;
                const percentY =
                    (event.clientY - eventTarget.offsetTop + window.scrollY) /
                    eventTarget.clientHeight;

                if (singlePoint) {
                    onChange([
                        {
                            x: percentX,
                            y: percentY,
                        },
                    ]);
                    return;
                }

                onChange(
                    data.concat({
                        x: percentX,
                        y: percentY,
                    })
                );
            }}
        >
            {data.map((point: FieldPoint, index: number) => (
                <Box
                    sx={{
                        pointerEvents: "none",
                    }}
                    key={`point#${index}`}
                >
                    <IconMapPin
                        size={32}
                        style={{
                            position: "absolute",
                            top: `${point.y * 100}%`,
                            left: `${point.x * 100}%`,
                            transform: "translate(-50%, -90%)",
                            pointerEvents: "none",
                            color: "#00ff00",
                        }}
                    />
                </Box>
            ))}
        </AspectRatio>
    );
};

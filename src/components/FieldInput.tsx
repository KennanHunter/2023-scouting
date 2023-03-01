import { AspectRatio, Box } from "@mantine/core";
import { IconMapPin } from "@tabler/icons-react";
import { FC, MouseEvent } from "react";

type FieldPoint = {
    x: number;
    y: number;
};

type FieldData = FieldPoint[];

type FieldInputParams = {
    onChange: (data: FieldData) => void;
    onePoint: boolean;
    data: FieldData;
};

export const FieldInput: FC<FieldInputParams> = ({
    data,
    onePoint,
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
                const localX = event.clientX - (event.target as any).offsetLeft;
                const localY = event.clientY - (event.target as any).offsetTop;

                console.log(`${localX} | ${localY}`);
            }}
        >
            {[{ x: 0.5, y: 0.5 }].map((point: FieldPoint) => (
				<Box
				key={point.toString()}>
                	<IconMapPin
                	    size={32}
                	    style={{
                	        position: "absolute",
                	    }}
                	></IconMapPin>
				</Box>
            ))}
        </AspectRatio>
    );
};

import { Stack } from "@mantine/core";
import { Children, FC, PropsWithChildren, ReactElement, useMemo } from "react";
import { useValidationState } from "../stores/validation/validationStore";

export const StackValidationChecker: FC<PropsWithChildren> = ({ children }) => {
    const childArray = Children.toArray(children) as ReactElement[];

    const allChildrenValid = useMemo(
        () =>
            childArray.reduce(
                (allValid, child) =>
                    allValid && typeof child.props.error === "undefined",
                true
            ),
        [childArray]
    );

    useValidationState((state) => state.set)(allChildrenValid);

    return <Stack>{children}</Stack>;
};

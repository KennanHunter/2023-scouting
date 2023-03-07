import { Stack } from "@mantine/core";
import { Children, FC, PropsWithChildren, ReactElement, useMemo } from "react";
import { useValidationState } from "../stores/validation/validationStore";

export const StackValidationChecker: FC<PropsWithChildren> = ({ children }) => {
    let allChildrenValid = useMemo(
        () =>
            (Children.toArray(children) as ReactElement[]).reduce(
                (allValid, child) =>
                    allValid && typeof child.props.error === "undefined",
                true
            ),
        Children.toArray(children)
    );

    useValidationState((state) => state.set)(allChildrenValid);

    return <Stack>{children}</Stack>;
};

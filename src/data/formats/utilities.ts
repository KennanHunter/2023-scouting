export const escapeString = (value: string): string =>
    value.replace('"', '\\"');
export const wrapString = (value: string): string => '"' + value + '"';

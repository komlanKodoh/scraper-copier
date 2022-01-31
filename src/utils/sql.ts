export const sql = (strings: any, ...expr: any) =>
  strings
    .map((str: string, index: number) => str + (expr.length > index ? String(expr[index]) : ""))
    .join("");

    
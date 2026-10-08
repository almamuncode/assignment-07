export function safeReturnTo(value: unknown): string {
  return typeof value === "string" &&
    /^\/(product\/[a-z0-9-]+|profile(?:\/edit)?)$/.test(value)
    ? value
    : "/";
}

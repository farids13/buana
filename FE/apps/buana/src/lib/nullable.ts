export function renderNullableValue(value: string | null | undefined): string {
  return value && value.trim() !== "" ? value : "-";
}

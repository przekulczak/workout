import { format } from "date-fns";

export function formatLocalDate(date?: Date): string {
  return date ? format(date, "yyyy-MM-dd") : "";
}

export function createFormData(data: Record<string, any>): FormData {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      if (value instanceof Date) {
        formData.append(key, value.toISOString());
      } else if (typeof value === "number" || typeof value === "boolean") {
        formData.append(key, value.toString());
      } else if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, String(value));
      }
    }
  });

  return formData;
}

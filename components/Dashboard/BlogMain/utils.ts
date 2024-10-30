export function formatToSlug(text: string): string {
  return text
    .toLowerCase() // Convert the string to lowercase
    .trim() // Trim any leading or trailing whitespace
    .replace(/[^\w\s-]/g, '') // Remove special characters except for hyphens and spaces
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/--+/g, '-') // Replace multiple hyphens with a single one
    .replace(/^-+|-+$/g, ''); // Remove hyphens from the beginning and end of the string
}

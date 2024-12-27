export function truncateText(text: string | undefined, maxLength: number): string {
    if (!text) return '';
    if (text.length > maxLength) {
      return `${text.substring(0, maxLength)}...`;
    }
    return text;
}
export const formattedDate = (dateString: string): string => {
    const inputDate = new Date(dateString);
    const year = inputDate.getUTCFullYear();
    const month = (inputDate.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    const day = inputDate.getUTCDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}
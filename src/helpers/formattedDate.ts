export const formattedDate = (dateString?: string): string => {
    if (dateString) {const inputDate = new Date(dateString);
        const year = inputDate.getUTCFullYear();
        const month = (inputDate.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
        const day = inputDate.getUTCDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    } else {
        return '0000-00-00'
    }
}
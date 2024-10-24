/**
 * Formats a date string into a human-readable format.
 * If the date string is undefined or invalid, it returns appropriate messages.
 *
 * @param {string} [dateString] - The date string to format.
 * @param {string} locale - The locale to use for formatting the date.
 * @returns {string} Formatted date or an error message.
 */
const formatDate = (dateString?: string, locale: string = 'pt'): string => {
    // Check if the dateString is undefined or empty
    if (!dateString) return 'Data não informada';

    // Convert the dateString into a Date object
    const date = new Date(dateString);

    // Check if the date conversion resulted in an invalid date
    if (isNaN(date.getTime())) return 'Data inválida';

    // Define options for date formatting based on locale
    let options: Intl.DateTimeFormatOptions;
    if (locale === 'pt') {
        options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false, // 24-hour format
        };
    } else if (locale === 'en') {
        options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true, // 12-hour format
        };
    } else {
        // Default to 'pt-BR' if locale is not recognized
        options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false, // 24-hour format
        };
    }

    // Use Intl.DateTimeFormat to format the date according to the provided locale
    return new Intl.DateTimeFormat(locale, options).format(date);
};

export default formatDate;

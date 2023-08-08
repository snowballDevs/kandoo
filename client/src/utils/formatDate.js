const formattedDate = (backendDate) => {
    const date = new Date(backendDate);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

export default formattedDate;

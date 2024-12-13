const formatDate = (dateString) => {
    const options = { 
        hour: '2-digit',
        minute: '2-digit',
        weekday: 'long',
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' };
    return new Intl.DateTimeFormat('EN', options).format(new Date(dateString));
};

export default formatDate;
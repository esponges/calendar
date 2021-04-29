const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
];

const months =  monthNames.map((month, index) => {
    return  {
        month,
        index: index + 1
    }
});

module.exports = months;
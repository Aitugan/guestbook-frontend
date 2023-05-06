function formatDate(timestamp) {
  const currentDate = new Date(timestamp);
  const hours = currentDate.getHours().toString().padStart(2, '0');
  const minutes = currentDate.getMinutes().toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const year = currentDate.getFullYear().toString();

  const formattedDate = `${hours}:${minutes}, ${day} ${getMonthName(month)} ${year}`;
  
  return formattedDate;
}

function getMonthName(month) {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  return months[parseInt(month) - 1];
}

module.exports = { formatDate };

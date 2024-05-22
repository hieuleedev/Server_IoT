export  function formatDateTime(dateTimeString) {
    const originalDate = new Date(dateTimeString);
    
    // Định dạng lại chuỗi ngày và giờ phút
    const formattedDate = `${originalDate.toLocaleDateString()} ${originalDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}`;
  
    return formattedDate;
  }

export default function timestamp(time){
    const date = new Date(time);
    // Định dạng ngày giờ theo kiểu Việt Nam
    let formattedDate = date.toLocaleString("vi-VN", {
      weekday: "long",  // e.g., "Thứ Năm"
      day: "numeric",   // e.g., "12"
      month: "long",    // e.g., "Tháng Mười Hai"
      year: "numeric",  // e.g., "2024"
      hour: "2-digit",  // e.g., "09"
      minute: "2-digit", // e.g., "57"
      second: "2-digit", // e.g., "01"
      hour12: false,     // Sử dụng định dạng 24 giờ
    });
    formattedDate = formattedDate.replace("lúc ", "");

    return formattedDate
}
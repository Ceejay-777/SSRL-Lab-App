import { formatDistanceToNow } from "date-fns";
import { format } from "date-fns";

export const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

const today = new Date();
const day = today.getDate();
const month = today.toLocaleString("default", { month: "long" });
const year = today.getFullYear();

export const formattedDateNow = `${day}${getOrdinalSuffix(day)}, ${month} ${year}`;

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = format(date, "d");
  const month = format(date, "MMMM");
  const year = format(date, "yyyy");
  return `${day}${getOrdinalSuffix(day)} of ${month}, ${year}`;
};

export const getInitials = (fullname) => {
    const names = fullname.split(" ");
    const initials = names.map(name => name.charAt(0).toUpperCase()).join("");
    return initials;
};

export function formatTimeAgo(date) {
  const diff = Date.now() - date;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) return `${seconds} secs ago`;
  if (minutes < 60) return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
  if (hours < 24) return `${hours} hr${hours > 1 ? "s" : ""} ago`;
  if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;
  return `${years} year${years > 1 ? "s" : ""} ago`;
}

  export const getRandomSoftHexColor = () => {
    const randomChannel = () => Math.floor(Math.random() * 156 + 100); // 100-255 range for softer colors
    const r = randomChannel().toString(16).padStart(2, '0').toUpperCase();
    const g = randomChannel().toString(16).padStart(2, '0').toUpperCase();
    const b = randomChannel().toString(16).padStart(2, '0').toUpperCase();
    return `#${r}${g}${b}`;
  };

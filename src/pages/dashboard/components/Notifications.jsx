import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Dot } from "lucide-react";

const Notifications = ({ notifications, setNotifications }) => {


  // const dismissNotification = (id) => {
  //   setNotifications(
  //     notifications.filter((notification) => notification._id !== id),
  //   );
  // };
  console.log(notifications)
  return (
    <div className="">
      <h2 className="mb-2 text-xl font-semibold">Notifications</h2>
      <div className="rounded-2xl bg-navBg2 p-4 text-white shadow-md">
        <ul className="text-sm">
          {notifications.length > 0 ? (
            notifications.slice(0, 3).map((notification) => (
              <Link
                to={`/home/dashboard/notifications/${notification._id}`}
                state={notification}
                key={notification._id}
              >
                <li
                  className="flex items-center justify-between gap-4 rounded-xl px-2 py-2 hover:bg-navBg1"
                >
                  <div className="flex items-center gap-4">
                    <Dot
                      color={notification.status === "unread" ? "green" : "red"}
                      size={36}
                      className="w-9 h-9 min-w-9"
                    />
                    <p>{notification.message.slice(0, 35)}....</p>
                  </div>
                  <p className="text-xs font-light italic whitespace-nowrap ml-auto">
                    {formatDistanceToNow(new Date(notification.sentAt), { addSuffix: true })}
                  </p>
                </li>
              </Link>

            ))
          ) : (
            <p>No notifications</p>
          )}
        </ul>
        <Link
          to={`/home/dashboard/notifications`}
          className=" text-logo block text-right text-sm mt-6 hover:underline transition-all duration-300 ease-in"
        >
          See all....
        </Link>
      </div>
    </div>
  );
};

export default Notifications;
{
  /*Let's add a dot that shows whether the notification has been read or not, based on the status. The dot will only be there if the notification isn't read. */
}

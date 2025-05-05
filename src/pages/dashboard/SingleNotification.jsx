import { Dot } from "lucide-react";
import React from "react";
import { useLocation } from "react-router-dom";
import { formatDate } from "../../Modules/funcs";
import { useRequest } from "../../Modules/useRequest";
import { useEffect } from "react";

const SingleNotification = () => {
  const location = useLocation();
  const note = location.state;
  const { _id, title, message, sentAt, type, status } = note;

  const [markRequest] = useRequest();

  const markAsRead = async () => {
    if (status === "unread") {
      const res = await markRequest(`notification/mark_as_read/${_id}`, "POST");
      const data = await res.json();
      if (res.ok) {
        console.log(data);
      } else {
        console.log(data.message);
      }
    }
  };

  useEffect(() => {
    markAsRead();
  }, []);

  return (
    <div className="mt-2 min-h-screen overflow-y-auto px-6 py-4">
      <h2 className="text-2xl font-medium capitalize">{type} Notification</h2>
      <hr className="mt-1 bg-black" />
      <div className="fromLeft mx-auto my-12 mt-8 flex flex-col gap-5 rounded-xl border px-10 py-8 shadow-lg">
        <div className="w-full items-end justify-between md:flex">
          <div className="flex items-center">
            <h2 className="max-w-[360px] truncate text-xl font-medium">
              {title}
            </h2>
          </div>
          <p className="text-sm">{formatDate(sentAt)}</p>
        </div>
        <div>
          <h2 className="text-lg font-medium">Message:</h2>
          <p className="w-full break-words rounded-md py-1 text-base text-gray-700">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleNotification;

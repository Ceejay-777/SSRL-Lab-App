import { Link } from "react-router-dom";
import { LiaCheckDoubleSolid } from "react-icons/lia";
import { Plus } from "lucide-react";
import Messages from "../pages../../../../components/Messages";
import img1 from "../pages../../../../assets/img1.jpg";
import { useRequest } from "../../../Modules/useRequest";
import { useState } from "react";
import { useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { getInitials, getRandomSoftHexColor } from "../../../Modules/funcs";
import RequestsSkeleton from "../../../components/skeletons/RequestsSkeleton";

const Requests = () => {
  const [requests, setRequests] = useState([]);

  const [
    getRequest,
    getRequestLoading,
    setRequestLoading,
    getRequestError,
    setRequestError,
  ] = useRequest();

  const getAllRequests = async () => {
    setRequestLoading(true);
    const res = await getRequest("request/get_all");
    const data = await res.json();

    if (res.ok) {
      console.log(data);
      setRequests(data.requests);
    } else {
      setRequestError({ status: true, msg: data.message });
    }
    setRequestLoading(false);
  };

  useEffect(() => {
    console.log("okay")
    getAllRequests();
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="mt-4 px-1 md:px-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-medium uppercase md:text-2xl">
            Requests
          </h1>
          <div>
            <Link
              className="flex items-center gap-2 p-2 text-base font-medium transition-all duration-300 hover:rounded-lg hover:bg-neutral-100 md:text-lg"
              to={"/home/requests/create"}
            >
              <span>Create Request</span>
              <div className="rounded-full bg-logo p-[2px]">
                <Plus color="white" />
              </div>
            </Link>
          </div>
        </div>

        <hr className="bg-black" />

        {/* Content */}
        <div className="mt-4 px-0 py-2 md:px-4">
          {/* unread tag */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-semibold">
              <span className="underline">Unread</span>{" "}
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-logo text-center text-xs text-white">
                6
              </span>
            </div>

            <div className="flex cursor-pointer items-center gap-1">
              <LiaCheckDoubleSolid className="text-green-700" />
              <p>mark all as read</p>
            </div>
          </div>

          {getRequestLoading && (
            <div>
              <RequestsSkeleton />
              <RequestsSkeleton />
              <RequestsSkeleton />
            </div>
          )}
          {/* Messages */}
          <section className="mt-4">
            {requests &&
              requests.map((request) => {
                const { created_at, avatar, sender, title, _id } = request;
                return (
                  <Link
                    className="fromTop flex items-center gap-4 border-b hover:bg-zinc-100"
                    key={created_at}
                    to={`/home/requests/${_id}`}
                    state={request}
                  >
                    <div className="m-2 mt-4 h-12 w-12 rounded-full">
                      {avatar !== "NIL" ? (
                        <img
                          src={avatar}
                          alt=""
                          className="h-full w-full rounded-full"
                        />
                      ) : (
                        <span
                          className={`flex h-full w-full items-center justify-center rounded-full border-2 text-xs font-medium text-black`}
                          style={{
                            backgroundColor: `${getRandomSoftHexColor()}50`,
                          }}
                        >
                          {getInitials(sender.name)}
                        </span>
                      )}
                    </div>
                    <div className="flex-grow">
                      <p className="truncate font-semibold">{title}</p>
                      <p className="text-sm">{sender.name}</p>
                    </div>
                    <p className="text-xs font-light italic">
                      {formatDistanceToNow(created_at, { addSuffix: true })}
                    </p>
                  </Link>
                );
              })}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Requests;

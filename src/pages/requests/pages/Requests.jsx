import { Link } from "react-router-dom";
import { LiaCheckDoubleSolid } from "react-icons/lia";
import { Plus } from "lucide-react";
import { useRequest } from "../../../Modules/useRequest";
import { useState } from "react";
import { useEffect } from "react";
import RequestCard from "../component/RequestCard";
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

          {getRequestError.status && (
            <p className="mt-2 text-red-500">
              {getRequestError.msg}
              <p className="hover:cursor-pointer hover:underline"
                onClick={getAllRequests}>
                Retry?
              </p>
            </p>
          )}


          {/* Messages */}
          <section className="mt-4">

            {!getRequestError.status ? (
              getRequestLoading ? (
                <div>
                  <RequestsSkeleton />
                  <RequestsSkeleton />
                  <RequestsSkeleton />
                </div>
              ) : (
                requests.map((request) => (
                  <RequestCard key={request._id} request={request} />
                ))
              )
            ) : (
              <p>No requests found...</p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Requests;

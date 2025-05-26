import React from "react";
import { Link } from "react-router-dom";
import { LiaCheckDoubleSolid } from "react-icons/lia";
import { Plus } from "lucide-react";
import { useRequest } from "../../../Modules/useRequest";
import { useState } from "react";
import { useEffect } from "react";
import RequestsSkeleton from "../../../components/skeletons/RequestsSkeleton";
import ReportsCard from "../components/ReportsCard"


const Reports = () => {
  const [reports, setReports] = useState(null);
  const [
    getReports,
    reportsLoading,
    setReportsLoading,
    reportsError,
    setReportsError,
  ] = useRequest();

  const getAllReports = async () => {
    setReportsLoading(true);
    const res = await getReports("reports/get_all");
    const data = await res.json();
    if (res.ok) {
      setReports(data.reports);
    } else {
      setReportsError({ status: true, msg: data.message });
    }
    setReportsLoading(false);
  };

  useEffect(() => {
    getAllReports();
  }, []);

  return (
    <div className="mt-4 px-1 md:px-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium uppercase">Reports</h1>

        <div className="">
          <Link
            className="flex cursor-pointer items-center gap-2 rounded-lg p-2 text-lg font-medium transition-all duration-300 hover:rounded-lg hover:bg-neutral-100"
            to={"/home/reports/create"}
          >
            <div className="rounded-full bg-logo p-[2px]">
              <Plus color="white" />
            </div>
            <span>Write Report</span>
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
            <span className="h-4 w-4 rounded-full bg-logo text-center text-xs text-white">
              6
            </span>
          </div>

          <div className="flex cursor-pointer items-center gap-1">
            <LiaCheckDoubleSolid className="text-green-700" />
            <p className="hover:underline">mark all as read</p>
          </div>
        </div>
        {reportsError.status && (
          <p className="mt-2 text-red-500">
            {reportsError.msg}
            <p
              className="hover:cursor-pointer hover:underline"
              onClick={getAllReports}
            >
              Retry?
            </p>
          </p>
        )}

        {/* Messages */}
        <section className="mt-4 ">
          {!reportsError.status ? (
            reportsLoading ? (
              <div>
                <RequestsSkeleton />
                <RequestsSkeleton />
                <RequestsSkeleton />
              </div>
            ) : reports && reports.length > 0 ? (
              reports.map((report) => (
                <ReportsCard report={report} key={report._id} />
              ))
            ) : (
              <div className="">No Reports found...</div>
            )) : (
            <div className="">No Reports found...</div>
          )}

        </section>
      </div>
    </div>
  );
};

export default Reports;

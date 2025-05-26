import React from "react";
import Dashboxes from "./Dashboxes";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";

const Reports = ({ reports, userId }) => {
  return (
    <Dashboxes header="Reports" nav="reports">
      <ul>
        {reports.length > 0 ? (
          reports.map((report) => {
            const { _id, title, report_type, sender } = report;
            return (
              <Link key={_id} to={`/home/reports/${_id}`} state={report}>
                <div className="my-2 rounded-lg border p-2 hover:bg-navBg1">
                  <p className="truncate text-navBg2">{title}</p>
                  <div className="flex items-center gap-4">
                    <span>
                      {userId == sender ? (
                        <ArrowDown className="text-logo" />
                      ) : (
                        <ArrowUp className="text-logo" />
                      )}
                    </span>
                    <p className="text-sm capitalize">{report_type}</p>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <div className="space-y-2">
            <p>No items...</p>
          </div>
        )}
      </ul>
    </Dashboxes>
  );
};

export default Reports;

import BigGreenButton from "../../components/BigGreenButton";
import LogTable from "./LogTable";

import SampleData from "./SampleData.json";
import LogTable2 from "./LogTable2";
import { useState } from "react";
import Pagination from "./Pagination";
import "./table.css";

const Attendance = () => {
  const DescendingData = [...SampleData].sort((a, b) => b.id - a.id);
  const [currentLog, setCurrentLog] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(14);
  const last = currentPage * postsPerPage;
  const first = last - postsPerPage;
  const currentPosts = DescendingData.slice(first, last);
  return (
    <>
      <div>
        <div className="container">
          <div className="mt-8">
            <div className="flex justify-between">
              <div className="text-2xl font-medium uppercase">Attendance</div>
              <div className="text-xl font-bold">12:00:00</div>
            </div>
            <hr className="bg-black" />

            {/* Content */}
            <div className="mt-8 space-y-4 rounded-xl border px-10 py-8 shadow-lg">
              {/* Rules */}
              <div className="space-y-3">
                <p className="text-lg font-medium">Rules</p>
                <div>
                  &#8226; Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Sint, molestiae!
                </div>
                <div>
                  &#8226; Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Maiores mollitia soluta reiciendis laudantium, ipsum
                  cumque.
                </div>
                <div>&#8226; Lorem ipsum dolor sit amet.</div>
              </div>

              {/*In / Out Buttons */}
              <div className="mt-10 flex justify-center gap-8">
                <BigGreenButton extraStyles="">
                  <div className="w-12">In</div>
                </BigGreenButton>
                <BigGreenButton>
                  <div className="w-12">Out</div>
                </BigGreenButton>
              </div>

              {/* Log table */}
              <LogTable2 data={currentPosts} />
              <Pagination
                totalPosts={SampleData.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}

              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Attendance;

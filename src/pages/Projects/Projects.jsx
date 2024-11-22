import React from "react";
import { LiaCheckDoubleSolid } from "react-icons/lia";
import Messages from "../../sharedLayouts/Messages";

import img1 from "../../assets/img1.jpg";
import SearchBar from "../../components/SearchBar";

const info = [
  {
    name: "Ogunjirin M. Boluwatife",
    summary: "Sent you reports for week 2",
    images: img1,
    duration: "10 mins",
    id: 1,
  },
  {
    name: "Ogunjirin M. Boluwatife",
    summary: "Sent you reports for week 2",
    images: img1,
    duration: "1 day",
    id: 2,
  },
  {
    name: "Ogunjirin M. Boluwatife",
    summary: "Sent you reports for week 2",
    images: img1,
    duration: "1 day",
    id: 3,

  },
  {
    name: "Ogunjirin M. Boluwatife",
    summary: "Sent you reports for week 2",
    images: img1,
    duration: "1 day",
    id: 4,
  },
  {
    name: "Ogunjirin M. Boluwatife",
    summary: "Sent you reports for week 2",
    images: img1,
    duration: "1 day",
    id: 5,
  },
  {
    name: "Ogunjirin M. Boluwatife",
    summary: "Sent you reports for week 2",
    images: img1,
    duration: "1 day",
    id: 6,
  },
];

const Projects = () => {
  return (
    <>
      <div>
        <div className="container">
          <div className="mt-12 flex justify-between">

            {/* Back Arrow and Search Bar */}
            <div className="flex items-center gap-2 w-full">
              <button className="bg-[#FFa500] p-3 rounded-full">
                <FaArrowLeft className=" text-white text-4xl" />
              </button>
              {/* <div className="relative w-3/5 p-3 border border-black rounded-full">
                <input
                  type="text"
                  placeholder="Search for tasks, projects ..."
                  className="w-full rounded-full  px-3 py-1 focus:outline-none"
                />
                <IoMdSearch className="text-4xl text-[#FFa500] absolute top-1/2 -translate-y-1/2 right-1" />
              </div> */}
              <SearchBar />
            </div>
            {/* Profile Pic */}
            <div>
              <img
                src={profile}
                alt=""
                className="h-16 w-16 rounded-full object-cover"
              />
            </div>
          </div>

          {/* Header */}
          <div className="mt-8">
            <div className="uppercase font-bold text-2xl">
              weekly activity reports
            </div>
            <hr className="bg-black" />

            {/* Content */}
            <div className="mt-6">
              <div className="flex justify-between items-center">
                <div className="flex gap-2 font-semibold">
                  <div className="underline ">Unread</div>{" "}
                  <div className="bg-[#FFa500] text-white flex items-center justify-center rounded-full w-6 h-6 text-center">
                    6
                  </div>
                </div>
                <div className="flex gap-1">
                  <LiaCheckDoubleSolid className=" text-green-700" />
                  <p>mark all as read</p>
                </div>
              </div>

              {/* Messages */}
              <section>

                <Messages
                  info={info}
                  to='/home/projects'
                // name={item.name}
                // summary={item.summary}
                // images={item.images}
                // duration={item.duration}
                ></Messages>

              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


export default Projects;
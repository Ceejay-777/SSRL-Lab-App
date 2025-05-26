import { useState, useEffect } from "react";
import { useRequest } from "../../Modules/useRequest";
import { useUserData } from "../../Modules/UserContext";
import { setSessionStorage } from "../../Modules/getSessionStorage";
import Welcome from "./components/Welcome";
import Projects from "./components/Projects";
import Reports from "./components/Reports";
import Requests from "./components/Requests";
import Todo from "./components/Todo";
import Notifications from "./components/Notifications";
import Spinner from "../../components/Spinner";

const Dashboard = () => {
  const [name, setName] = useState("");
  const [projects, setProjects] = useState([]);
  const [reports, setReports] = useState([]);
  const [requests, setRequests] = useState([]);
  const [todos, setTodos] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [
    sendProfileRequest,
    profileLoading,
    setProfileLoading,
    profileError,
    setProfileError,
  ] = useRequest();

  const { userId, setUnread } = useUserData();

  const getProfile = async () => {
    setProfileLoading(true);
    const res = await sendProfileRequest("home");

    const data = await res.json();
    if (res.ok) {
      if (data) {
        const {
          firstname,
          user_role,
          notifications,
          projects,
          reports,
          requests,
          stack,
          todos,
          unread
        } = data;
        setSessionStorage("userRole", user_role);
        setSessionStorage("userStack", stack);
        setName(firstname);
        setNotifications(notifications);
        setProjects(projects);
        setReports(reports);
        setRequests(requests);
        setTodos(todos);
        setUnread(unread)
      }
      console.log(data);
    } else {
      setProfileError({ status: "true", msg: data.message });
    }
    setProfileLoading(false);
  };

  useEffect(() => {
    getProfile();
  }, []);



  return (
    <div className="fromLeft p-2 min-h-screen">
      {profileLoading && (
        <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-75 z-50">
          <div className="flex flex-col items-center">
            <Spinner size={50} />
            <p className="mt-4 text-gray-600">Loading your dashboard...</p>
          </div>
        </div>
      )}

      {profileError.status && (
        <p className="text-red-500">
          Couldn&apos;t load your dashboard. {profileError.msg} <span className="hover:underline cursor-pointer" onClick={getProfile}>Retry?</span>
        </p>
      )}

      <div className="flex w-full flex-col  gap-10 md:flex-row">
        <div className="w-full px-6 py-2 md:w-1/2 lg:w-2/5 flex flex-col gap-8">
          <Welcome name={name} />
          <Projects projects={projects} />
          <Reports reports={reports} userId={userId} />
        </div>
        <div className="w-full md:flex-grow py-2 px-6 flex-col flex gap-8">
          <Notifications
            notifications={notifications}
            setNotifications={setNotifications}
          />
          <Todo todos={todos} />
          <Requests requests={requests} userId={userId} />
        </div>
      </div>
    </div>
  );


};

export default Dashboard;

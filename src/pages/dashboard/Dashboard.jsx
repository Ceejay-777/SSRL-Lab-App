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

const Dashboard = () => {
  const [name, setName] = useState("");
  const [data, setData] = useState();
  const [projects, setProjects] = useState([]);
  const [reports, setReports] = useState([]);
  const [requests, setRequests] = useState([]);
  const [todos, setTodos] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [
    sendProfileRequest,
    profileLoading,
    setProfileLoading,
    profileError,
    setProfileError,
  ] = useRequest();

  const { userId } = useUserData();

  const getProfile = async () => {
    setProfileLoading(true);
    const res = await sendProfileRequest("home");

    console.log(res);
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
          todos
        } = data;
        setSessionStorage("userRole", user_role);
        setSessionStorage("userStack", stack);
        setName(firstname);
        setNotifications(notifications);
        setProjects(projects);
        setReports(reports);
        setRequests(requests);
        setTodos(todos);
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

  // set the date

  return (
    <div className="p-2 fromLeft">
      {profileError.status && (
        <p className="text-red-500">
          Couldn&apos;t load your dashboard. {profileError.msg} <span className="hover:underline cursor-pointer" onClick={getProfile}>Retry?</span>
        </p>
      )}
      <div className="flex w-full flex-col items-center justify-start gap-10 overflow-y-auto md:flex-row md:items-start ">
        <div className="w-2/3 min-w-[370px] space-y-6 px-6 py-2 md:w-1/2 lg:w-2/5 ">
          <Welcome name={name} />
          <Projects projects={projects} />
          <Reports reports={reports} userId={userId} />
          <Requests requests={requests} userId={userId} />
        </div>
        <div className="flex-grow py-2">
          <Notifications notifications={notifications} setNotifications={setNotifications} />
          <Todo todos={todos} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

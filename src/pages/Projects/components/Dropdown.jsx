import { useState, useRef, useEffect } from "react";
import {
  Bell,
  CheckCircle,
  EditIcon,
  EllipsisVertical,
  Loader2,
  Trash2,
  XCircle,
} from "lucide-react";
import { useRequest } from "../../../Modules/useRequest";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { useUserData } from "../../../Modules/UserContext";
import { getSessionStorage } from "../../../Modules/getSessionStorage";
import Announcement from "../pages/Announcement";
import { Speech } from "lucide-react";
import { Pen } from "lucide-react";

const Dropdown = ({ completed, id, project}) => {
  const { leads } = project;
  const userId = useUserData();
  const userRole = getSessionStorage("userRole", "");
  const authorized =
    userRole === "Admin" ||
    userRole === "Lead" ||
    leads.some((lead) => lead.id === userId);
  const [isDropOpen, setIsDropOpen] = useState(false);
  const { isCompleted, setIsCompleted } = completed;

  const [completeRequest, completeLoading, setCompleteLoading, completeError] =
    useRequest();
  const [
    deleteRequest,
    deleteLoading,
    setDeleteLoading,
    deleteError,
    setDeleteError,
  ] = useRequest();
  const navigate = useNavigate();
   const DropdownRef = useRef(null);
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (DropdownRef.current && !DropdownRef.current.contains(event.target)) {
          setIsDropOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
  

  const handleComplete = async () => {
    setCompleteLoading(true);
    try {
      const res = await completeRequest(
        `project/${isCompleted ? "incomplete" : "completed"}/${id}`,
        "PATCH",
      );
      const data = await res.json();

      if (res.ok) {
        setIsCompleted(!isCompleted);
        toast.success(data.message);
      } else {
        console.log(data.message);
        toast.error(data.message);
      }
    } catch {
      toast.error(completeError.msg);
    }
    setCompleteLoading(false);
  };

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      const res = await deleteRequest(`project/delete/${id}`, "DELETE");
      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);
        setTimeout(() => {
          navigate(-1);
        }, 2000);
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error(deleteError.msg);
    }
    setDeleteLoading(false);
  };

  return (
    <div className="absolute right-2 top-[10px] z-40">
      <div className="relative">
        <button onClick={() => setIsDropOpen(!isDropOpen)} className="dropdown">
          <EllipsisVertical className="text-black" />
        </button>
        {isDropOpen && (
          <div className="absolute right-0 top-6 z-50 mt-2 w-max rounded-lg border bg-white font-medium shadow-lg transition-all duration-300 ease-in" ref={DropdownRef} >
            <div>
              {authorized && (
                <Link to={`/home/projects/edit/${id}`} state={project}>
                  <button className="flex w-full items-center gap-2 border-b px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <EditIcon />
                    <span>Edit Project</span>
                  </button>
                </Link>
              )}
              <div onClick={handleComplete}>
                {!isCompleted ? (
                  <button className="flex w-full items-center gap-2 border-b px-4 py-2 text-sm text-green-700 hover:bg-green-100">
                    <CheckCircle size={20} />
                    <span>Mark as complete</span>
                    {completeLoading && (
                      <Loader2 className="animate-spin" size={16} />
                    )}
                  </button>
                ) : (
                  <button className="flex w-full items-center gap-2 border-b px-4 py-2 text-sm text-yellow-600 hover:bg-yellow-100">
                    <XCircle />
                    <span>Mark as incomplete</span>
                    {completeLoading && (
                      <Loader2 className="animate-spin" size={16} />
                    )}
                  </button>
                )}
              </div>

              {authorized && (
                <Link to={`/home/projects/announcement/${id}`} state={{name:project.name, id:project._id}}>
                  <button className="flex w-full items-center gap-2 border-b px-4 py-2 text-sm text-black hover:bg-gray-100">
                    <Speech />
                    <span>Make Announcement</span>
                  </button>
                </Link>
              )}

              {authorized && (
                <Link to={`/home/projects/give_feedback/${id}`} state={{name:project.name, id:project._id}}>
                  <button className="flex w-full items-center gap-2 border-b px-4 py-2 text-sm text-black hover:bg-gray-100">
                    <Pen />
                    <span>Give Feeback</span>
                  </button>
                </Link>
              )}


              <button
                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                onClick={handleDelete}
              >
                <Trash2 />
                <span>Delete Project</span>
                {deleteLoading && (
                  <Loader2 className="animate-spin" size={16} />
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Dropdown;

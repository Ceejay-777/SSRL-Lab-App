import { useState, useRef, useEffect } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { getSessionStorage } from "../../../Modules/getSessionStorage";
import {
  Edit,
  Loader,
  Loader2,
  LoaderCircle,
  Trash2,
  TriangleAlert,
  UserRoundCog,
  UserRoundPlus,
} from "lucide-react";
import { useRequest } from "../../../Modules/useRequest";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const DropDownMenu = ({ role, suspended, profile }) => {
  const [setProfileRole, profileRole] = role
  const [suspend, setSuspend] = suspended
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userRole = getSessionStorage("userRole", "");
  const [useAdminRequest, adminLoading, setAdminLoading] = useRequest();
  const [useLeadRequest, leadLoading, setLeadLoading] = useRequest();
  const [useDeleteRequest, deleteLoading, setDeleteLoading] = useRequest();
  const [useSuspendRequest, suspendLoading, setSuspendLoading] = useRequest();
  const navigate = useNavigate()

  const DropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (DropdownRef.current && !DropdownRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLead = async () => {
    const lead = profileRole === "Lead";
    setLeadLoading(true);
    const res = await useLeadRequest(
      `${profileRole !== "Lead" ? "add" : "remove"}_lead/${profile.uid}`,
      "PATCH",
    );
    const data = await res.json();

    if (res.ok) {
      setProfileRole(lead ? "Intern" : "Lead");
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
    setLeadLoading(false);
  };

  const handleAdmin = async () => {
    const admin = profileRole === "Admin";
    setAdminLoading(true);
    const res = await useAdminRequest(
      `${profileRole !== "Admin" ? "add" : "remove"}_admin/${profile.uid}`,
      "PATCH",
    );
    const data = await res.json();

    if (res.ok) {
      setProfileRole(admin ? "Intern" : "Admin");
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
    setAdminLoading(false);
  };

  const handleDelete = async () => {
    setDeleteLoading(true);
    const res = await useDeleteRequest(
      `admin/delete_user/${profile.uid}`,
      "PATCH"
    );
    const data = await res.json();

    if (res.ok) {
      toast.success(data.message);
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } else {
      toast.error(data.message);
    }
    setDeleteLoading(false);
  };

  const handleSuspend = async () => {
    setSuspendLoading(true);
    console.log(suspend);
    const res = await useSuspendRequest(
      `admin/${suspend === "True" ? "unsuspend" : "suspend"}_user/${profile.uid}`,
      "PATCH",
    );
    const data = await res.json();

    if (res.ok) {
      setSuspend(suspend === "False" ? "True" : "False");
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
    setSuspendLoading(false);
  };

  return (
    <div
      className={`absolute right-10 top-10 ${userRole !== "Intern" ? "block" : "hidden"
        }`}
    >
      <div className="relative">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <FaEllipsisV color="white" size={20} />
        </button>
        {isMenuOpen && (
          <div className="absolute right-0 top-6 z-50 mt-2 w-max rounded border bg-white font-medium shadow-lg transition-all duration-300 ease-in" ref={DropdownRef}>
            <div>
              <Link
                className={`flex w-full items-center gap-2 border-b px-4 py-2 text-sm text-zinc-700 hover:bg-gray-100`}
                to={`/home/personnel/edit/:id`}
                state={profile}
              >
                <Edit />
                <p>Edit</p>
              </Link>

              <button
                className="flex w-full items-center gap-2 border-b px-4 py-2 text-sm text-zinc-700 hover:bg-green-50"
                onClick={handleLead}
              >
                <UserRoundPlus />
                {/* <span>Make a Lead</span> */}
                <span>
                  {profileRole !== "Lead" ? "Make a Lead" : "Remove Lead"}
                </span>

                {leadLoading && <Loader2 className="animate-spin" size={16} />}
              </button>

              {userRole !== "Lead" && (
                <>
                  <button
                    className="flex w-full items-center gap-2 border-b px-4 py-2 text-sm hover:bg-green-50"
                    onClick={handleAdmin}
                  >
                    <UserRoundCog />
                    <span>
                      {profileRole !== "Admin"
                        ? "Make an Admin"
                        : "Remove Admin"}
                    </span>
                    {adminLoading && (
                      <Loader2 className="animate-spin" size={16} />
                    )}
                  </button>

                  <button
                    className="flex w-full items-center gap-2 border-b px-4 py-2 text-sm text-zinc-700 hover:bg-yellow-50"
                    onClick={handleSuspend}
                  >
                    <TriangleAlert color="gold" />
                    <span>{suspend === "True" ? "Unsuspend" : "Suspend"}</span>
                    {suspendLoading && (
                      <Loader2 className="animate-spin" size={16} />
                    )}
                  </button>

                  <button
                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    onClick={handleDelete}
                  >
                    <Trash2 color="red" />
                    <span>Delete</span>
                    {deleteLoading && (
                      <Loader2
                        className="animate-spin justify-self-end"
                        size={16}
                      />
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropDownMenu;

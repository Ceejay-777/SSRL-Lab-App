import React, { useState } from "react";
import TaskLabel from "./TaskLabel";
import { Edit } from "lucide-react";
import { MinusCircle } from "lucide-react";
import { useRequest } from "../../../Modules/useRequest";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

const TaskCard = ({ tasks, tasky, setTasks }) => {
  const [task, setTask] = useState(tasky);
  const { id, todo } = task;
  const [checked, setChecked] = useState(false);
  const [edit, setEdit] = useState(false);

  const [deleteRequest, deleteLoading, setDeleteLoading] = useRequest();
  const [checkRequest, checkLoading, setCheckLoading] = useRequest();

  const handleDelete = async () => {
    setDeleteLoading(true);
    const res = await deleteRequest(`todo/delete/${id}`, "DELETE");
    const data = await res.json();

    if (res.ok) {
      toast.success("Deleted successfully");
      setTasks(tasks.filter((task) => task.id != id));
    } else {
      toast.error(data.message);
    }
    setDeleteLoading(false);
  };

  const handleChecked = async (e) => {
    const checked = e.target.checked;
    setCheckLoading(true);

    const res = await checkRequest(`todo/change_status/${id}`, "PATCH", {
      status: checked,
    });
    const data = await res.json();

    console.log(data);
    setChecked(checked);
    setCheckLoading(false);
  };

  const handleEdit = (e) => {
    setEdit(!edit);
  };

  return (
    <>
      <div
        className={`m-2 flex items-center justify-between rounded-md border border-transparent px-2 hover:border-zinc-200 hover:shadow-lg`}
        key={id}
      >
        <div
          className={`flex w-full item-center justify-start gap-4 px-2 py-1 transition-transform duration-500 ease-in-out ${!edit ? "fromRight" : "fromLeft"}`}
        >
          {checkLoading ? (
            <Loader className="animate-spin text-navBg2 self-center" />
          ) : (
            !edit && (
              <input
                type="checkbox"
                name=""
                checked={checked}
                id={id}
                className="w-5 border-2"
                onChange={handleChecked}
              />
            )
          )}

          <TaskLabel
            id={id}
            value={todo}
            onChange={(e) => setTask({ ...task, todo: e.target.value })}
            placeholder="Enter task"
            required={true}
            checked={checked}
            edit={edit}
            handleEdit={() => setEdit(!edit)}
          />
        </div>
        <div className="item-center flex justify-center gap-2">
          {/* Edit */}
          {checked || edit || (
            <Edit onClick={handleEdit} className="hover:scale-110" />
          )}
          {/* delete */}
          {deleteLoading ? (
            <Loader className="animate-spin text-navBg2" />
          ) : (
            <MinusCircle
              onClick={handleDelete}
              color="red"
              className="hover:scale-110"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default TaskCard;

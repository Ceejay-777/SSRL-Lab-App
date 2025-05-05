import React, { useState } from "react";
import TaskCard from "./components/TaskCard";
import { data } from "./testData";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import { useRequest } from "../../Modules/useRequest";
import { useEffect } from "react";
import { Loader } from "lucide-react";

const ToDo = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTab, setNewTaskTab] = useState(false);
  const [todo, setTodo] = useState("");

  const [
    createRequest,
    createLoading,
    setCreateLoading,
    createError,
    setCreateError,
  ] = useRequest();

  const [todoRequest, todoLoading, setTodoLoading] = useRequest();

  const getAllTodos = async () => {
    const res = await todoRequest("todo/get_all");
    const data = await res.json();

    if (res.ok) {
      setTasks(data.todos);
      console.log(data.todos);
    }
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setCreateLoading(true);
    if (!todo) {
      toast.error("Enter a new to-do");
      setCreateLoading(false);
      return;
    }

    const res = await createRequest("todo/create", "POST", {
      todo,
    });

    const data = await res.json();

    if (res.ok) {
      toast.success(data.message);

      const newTask = { id: data.id, todo };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);

      setTodo("");
    } else {
      setCreateError({ msg: data.message, status: true });
      toast.error(data.message);
    }

    setCreateLoading(false);
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="mt-4 px-4 py-2">
          {/* Header */}
          <div>
            <div className="relative z-10 flex items-center justify-between">
              <h1 className="text-2xl font-medium uppercase">To-Do Lists</h1>
              <button
                className={`flex items-center gap-2 p-2 text-lg font-medium transition-all duration-300 hover:rounded-lg hover:bg-neutral-100`}
                onClick={() => setNewTaskTab(!newTaskTab)}
              >
                <span>Add Task</span>
                <div className="rounded-full bg-logo p-[2px]">
                  <Plus color="white" />
                </div>
              </button>
            </div>
            <hr className="mb-5 mt-1 bg-black" />
          </div>

          {/* Content */}
          <div
            className={`-translate-y-16 ${newTaskTab && "translate-y-0"} transition-transform duration-500 ease-out`}
          >
            {/* Create New Task */}
            <div
              className={`mb-6 opacity-0 ${newTaskTab && "opacity-100"} duration-400 transition-opacity ease-in`}
            >
              <form className="flex space-x-2" onSubmit={handleCreate}>
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-navBg2"
                  placeholder="Enter a new to-do"
                  value={todo}
                  onChange={(e) => setTodo(e.target.value)}
                />
                <button
                  className="flex min-w-[90px] justify-center rounded-xl border bg-navBg2 px-4 py-2 font-medium text-white"
                  type="submit"
                >
                  {createLoading ? (
                    <Loader className="animate-spin text-white" />
                  ) : (
                    "Create"
                  )}
                </button>
              </form>
            </div>

            {/* Tasks */}
            <div>
              {tasks.map((task) => {
                // console.log(task)
                return (
                  <TaskCard
                    tasks={tasks}
                    tasky={task}
                    setTasks={setTasks}
                    key={task.id}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToDo;

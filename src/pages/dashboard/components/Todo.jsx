import { MinusCircle } from "lucide-react";
import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import TaskCard from "../../Todo/components/TaskCard";
import { useState } from "react";

const Todo = ({ todos }) => {
  const [tasks, setTasks] = useState(todos);
  return (
    <div className="flex flex-col gap-1 shadow-lg p-6 rounded-2xl text-left border">
      <h2 className=" text-xl font-semibold">To-do list</h2>

      <ul className="flex flex-col ">
        {todos.length > 0 ? (
          todos.slice(0, 2).map((todo) => {
            // console.log(todo);

            return (
              <TaskCard tasks={tasks} setTasks={setTasks} tasky={todo} key={todo.id} />
            )
          })
        ) : (
          <p>Loading to-do items...</p>
        )}
      </ul>
      <Link
        to={`/home/to-do`}
        className=" text-logo block text-right text-sm mt-6 hover:underline transition-all duration-300 ease-in"
      >
        See all...
      </Link>
    </div>
  );
};

export default Todo;

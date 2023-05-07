import { useState } from "react";

export default function App() {
  const [addTodo, setAddTodo] = useState("");
  const [toDos, setToDos] = useState([]);

  function defaultHandler(e) {
    e.preventDefault();

    // adding a new to do list
    setToDos((currentToDos) => {
      return [
        ...currentToDos,
        {
          id: crypto.randomUUID(),
          title: addTodo,
          completed: false,
        },
      ];
    });
    setAddTodo("");
  }

  // checking the current List of Todo items (check || uncheck)
  function toggleTodo(id, completed) {
    setToDos((currentToDos) => {
      return currentToDos.map((todoItems) => {
        if (todoItems.id === id) {
          return { ...todoItems, completed };
        }
        return todoItems;
      });
    });
  }

  // deleting Todo items id wise
  function deleteTodo(id) {
    setToDos((currentToDos) => {
      return currentToDos.filter((todoItems) => todoItems.id !== id);
    });
  }

  return (
    <>
      <form onSubmit={defaultHandler}>
        <div className="p-4 h-[70%] grid justify-items-center">
          <div className="text-center m-2 ">
            <label
              className="text-[1.5rem] mb-4 py-4 text-white"
              htmlFor="item"
            >
              📖To Do App
            </label>
            <div className="">
              <input
                value={addTodo}
                onChange={(e) => setAddTodo(e.target.value)}
                className="rounded-sm p-2 w-[23rem]"
                type="text"
              />
            </div>
          </div>

          <div className="m-2">
            <button className="bg-[#6d28d9] text-white rounded-sm p-2">
              Add To Do's
            </button>
          </div>
        </div>
      </form>

      <div className="flex items-center justify-center mt-8 text-white flex-col text-[1.5rem]">
        <div>
          <h1 className="font-semibold">To-Do-List 📜</h1>
        </div>

        <div className="mt-[2rem]">
          <ul className="flex flex-col gap-4">
            {toDos.length === 0 && "No To Do's Available Yet✅"}
            {toDos.map((todoItems) => {
              return (
                <li key={todoItems.id}>
                  <label className="">
                    <input
                      className="h-6 w-6 accent-[#6d28d9] bg-grey-700 text-red-500  rounded cursor-pointer "
                      type="checkbox"
                      checked={todoItems.completed}
                      onChange={(e) =>
                        toggleTodo(todoItems.id, e.target.checked)
                      }
                    />
                    <span className="pr-2"></span> {todoItems.title}
                  </label>
                  <button
                    onClick={() => deleteTodo(todoItems.id)}
                    className=" rounded-sm bg-[#6d28d9] px-2 ml-10"
                  >
                    Delete
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

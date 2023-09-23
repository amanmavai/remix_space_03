import * as React from "react";
import {useState, useRef, FormEvent} from "react";
import {Button} from "~/components/ui/button";
import {Input} from "~/components/ui/input";
import {cn} from "~/lib/utils";

export const VISIBILITY_FILTERS = {
  ALL: "all",
  COMPLETED: "completed",
  ACTIVE: "active",
};

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedFilter, setFilter] = useState(VISIBILITY_FILTERS.ALL);
  const nextId = useRef<number>(1);
  const inputRef = useRef<HTMLInputElement>(null);

  const addTodo = (text: string) => {
    setTodos((prev) => [
      ...prev,
      {
        id: nextId.current++,
        text,
        completed: false,
      },
    ]);
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? {...todo, completed: !todo.completed} : todo)));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = inputRef.current?.value || "";
    if (text) {
      addTodo(text);
      inputRef.current!.value = "";
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-200">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h1 className="text-3xl mb-4">Todos List</h1>
        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
          <Input type="text" ref={inputRef} placeholder="New todo..." aria-label="todo-text" />
          <Button type="submit" className="rounded">
            Add
          </Button>
        </form>
        <ul className="list-disc list-inside">
          {getVisibleTodos(todos, selectedFilter).map(({id, text, completed}) => (
            <li
              key={id}
              className={cn(`cursor-pointer`, completed && "line-through")}
              onClick={() => toggleTodo(id)}
              data-testid="todo-item"
            >
              {text}
            </li>
          ))}
        </ul>

        <Footer selectedFilter={selectedFilter} setFilter={setFilter} />
      </div>
    </div>
  );
};

export const getVisibleTodos = (todos: Todo[], filter: string) => {
  console.log(`getVisibleTodos: todos=${todos} filter=${filter}`);
  switch (filter) {
    case VISIBILITY_FILTERS.ALL:
      return todos;
    case VISIBILITY_FILTERS.COMPLETED:
      return todos.filter((t) => t.completed);
    case VISIBILITY_FILTERS.ACTIVE:
      return todos.filter((t) => !t.completed);
  }
  return [];
};

export function Link({
  active,
  children,
  onFilterClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onFilterClick: () => void;
}) {
  if (active) return <span className="text-lg">{children}</span>;
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onFilterClick();
      }}
      className="text-blue-400 font-semibold text-lg"
    >
      {children}
    </a>
  );
}

export const Footer = ({
  selectedFilter,
  setFilter,
}: {
  selectedFilter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <p className="flex justify-center gap-4">
      <Link
        onFilterClick={() => {
          setFilter(VISIBILITY_FILTERS.ALL);
        }}
        active={selectedFilter === VISIBILITY_FILTERS.ALL}
      >
        All
      </Link>
      <Link
        onFilterClick={() => {
          setFilter(VISIBILITY_FILTERS.ACTIVE);
        }}
        active={selectedFilter === VISIBILITY_FILTERS.ACTIVE}
      >
        Active
      </Link>
      <Link
        onFilterClick={() => {
          setFilter(VISIBILITY_FILTERS.COMPLETED);
        }}
        active={selectedFilter === VISIBILITY_FILTERS.COMPLETED}
      >
        Completed
      </Link>
    </p>
  );
};

export default App;

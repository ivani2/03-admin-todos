import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";

export const metadata = {
  title: "Todos",
  description: "Pagina con todos los todos",
  keywords: ["todos", "todos page"],
};

export default async function RestTodosPage() {
  const todos = await prisma.todo.findMany({ orderBy: { description: "asc" } });

  return (
    <>
      <div>
        <div className="w-full flex px-3 mx-5 mb-5">
          <NewTodo />
        </div>
        <TodosGrid todos={todos} />
      </div>
    </>
  );
}

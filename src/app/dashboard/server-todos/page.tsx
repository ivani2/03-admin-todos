export const dynamic = "force-dynamic";
export const revalidate = 0;

import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";

export const metadata = {
  title: "Server Todos",
  description: "Pagina con todos los todos server",
  keywords: ["todos", "todos page"],
};

export default async function ServerTodosPage() {
  const todos = await prisma.todo.findMany({ orderBy: { description: "asc" } });

  console.log("construido");
  return (
    <>
      <span className="text-3xl  mb-10">Server actions</span>
      <div>
        <div className="w-full flex px-3 mx-5 mb-5">
          <NewTodo />
        </div>
        <TodosGrid todos={todos} />
      </div>
    </>
  );
}

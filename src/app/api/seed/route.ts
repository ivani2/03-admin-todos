import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const deleteTodo = await prisma.todo.deleteMany();

  //   const todo = await prisma.todo.create({
  //     data: { description: "Obtener gema de poder", complete: true },
  //   });

  const todo = await prisma.todo.createMany({
    data: [
      { description: "Obtener gema de poder", complete: true },
      { description: "obtener gema de tiempo" },
      { description: "obtener gema de espacio" },
      { description: "obtener gema de realidad" },
      { description: "obtener gema de mente" },
      { description: "obtener gema de alma" },
    ],
  });

  console.log(todo);

  return Response.json({ message: "Seed executed" });
}

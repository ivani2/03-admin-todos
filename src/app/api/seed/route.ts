import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET(request: Request) {
  const deleteTodo = await prisma.todo.deleteMany();
  const deleteUsers = await prisma.user.deleteMany();

  const user = await prisma.user.create({
    data: {
      email: "test1@google.com",
      password: bcrypt.hashSync("nuevo"),
      roles: ["admin", "client", "super-user"],
      todos: {
        create: [
          { description: "Obtener gema de poder", complete: true },
          { description: "Obtener gema de tiempo" },
          { description: "Obtener gema de espacio" },
          { description: "Obtener gema de realidad" },
          { description: "Obtener gema de mente" },
          { description: "Obtener gema de alma" },
        ],
      },
    },
  });

  return Response.json({ message: "Seed executed" });
}

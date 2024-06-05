import { getUserSessionServer } from "@/auth/actions/auth-actions";
import prisma from "@/lib/prisma";
import * as yup from "yup";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const take = Number(searchParams.get("take") ?? "10");
  const skip = Number(searchParams.get("skip") ?? "0");
  if (isNaN(take)) {
    return Response.json({ error: "Take must be a number" }, { status: 400 });
  }
  if (isNaN(skip)) {
    return Response.json({ error: "Skip must be a number" }, { status: 400 });
  }

  const todos = await prisma.todo.findMany({
    skip,
    take,
  });

  return Response.json({ method: "GET", message: "all todos", todos: todos });
}

const postSchema = yup.object({
  description: yup.string().required(),
  complete: yup.boolean().optional().default(false), //! TODO mostrar algo interesante
});

export async function POST(request: Request) {
  try {
    /*
    Esta es una alternativa para cuando Prisma
    no validaba campos que no estuviesen declarados
    en el model.schema, pero ya no es necesario
    */
    // const {complete, description} = await postSchema.validate(await request.json());

    // const todo = await prisma.todo.create({
    //   data: {complete, description},
    // });

    const user = await getUserSessionServer();

    if (!user) {
      return Response.json({ message: "Not authorized" }, { status: 401 });
    }

    const { complete, description } = await postSchema.validate(
      await request.json()
    );
    const todo = await prisma.todo.create({
      data: { complete, description, userId: user.id },
    });
    return Response.json({
      method: "POST",
      message: "create todo",
      todo: todo,
    });
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 400 });
  }
}
const deleteSchema = yup.object({
  id: yup.string().required(),
});
export async function DELETE(request: Request) {
  const user = await getUserSessionServer();

    if (!user) {
      return Response.json({ message: "Not authorized" }, { status: 401 });
    }

  try {
    const todo = await prisma.todo.deleteMany({
      where: {
        complete: true,
        userId: user.id,
      },
    });
    return Response.json({
      method: "DELETE",
      message: "delete todo",
      todo: todo,
    });
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 400 });
  }
}

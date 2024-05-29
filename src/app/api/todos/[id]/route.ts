import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import * as yup from "yup";

interface REST {
  params: Params;
}

interface Params {
  id: string;
}

const getTodo = async (id: string): Promise<Todo | null> => {
  const result = await prisma.todo.findUnique({ where: { id } });
  return result;
};

export async function GET(request: Request, ...rest: REST[]) {
  const params = rest[0].params;
  const { id } = params;

  const result = await getTodo(id);

  if (!result) {
    return Response.json(
      { message: `Todo with ID: ${id} not found.`, id: id },
      { status: 404 }
    );
  } else {
    return Response.json({ message: "todos/id", data: result, id: id });
  }
}

const putSchema = yup.object({
  complete: yup.boolean().optional(),
  description: yup.string().optional(),
});
export async function PUT(request: Request, ...rest: REST[]) {
  const params = rest[0].params;
  const { id } = params;

  const result = await getTodo(id);

  if (!result) {
    return Response.json(
      { message: `Todo with ID: ${id} not found.`, id: id },
      { status: 404 }
    );
  } else {
    try {
      const { complete, description } = await putSchema.validate(
        await request.json()
      );
      const updatedTodo = await prisma.todo.update({
        where: { id },
        data: { complete, description },
      });
      return Response.json({
        message: "updated todo at todos/id/update",
        data: updatedTodo,
        id: id,
      });
    } catch (error: any) {
      return Response.json({ message: error.message }, { status: 400 });
    }
  }
}

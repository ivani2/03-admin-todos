import prisma from "@/lib/prisma";

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

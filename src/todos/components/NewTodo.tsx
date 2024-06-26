"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { IoTrashOutline } from "react-icons/io5";
import { createTodo, deleteCompletedTodos } from "@/todos/actions/todo-actions";
import * as apiTodos from "@/todos/helpers/todos";

export const NewTodo = () => {
  const [description, setDescription] = useState("");
  const router = useRouter();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (description.trim().length === 0) {
      return;
    }
    // const createdTodo = await createTodo(description, user.id);
    const createdTodo = await apiTodos.createTodo(description);
    router.refresh();
    setDescription("");
  };

  const deleteCompleted = async () => {
    // const deletedTodos = await apiTodos.deleteCompletedTodos();
    // router.refresh();
    await deleteCompletedTodos();
  };

  return (
    <form onSubmit={onSubmit} className="flex w-full">
      <input
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        type="text"
        className="w-6/12 -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
        placeholder="¿Qué necesita ser hecho?"
      />

      <button
        type="submit"
        className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all"
      >
        Crear
      </button>

      <span className="flex flex-1"></span>

      <button
        onClick={() => deleteCompleted()}
        type="button"
        className="flex items-center justify-center rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all"
      >
        <IoTrashOutline />
        <span className="ml-2"></span>
        Borrar completados
      </button>
    </form>
  );
};

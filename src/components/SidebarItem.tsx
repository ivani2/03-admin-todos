"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  className?: string;
  path: string;
  icon: React.ReactElement;
  title: string;
}
export const SidebarItem = ({ className, icon, title, path }: Props) => {
  const activeClass = "text-white bg-gradient-to-r from-sky-600 to-cyan-400";
  const pathName = usePathname();
  return (
    <>
      <Link
        href={path}
        className={`${className} hover:bg-gradient-to-r from-sky-600 to-cyan-400 ${
          pathName === path ? activeClass : ""
        }`}
      >
        <span className="group-hover:text-white">{icon}</span>
        <span className="group-hover:text-slate-300">{title}</span>
      </Link>
    </>
  );
};

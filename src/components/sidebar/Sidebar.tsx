import Image from "next/image";
import Link from "next/link";

import { SidebarItem } from "./SidebarItem";
import {
  IoBasketOutline,
  IoCalendarOutline,
  IoCheckboxOutline,
  IoCodeWorkingOutline,
  IoListOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { LogoutButton } from "./LogoutButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const menuItems = [
  {
    icon: <IoCalendarOutline size={30} />,
    title: "Dashboard",
    path: "/dashboard",
    className: "relative px-4 py-3 flex items-center space-x-4 rounded-xl",
  },
  {
    icon: <IoCheckboxOutline size={30} />,
    title: "Rest TODOS",
    path: "/dashboard/rest-todos",
    className:
      "px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group",
  },
  {
    icon: <IoListOutline size={30} />,
    title: "Server actions",
    path: "/dashboard/server-todos",
    className:
      "px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group",
  },
  {
    icon: <IoCodeWorkingOutline size={30} />,
    title: "Cookies",
    path: "/dashboard/cookies",
    className:
      "px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group",
  },
  {
    icon: <IoBasketOutline size={30} />,
    title: "Products",
    path: "/dashboard/products",
    className:
      "px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group",
  },
  {
    icon: <IoPersonOutline size={30} />,
    title: "Profile",
    path: "/dashboard/profile",
    className:
      "px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group",
  },
];

export const Sidebar = async () => {
  const session = await getServerSession(authOptions);

  const avatarUrl = session?.user?.image
    ? session.user.image
    : "https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp";

  const userName = session?.user?.name ?? "Cynthia J. Watts (NO NAME)";
  const userEmail = session?.user?.email ?? "No email";
  const userRoles = session?.user?.roles ?? ['No roles'];

  return (
    <>
      <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
        <div>
          <div className="-mx-6 px-6 py-4">
            <Link href="/dashboard" title="home">
              <Image
                src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg"
                className="w-32"
                alt="tailus logo"
                width={100}
                height={100}
              />
            </Link>
          </div>

          <div className="mt-8 text-center">
            <Image
              src={avatarUrl}
              alt=""
              className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
              width={100}
              height={100}
            />
            <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
              {userName}
            </h5>
            <span className="hidden text-gray-400 lg:block capitalize">
              {
                userRoles.join(', ')
              }
            </span>
          </div>

          <ul className="space-y-2 tracking-wide mt-8">
            {menuItems.map((menuItem) => (
              <SidebarItem key={menuItem.title} {...menuItem} />
            ))}
          </ul>
        </div>
        <LogoutButton />
      </aside>
    </>
  );
};

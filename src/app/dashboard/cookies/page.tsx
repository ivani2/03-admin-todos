import { cookies } from "next/headers";
import { TabBar } from "@/components";

export const metadata = {
  title: "Cookies page",
  description: "Cookies page",
  keywords: ["cookies", "cookies page"],
};
export default function CookiesPage() {
  const cookieStore = cookies();
  const cookieTab = Number(cookieStore.get("selectedTab")?.value ?? "1");
  return (
    <>
          <span className="text-3xl">Tabs</span>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex flex-col">
          <TabBar currentTab={cookieTab} />
        </div>
      </div>
    </>
  );
}

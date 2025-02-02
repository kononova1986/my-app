"use client";
import React from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronRight,
  LogOut,
  ClipboardList,
  Flower,
  Dumbbell,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarGroupLabel,
  Separator,
  SidebarMenuSub,
  CollapsibleContent,
  CollapsibleTrigger,
  SidebarMenuSubItem,
  Collapsible,
} from "@/components/ui";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Popup } from "../common/popup";

// Menu items
const items = [
  {
    title: "Workouts",
    url: "/workouts",
    icon: Dumbbell,
  },
  {
    title: "Periods",
    url: "/periods",
    icon: Flower,
  },
];

// Menu subItems
const simulation = [
  {
    title: "Yesterday",
    url: "/yesterday",
  },
  {
    title: "Today",
    url: "/today",
  },
  {
    title: "Tomorrow",
    url: "/tomorrow",
  },
  {
    title: "Week",
    url: "/week",
  },
  {
    title: "Month",
    url: "/month",
  },
  {
    title: "Year",
    url: "/year",
  },
];

export const AppSidebar: React.FC = () => {
  const router = useRouter();
  const pathName = usePathname();
  const [showSubItem, setShowSubItem] = useState(false);

  return (
    <Sidebar>
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupLabel>Your glider</SidebarGroupLabel>
          <SidebarGroupContent>
            <Separator className="mt-6 mb-4" />
            <SidebarMenu>
              <Collapsible open={showSubItem} className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      onClick={() => {
                        setShowSubItem((prev) => !prev);
                      }}
                      tooltip="To do list"
                    >
                      <ClipboardList className="mr-2" />
                      <span>To do list</span>
                      {showSubItem ? (
                        <ChevronDown className="ml-auto" />
                      ) : (
                        <ChevronRight className="ml-auto" />
                      )}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub className="flex flex-col gap-2 ">
                      {simulation.map((item, index) => (
                        <SidebarMenuSubItem
                          key={index}
                          onClick={() => router.push(item.url)}
                          className={cn(
                            " hover:bg-primary/80 hover:text-white p-1 rounded-sm cursor-pointer",
                            pathName.startsWith(item.url) &&
                              "bg-primary/80 text-white"
                          )}
                        >
                          {item.title}
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
              {items.map((item) => (
                <SidebarMenuItem
                  className={cn(
                    "flex h-full",
                    `${
                      pathName.startsWith(item.url)
                        ? "after:h-[32px] after:ml-auto after:border-2 after:border-primary after:rounded-sm"
                        : ""
                    }`
                  )}
                  key={item.title}
                >
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    key={item.title}
                  >
                    <Link
                      href={item.url}
                      className="focus-visible:ring-2 focus-visible:outline-none"
                    >
                      <item.icon className="mr-2" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-white">
        <div className="flex flex-col gap-2 items-center justify-center">
          <Popup
            title="Log out"
            trigger={<LogOut/>}
            variantButton="ghost"
            sizeButton="sm"
            messages="Are you absolutely sure?"
            tooltip="Exit"
            onConfirm={() => router.replace("/login")}
          />
          <p className="text-xs text-center text-gray-500 pb-1">©2025</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import useUser from "@/hooks/use-user";
import { cn } from "@/lib/utils";
import { UserCommunityProps } from "@/types/user";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { LuPlus } from "react-icons/lu";
import { HomeIcon, HomeIconOutline } from "../custom-icons/HomeIcon";
import NotificationIcon from "../custom-icons/NotificationIcon";
import RAvatar from "../ui/avatar-compose";
import { AudioLines } from "lucide-react";

const routes = [
  {
    label: "Home",
    Icon: <HomeIconOutline />,
    activeIcon: <HomeIcon />,
    href: "/",
  },
  {
    label: "Communities",
    Icon: <AudioLines size={16} />,
    activeIcon: <AudioLines size={16} />,
    href: "/communities",
  },
];

interface NavLinkProps {
  className?: string;
  label: string;
  href: string;
  Icon: React.ReactNode;
  activeIcon: React.ReactNode;
}

const NavLink = ({
  className,
  activeIcon,
  Icon,
  label,
  href,
}: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = href !== "/" ? pathname.includes(href) : pathname === href;

  return (
    <li
      className={cn(
        "text-sm text-mako px-4 py-[0.781rem] rounded-md hover:bg-azure",
        className,
        {
          "text-accent bg-azure": isActive,
        }
      )}
    >
      <Link href={href} className={cn("flex items-center space-x-2")}>
        <span className="*:size-4 *:text-current">
          {isActive ? activeIcon : Icon}
        </span>
        <span>{label}</span>
      </Link>
    </li>
  );
};

const Sidebar = ({ className }: { className?: string }) => {
  const { user } = useUser();
  return (
    <aside
      className={cn(
        "hidden lg:block w-full sticky top-0 overflow-auto hide-scrollbar max-w-[17.125rem] py-10 px-8 h-dvh border-r border-gainsboro",
        className
      )}
    >
      <ul className="space-y-3 mb-5">
        {routes.map((route) => (
          <NavLink
            key={route?.label}
            Icon={route?.Icon}
            activeIcon={route?.activeIcon}
            label={route?.label}
            href={route?.href}
          />
        ))}
        {/* <NavLink
          className="lg:hidden"
          Icon={<NotificationIcon />}
          activeIcon={<NotificationIcon />}
          label={"Notifications"}
          href={"/notifications"}
        /> */}
      </ul>
      <Accordion type="multiple" defaultValue={["item-1", "item-2"]}>
        <AccordionItem
          value="item-1"
          className={cn("border-b-0 border-t border-white-smoke-3 pt-2 mb-5", {
            hidden:
              typeof user === "string" ||
              user?.communities?.length === 0 ||
              !user,
          })}
        >
          <AccordionTrigger className="text-xs text-mako px-4 py-[0.625rem] hover:no-underline">
            RECENTLY BROWSED
          </AccordionTrigger>
          <AccordionContent className="space-y-[0.625rem]">
            {user?.communities
              ?.slice(-3)
              .reverse()
              ?.map((community: UserCommunityProps) => (
                <Link
                  key={community._id}
                  href={`/communities/${community?._id}`}
                  className="text-sm px-4 hover:bg-azure rounded-md py-[0.625rem] text-mako flex items-center space-x-2"
                >
                  {community?.logo?.url ? (
                    <RAvatar
                      src={community?.logo?.url}
                      className="inline-block rounded-full size-6 bg-azure"
                    />
                  ) : (
                    <span className="inline-block rounded-full size-6 bg-azure"></span>
                  )}
                  <span className="capitalize">{community.name}</span>
                </Link>
              ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="item-2"
          className={cn("border-b-0 border-t border-white-smoke-3 pt-2")}
        >
          <AccordionTrigger className="text-xs text-mako px-4 py-[0.625rem] hover:no-underline">
            ALL COMMUNITIES
          </AccordionTrigger>
          <AccordionContent>
            <Link
              href="/communities/new"
              className="my-[0.375rem] hover:bg-azure rounded-md flex items-center text-sm px-4 py-[0.625rem] text-mako space-x-2"
            >
              <LuPlus size={18} />
              <span>Create community</span>
            </Link>
            <div className="space-y-[0.625rem]">
              {user?.communities?.map((community: UserCommunityProps) => (
                <Link
                  key={community._id}
                  href={`/communities/${community?._id}`}
                  className="text-sm px-4 hover:bg-azure rounded-md py-[0.625rem] text-mako flex items-center space-x-2"
                >
                  {community?.logo?.url ? (
                    <RAvatar
                      src={community?.logo?.url}
                      className="inline-block rounded-full size-6 bg-azure"
                    />
                  ) : (
                    <span className="inline-block rounded-full size-6 bg-azure"></span>
                  )}
                  <span className="capitalize">{community.name}</span>
                </Link>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
};

export default Sidebar;

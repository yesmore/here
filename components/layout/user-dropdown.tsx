"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  LogOut,
  Link as LinkIcon,
  ExternalLink,
} from "lucide-react";
import Popover from "@/components/shared/popover";
import Image from "next/image";
import { Session } from "next-auth";
import Link from "next/link";
import { UserStory } from "@/lib/types/story";

export default function UserDropdown({
  session,
  story,
}: {
  session: Session;
  story?: UserStory;
}) {
  const { email, image } = session?.user || {};
  const [openPopover, setOpenPopover] = useState(false);

  if (!email) return null;

  return (
    <div className="relative inline-block text-left">
      <Popover
        content={
          <div className="w-full rounded-md bg-white p-2 sm:w-56">
            <button className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100">
              <p className="truncate text-sm">{email}</p>
            </button>

            {story?.nickname !== undefined ? (
              <div onClick={() => setOpenPopover(false)}>
                <Link
                  className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
                  href={`/${story?.nickname}`}
                  target="_blank"
                >
                  <ExternalLink className="h-4 w-4" />
                  <p className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text font-bold text-transparent">
                    Link now
                  </p>
                </Link>
                <Link
                  className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
                  href={`/workspace`}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <p className="text-sm">Workspace</p>
                </Link>
              </div>
            ) : (
              <></>
            )}

            <button
              className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
              onClick={() => signOut()}
            >
              <LogOut className="h-4 w-4" />
              <p className="text-sm">Logout</p>
            </button>
          </div>
        }
        align="end"
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
      >
        <button
          onClick={() => setOpenPopover(!openPopover)}
          className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-gray-300 transition-all duration-75 focus:outline-none active:scale-95 sm:h-9 sm:w-9"
        >
          <Image
            alt={email}
            src={image || `https://avatars.dicebear.com/api/micah/${email}.svg`}
            width={40}
            height={40}
          />
        </button>
      </Popover>
    </div>
  );
}

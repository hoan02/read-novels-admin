"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

import {
  Menu,
  LibrarySquare,
  Loader,
  Bug,
  Flag,
  MessageCircleQuestion,
  FileWarning,
  LucideIcon,
  Users,
  NotebookPen,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/custom-ui/ModeToggle";

type MenuNav = {
  href: string;
  label: string;
  icon: LucideIcon;
};

interface ChildMenuNav {
  name: string;
  items: MenuNav[];
}

const menuNav: ChildMenuNav[] = [
  {
    name: "TRUYỆN",
    items: [
      {
        href: "/cho-duyet",
        label: "Đang chờ duyệt",
        icon: Loader,
      },
      {
        href: "/truyen",
        label: "Danh sách truyện",
        icon: LibrarySquare,
      },
    ],
  },
  {
    name: "TÀI KHOẢN",
    items: [
      {
        href: "/users",
        label: "Tất cả",
        icon: Users,
      },
      {
        href: "/writers",
        label: "Nhà viết truyện",
        icon: NotebookPen,
      },
    ],
  },
  {
    name: "BÁO CÁO & HỖ TRỢ",
    items: [
      {
        href: "/xu-ly-bao-cao",
        label: "Xử lý báo cáo",
        icon: Flag,
      },
      {
        href: "/yeu-cau-ho-tro",
        label: "Yêu cầu hỗ trợ",
        icon: FileWarning,
      },
    ],
  },
  {
    name: "HỆ THỐNG",
    items: [
      {
        href: "/kien-thuc-co-ban",
        label: "Kiến thức cơ bản",
        icon: MessageCircleQuestion,
      },
      {
        href: "/bao-loi",
        label: "Báo lỗi",
        icon: Bug,
      },
    ],
  },
];

const ChildMenuNav = ({ name, items }: ChildMenuNav) => {
  const currentPath = usePathname();
  return (
    <div className="mt-2">
      <p className="my-2 font-bold text-xs text-muted-foreground">{name}</p>
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            href={item.href}
            key={item.label}
            className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${
              currentPath === item.href ? "bg-muted text-primary" : ""
            }`}
          >
            <Icon size={20} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const currentPath = usePathname();
  return (
    <div className="grid h-screen w-full md:grid-cols-[200px_1fr] lg:grid-cols-[260px_1fr] overflow-y-hidden">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-4 font-semibold">
              <Image src="/logo.png" alt="logo" width={40} height={40} />
              <span className="text-2xl text-primary">AdminHub</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-base font-medium lg:px-4">
              {menuNav.map((menu, index) => (
                <ChildMenuNav key={index} name={menu.name} items={menu.items} />
              ))}
            </nav>
          </div>
          <div className="mt-auto m-2 p-4 border-dashed border-2 text-center">
            <a href="https://www.facebook.com/hoanit02/" target="_blank">
              Code by: HoanCuTe ❤️
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                {menuNav.map((menu) => (
                  <ul key={menu.name}>
                    <p className="my-2 font-bold text-xs text-muted-foreground">
                      {menu.name}
                    </p>
                    {menu.items.map((item) => {
                      const IconComponent = item.icon;
                      return (
                        <Link
                          href={item.href}
                          key={item.label}
                          className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${
                            currentPath === item.href
                              ? "bg-muted text-primary"
                              : ""
                          }`}
                        >
                          <IconComponent size={20} />
                          <span className="ml-2">{item.label}</span>
                        </Link>
                      );
                    })}
                  </ul>
                ))}
              </nav>

              <div className="mt-auto m-2 p-4 border-dashed border-2 text-center">
                <a href="https://www.facebook.com/hoanit02/" target="_blank">
                  Code by: HoanCuTe ❤️
                </a>
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <ModeToggle />
          </div>
          <UserButton />
        </header>
        <main className="h-[calc(100vh-3.5rem)] p-2 lg:p-4 overflow-y-scroll scrollbar-thin">
          <div className="w-full h-full">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;

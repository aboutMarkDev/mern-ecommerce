import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAdminContext } from "../context/Admin";
import { useLogoutAdmin } from "../lib/react-query/queries";
import { Button } from "@/components/ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet";
import { Loader2, LogOut } from "lucide-react";

const sideNav = [
  {
    label: "Products",
    icon: "/assets/icons/box-open-full.svg",
    route: "/admin",
  },
  {
    label: "Orders",
    icon: "/assets/icons/order-history.svg",
    route: "/admin/orders",
  },
  {
    label: "Users",
    icon: "/assets/icons/users.svg",
    route: "/admin/users",
  },
];

const AdminRootLayout = () => {
  const { pathname } = useLocation();
  const { isAdminAuthenticated, isLoading, admin, setIsAdminAuthenticated } =
    useAdminContext();

  const { mutateAsync: logoutAdmin, isPending: isAdminLoggingOut } =
    useLogoutAdmin();

  const navigate = useNavigate();

  //   Loading state for checking if the admin is authenticated
  if (isLoading) {
    return (
      <div className="h-screen flex-center gap-1">
        <Loader2 className="animate-spin" width={40} height={40} />
        <p className="text-xl font-bold">Loading...</p>
      </div>
    );
  }

  //   Check if the admin is authenticated, otherwise navigate to auth
  if (!isAdminAuthenticated) return <Navigate to="/admin/auth" />;

  const handleAdminLogout = async () => {
    try {
      logoutAdmin();
      navigate("/");
      setIsAdminAuthenticated(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="h-screen p-3 flex flex-col gap-1">
      {/* Header/Nav */}
      <section className="border px-5 py-3 flex-between rounded-md">
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger>
              <Button
                variant="ghost"
                type="button"
                size="sm"
                className="rounded-full"
              >
                <HamburgerMenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col justify-between">
              <nav className="py-5 px-1">
                <ul className="space-y-3 text-sm">
                  {sideNav.map((nav) => {
                    return (
                      <li
                        key={nav.label}
                        className="hover:bg-gray-100 px-1 py-2 rounded-md"
                      >
                        <SheetClose asChild>
                          <Link
                            to={nav.route}
                            className="flex items-center gap-2"
                          >
                            <img
                              src={nav.icon}
                              alt={nav.label}
                              width={20}
                              height={20}
                            />
                            <p>{nav.label}</p>
                          </Link>
                        </SheetClose>
                      </li>
                    );
                  })}
                </ul>
              </nav>
              <SheetFooter>
                <Button
                  className="space-x-1 w-full"
                  type="button"
                  onClick={handleAdminLogout}
                  disabled={isAdminLoggingOut}
                >
                  {isAdminLoggingOut ? (
                    <>
                      <Loader2 className="animate-spin" />
                      <p>Loading...</p>
                    </>
                  ) : (
                    <>
                      <LogOut />
                      <p>Logout</p>
                    </>
                  )}
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo/Admin/Avatar */}
        <Link to="/">
          <img src="/logo.png" alt="logo" width={50} height={50} />
        </Link>
        <div className="flex-center gap-3">
          <p className="text-sm font-semibold">{admin.username}</p>
          <Link
            to={`/admin/update_admin_profile`}
            className="rounded-full ring-1 ring-gray-100 w-[2.5rem] h-[2.5rem] overflow-hidden"
          >
            <img
              src={admin.imageUrl || "/assets/admin.png"}
              alt={admin.username}
              className="w-full h-full object-contain"
            />
          </Link>
        </div>
      </section>

      {/* Side Nav & Main Content */}
      <section className="flex max-lg:flex-col gap-1 flex-grow overflow-y-auto">
        <aside className="border w-full lg:max-w-[16rem] rounded-md flex lg:flex-col justify-between px-3 py-2 lg:py-5 max-lg:hidden">
          {/* HIDDEN FOR SMALL DIMENSIONS */}
          <ul className="flex lg:flex-col gap-5">
            {sideNav.map((nav) => {
              const active = pathname === nav.route;
              return (
                <li key={nav.label} className="group overflow-hidden">
                  <Link
                    to={nav.route}
                    className={`flex max-lg:flex-col items-center max-lg:justify-center gap-3 max-lg:gap-1 p-2 max-lg:p-1 rounded-md group-hover:bg-gray-100 ${
                      active && "bg-gray-100"
                    }`}
                  >
                    <img
                      src={nav.icon}
                      alt={nav.label}
                      width={22}
                      height={22}
                    />
                    <p className="max-lg:text-xs">{nav.label}</p>
                  </Link>
                </li>
              );
            })}
          </ul>

          <Button
            className="space-x-1"
            type="button"
            onClick={handleAdminLogout}
            disabled={isAdminLoggingOut}
          >
            {isAdminLoggingOut ? (
              <>
                <Loader2 className="animate-spin" />
                <p>Loading...</p>
              </>
            ) : (
              <>
                <LogOut />
                <p>Logout</p>
              </>
            )}
          </Button>
        </aside>

        <section className="w-full h-full">
          <Outlet />
        </section>
      </section>
    </main>
  );
};

export default AdminRootLayout;

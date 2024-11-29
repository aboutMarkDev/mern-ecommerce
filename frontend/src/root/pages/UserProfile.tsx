import {
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useUserContext } from "../../context/User";
import {
  useGetOrderByUserId,
  useLogoutUser,
} from "../../lib/react-query/queries";
import UserOrders from "./UserOrders";
import ToPay from "./ToPay";
import ToReceive from "./ToReceive";
import { Button } from "@/components/ui/button";
import Delivered from "./Delivered";
import Cancelled from "./Cancelled";
import { userTabs } from "@/constants";
import { Loader2, Mail, Phone } from "lucide-react";

const UserProfile = () => {
  const { user, setIsAuthenticated, isAuthenticated, isLoading } =
    useUserContext();

  const { data: orders, isPending: isFetchingOrdersLoading } =
    useGetOrderByUserId(user.id || "");

  const { mutate: logoutUser } = useLogoutUser();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  if (isLoading) {
    return (
      <div className="flex-center gap-1 flex-grow">
        <Loader2 className="animate-spin" width={30} height={30} />
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }

  const handleLogout = async () => {
    try {
      logoutUser();
      navigate("/");
      setIsAuthenticated(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="up-outer_section">
      <h1 className="text-2xl font-semibold">User Profile</h1>

      <section className="up-inner_section">
        <div className="w-full max-w-[7rem] h-[7rem] rounded-full mx-auto ring-1 ring-secondary overflow-hidden">
          <img
            src={user.imageUrl || "/assets/person.png"}
            alt="user"
            className="w-full h-full object-contain"
          />
        </div>

        {/* User Details */}
        <div className="space-y-3">
          <p className="text-xl font-semibold text-center">{user.name}</p>
          <section className="w-full max-w-[18rem] mx-auto text-sm flex-center gap-2">
            <Mail />
            <p className="font-light italic">{user.email}</p>
          </section>
          <section className="w-full max-w-[18rem] mx-auto text-sm flex-center gap-2">
            <Phone />
            <p className="font-light italic">{user.contactNumber}</p>
          </section>

          <div className="flex-center gap-3">
            <Link to={`/user/update_profile?uid=${user.id}`}>
              <Button variant="secondary" type="button">
                Edit Profile
              </Button>
            </Link>

            <Button type="button" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </section>

      {/* Tabs for Users Activity */}
      <section className="flex-center max-sm:gap-2 gap-3 p-1">
        {userTabs.map((tab) => {
          const active = pathname === tab.route;
          return (
            <div key={tab.label} className="flex text-sm">
              <Link to={tab.route}>
                <Button
                  size="sm"
                  className={`rounded-lg ${
                    active
                      ? "bg-[#202020] text-[#f1f1f1] hover:bg-[#202020] hover:text-[#f1f1f1]"
                      : "hover:bg-[#202020] hover:text-[#f1f1f1]"
                  } transition-colors duration-300`}
                  variant="outline"
                >
                  {tab.label}
                </Button>
              </Link>
            </div>
          );
        })}
      </section>

      {/* OTHERS */}

      <Routes>
        <Route
          index
          element={
            <UserOrders
              orderList={orders}
              isOrderLoading={isFetchingOrdersLoading}
            />
          }
        />
        <Route path="/to-pay_products" element={<ToPay orderList={orders} />} />
        <Route
          path="/to-receive_products"
          element={<ToReceive orderList={orders} />}
        />
        <Route
          path="/delivered_products"
          element={<Delivered orderList={orders} />}
        />
        <Route
          path="/cancelled_products"
          element={<Cancelled orderList={orders} />}
        />
      </Routes>
    </main>
  );
};

export default UserProfile;

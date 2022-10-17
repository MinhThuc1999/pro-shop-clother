import DashboardIcon from "../assets/icons/dashboard.svg";
import ShippingIcon from "../assets/icons/shipping.svg";
import ProductIcon from "../assets/icons/product.svg";
import UserIcon from "../assets/icons/user.svg";
import CategoryIcon from "../assets/icons/category.png";

const sidebar_menu = [
  {
    id: 1,
    icon: DashboardIcon,
    path: "/admin",
    title: "Dashboard",
  },
  {
    id: 2,
    icon: ProductIcon,
    path: "/admin/orders",
    title: "Orders",
  },
  {
    id: 3,
    icon: ShippingIcon,
    path: "/admin/products",
    title: "Products",
  },
  {
    id: 4,
    icon: CategoryIcon,
    path: "/admin/category",
    title: "Categories",
  },
  {
    id: 5,
    icon: UserIcon,
    path: "/admin/profile",
    title: "My account",
  },
];

export default sidebar_menu;

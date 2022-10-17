import Introduct from "../pages/user/Introduct";
import News from "../pages/user/News";
import Contact from "../pages/user/Contact";

const publicRoutes = [
  {
    id: 1,
    path: "/introduct",
    content: "GIỚI THIỆU",
    component: Introduct,
  },

  {
    id: 2,
    path: "/news",
    content: "TIN TỨC",
    component: News,
  },
  {
    id: 3,
    path: "/contact",
    content: "LIÊN HỆ",
    component: Contact,
  },
];

export { publicRoutes };

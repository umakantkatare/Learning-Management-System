// import { NavLink } from "react-router-dom";
// import { studentMenu } from "@/constants/studentMenu ";

// export default function StudentMenu() {
// //   const menus = studentMenu;

//   return (
//     <nav className="mt-6 space-y-2">
//       {studentMenu.map((menu, index) => {
//         const Icon = menu.icon;

//         return (
//           <NavLink
//             key={index}
//             to={menu.path}
//             className={({ isActive }) =>
//               `flex items-center gap-3 px-4 py-3 rounded-xl ${
//                 isActive
//                   ? "bg-orange-500 text-white"
//                   : "hover:bg-zinc-900 text-zinc-300"
//               }`
//             }
//           >
//             <Icon size={18} />
//             {menu.name}
//           </NavLink>
//         );
//       })}
//     </nav>
//   );
// }

import {
    UilEstate,
    UilClipboardAlt,
    UilUsersAlt,
    UilHeart,
    UilBabyCarriage,
    UilSignOutAlt,
  } from "@iconscout/react-unicons";
  
  // Sidebar Data
  export const SidebarData = [
    {
      icon: UilEstate,
      heading: "Dashboard",
      path:'/sidebar'
    },
    {
      icon: UilHeart,
      heading: "Donation",
      path: 'donationedit',
    },
    {
      icon: UilClipboardAlt,
      heading: "Adoption",
      path: 'adoptionedit'
    },
    {
      icon: UilBabyCarriage,
      heading: "Children",
      path: 'childrenedit',
    },
    {
      icon: UilUsersAlt,
      heading: "Users",
      path: 'useredit'
    },
//     {
//       icon: UilSignOutAlt,
//       heading: "Logout",
//       path:'/adminlogin'
// },
];
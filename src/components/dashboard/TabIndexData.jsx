import DashboardIcon from "../../assets/images/sidebar/dashboard.png";
import MyDocsIcon from "../../assets/images/sidebar/documents.png";
import SettingsIcon from "../../assets/images/sidebar/settings.png";
import SupportIcon from "../../assets/images/sidebar/support.png";
export const TabIndexData = [
  {
    id: 1,
    menu: "Dashboard",
    url: "/dashboard",
    icon: DashboardIcon,
    content: "",
    subtabindex: [],
    role: [
      "INDIVIDUAL_USER",
      "CORPORATE_USER",
      "CORPORATE_ADMIN",
      "ADMIN",
      "SUPER_ADMIN",
    ],
  },
  {
    id: 2,
    menu: "Users",
    url: "/users",
    icon: DashboardIcon,
    content: "",
    subtabindex: [],
    role: ["ADMIN"],
  },
  // {
  //   id: 2,
  //   menu: 'Action Center',
  //   url: '/actioncenter',
  //   icon: ActionCenterIcon,
  //   content: 'Hello Action Center',
  //   subtabindex: [
  //     {
  //       id: 1,
  //       menu: 'Required Action',
  //       url: '/actioncenter/requireaction',
  //       content: 'Hello Action Center requireaction',
  //     },
  //     {
  //       id: 2,
  //       menu: 'Time Sensitive',
  //       url: '/actioncenter/timesensitive',
  //       content: '',
  //     },
  //     { id: 3, menu: 'Failed', url: '/actioncenter/failed', content: '' },
  //   ],
  // },
  {
    id: 4,
    menu: "KYC",
    url: "/kyc",
    icon: MyDocsIcon,
    content: "",
    role: ["ADMIN"],
    subtabindex: []},
    
  {
    id: 3,
    menu: "My Documents",
    url: "/mydocuments",
    icon: MyDocsIcon,
    content: "",
    subtabindex: [
      { id: 5, menu: "Sent", url: "/documents/sent", content: "" },
      { id: 6, menu: "Received", url: "/documents/received", content: "" },
      { id: 7, menu: "All", url: "/documents", content: "" },
      { id: 8, menu: "Completed", url: "/documents/completed", content: "" },
      { id: 9, menu: "Expired", url: "/documents/expired", content: "" },
    ],
    role: [
      "INDIVIDUAL_USER",
      "CORPORATE_USER",
      "CORPORATE_ADMIN",
      "ADMIN",
      "SUPER_ADMIN",
    ],
  },
];

export const TabIndexFoot = [
  {
    id: 1,
    menu: "Profile Settings",
    url: "/settings",
    icon: SettingsIcon,
    content: "",
  },

  {
    id: 2,
    menu: "Settings",
    url: "/settings",
    icon: SettingsIcon,
    content: "",
  },
  {
    id: 3,
    menu: "Support",
    url: "/support",
    icon: SupportIcon,
    content: "",
  },
];

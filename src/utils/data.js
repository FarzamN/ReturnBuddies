export const toastColors = {
  success: {
    icon: "check",
    bg: "#f6fff9",
    border: "#47C1B5",
    iconBg: "#47C1B5",
    iconType: "Feather",
  },
  error: {
    bg: "#FFF5F3",
    icon: "close",
    border: "#F3CBC4",
    iconBg: "#DF452F",
    iconType: "Ionicons",
  },
  info: {
    bg: "#F4F8FE",
    border: "#9DC0EE",
    iconBg: "#3391B6",
    icon: "information",
    iconType: "Ionicons",
  },
  warning: {
    bg: "#FFF8EC",
    border: "#F4D9AB",
    iconBg: "#FD9904",
    icon: "exclamation",
    iconType: "AntDesign",
  },
};

export const loginInput = [
  {
    label: "Email",
    p: "Enter email",
    name: "email",
    def: "johnmark@gmail.com",
  },
  {
    label: "Password",
    p: "Enter password",
    name: "password",
    def: "12345678",
  },
];

export const changePasswordInput = [
  {
    label: "Current Password",
    p: "Current Password",
    name: "currentPassword",
  },
  {
    label: "Password",
    p: "Enter Password",
    name: "newPassword",
  },
  {
    label: "Confirm Password",
    p: "Confirm Password",
    name: "confirmPassword",
  },
];
export const registerInput = [
  {
    label: "Full Name",
    p: "Enter full name",
    name: "name",
    def: "john mark",
  },
  {
    label: "Email",
    p: "Enter email",
    name: "email",
    def: "johnmark@gmail.com",
  },
  {
    label: "Password",
    p: "Enter password",
    name: "password",
    def: "12345678",
  },
];

export const editProfile = [
  {
    name: "name",
    title: "Full Name",
    rules: "Full Name",
    placeholder: "Enter Full Name",
    keyboardType: "default",
  },
  {
    name: "phone",
    title: "Phone Number",
    rules: "Phone Number",
    placeholder: "Enter Phone Name",
    keyboardType: "numeric",
  },
];

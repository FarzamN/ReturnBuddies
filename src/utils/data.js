import { appImages } from "../assets";

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

export const draftData = [
  {
    _id: "20190",
    returnLabel: "140",
    labelPositive: "No return label uploaded",
    data: [
      {
        id: "1",
        title: "Red Nike Shoe",
        created_at: "2014-06-26 04:07:31",
        status: "Pending Label",
        image: appImages.homeShoes,
        isLabelReceipt: "0",
        labelPath: {
          name: "path name",
          type: "pdf",
          uri: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        },
      },
    ],
  },
  {
    _id: "20100",
    returnLabel: "141",
    labelPositive: "Label uploaded",
    data: [
      {
        id: "1",
        title: "Red Nike Shoe",
        created_at: "2014-06-26 04:07:31",
        status: "Pending Label",
        image: appImages.homeShoes,
        isLabelReceipt: "0",
        labelPath: {
          name: "path name",
          type: "pdf",
          uri: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        },
      },
      {
        id: "1",
        title: "Red Nike Shoe",
        created_at: "2014-06-26 04:07:31",
        status: "Pending Label",
        image: appImages.homeShoes,
        isLabelReceipt: "0",
        labelPath: {
          name: "path name",
          type: "pdf",
          uri: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        },
      },
      {
        id: "1",
        title: "Red Nike Shoe",
        created_at: "2014-06-26 04:07:31",
        status: "Pending Label",
        image: appImages.homeShoes,
        isLabelReceipt: "0",
        labelPath: {
          name: "path name",
          type: "pdf",
          uri: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        },
      },
    ],
  },
  {
    _id: "20101",
    returnLabel: "142",
    labelPositive: "No return label uploaded",
    data: [
      {
        id: "1",
        title: "Red Nike Shoe",
        created_at: "2014-06-26 04:07:31",
        status: "Pending Label",
        image: appImages.homeShoes,
        isLabelReceipt: "0",
        labelPath: {
          name: "path name",
          type: "pdf",
          uri: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        },
      },
      {
        id: "1",
        title: "Red Nike Shoe",
        created_at: "2014-06-26 04:07:31",
        status: "Pending Label",
        image: appImages.homeShoes,
        isLabelReceipt: "0",
        labelPath: {
          name: "path name",
          type: "pdf",
          uri: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        },
      },
    ],
  },
];

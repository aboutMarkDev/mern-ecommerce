import dayjs from "dayjs";
import { CDeliveryOptionType, IOption } from "../types/index.types";

export const headerNav = [
  {
    route: "/",
    label: "Home",
  },
  {
    route: "/products",
    label: "Collections",
  },
  {
    route: "/about",
    label: "About",
  },
];

export const otherButtons = [
  // {
  //   label: "Search",
  //   route: "/search-product",
  //   icon: "/assets/icons/search.svg",
  // },
  {
    label: "User",
    route: "/user",
    icon: "/assets/icons/user.svg",
  },
];

export const footerCompany = [
  {
    label: "Home",
  },
  {
    label: "About Us",
  },
  {
    label: "Delivery",
  },
  {
    label: "Privacy Policy",
  },
];

export const footerContacts = [
  {
    label: "Instagram",
  },
  {
    label: "GitHub",
  },
  {
    label: "Facebook",
  },
  {
    label: "Twitter",
  },
  {
    label: "63+123-456-789",
  },
  {
    label: "admin@example.com",
  },
];

export const bestCollectionConstant = [
  {
    id: "fee7b551252665accd89855141a7f4e6",
    name: "Men Plain Cotton Polo Shirt 2 Pack Teal",
    imageUrl: "/assets/images/adults-plain-cotton-tshirt-2-pack-teal.jpg",
    price: "799",
  },
  {
    id: "24914abc04fe670cb1b2384a8cae694f",
    name: "Men Jogger Pants Gray",
    imageUrl: "/assets/images/jogger-pants-gray.jpg",
    price: "699",
  },
  {
    id: "8acc9d05be1aa655de7cabd82b95e054",
    name: "Men Athletic Shoes Green",
    imageUrl: "/assets/images/men-athletic-shoes-green.jpg",
    price: "799",
  },
  {
    id: "90748c30cbc79a37df26d93d5742b570",
    name: "Men Round Sunglasses Black",
    imageUrl: "/assets/images/round-sunglasses-black.jpg",
    price: "699",
  },
  {
    id: "7a009b4f1e3f6a7e445d8d289c641fc0",
    name: "Women Ballet Flat Black",
    imageUrl: "/assets/images/women-knit-ballet-flat-black.jpg",
    price: "699",
  },
];

export const category = ["Men", "Women", "Kids"];
export const subCategory = ["Tops", "Bottoms", "Full Outfit"];

export const aboutSection = [
  {
    title: "Welcome to Everywear",
    desc: "At Everywear, we believe shopping should be more than just a transaction; it should be a delightful experience. Our store was founded on the idea that quality, affordability, and exceptional service should go hand in hand, and that's exactly what we deliver to our customers every day.",
  },
  {
    title: "Our Mission",
    desc: "To provide carefully curated, high-quality products that enhances your lifestyle and brings a touch of joy to your everyday life. We are driven by a commitment to sustainability, innovation, craftsmanship, and we aim to create lasting relationships with customers who value our products.",
  },
];

export const whyUs = [
  {
    title: "Unmatched Quality & Craftsmanship",
    desc: "Every product we offer is carefully selected for its superior quality and attention to detail. We believe in providing items that are not only stylish but built to last, ensuring our customers receive value that stands the test of time.",
    gif: "/assets/verified.gif",
  },
  {
    title: "Personalized Customer Experience",
    desc: "At Everywear, you're not just a customer; you're part of our community. From seamless shopping to personalized support, we go above and beyond to ensure every interaction is smooth, enjoyable, and tailored to your needs.",
    gif: "/assets/support.gif",
  },
  {
    title: "Sustainably Sourced & Ethically Made",
    desc: "We’re committed to sourcing products that are both environmentally sustainable and ethically produced. By choosing us, you’re not only getting high-quality items but also supporting responsible practices that make a positive impact on our planet.",
    gif: "/assets/happy.gif",
  },
];

export const deliveryOptions: CDeliveryOptionType[] = [
  {
    date: dayjs().add(9, "d").format("dddd, MMMM D"),
    value: "FREE",
    fee: 0,
  },
  {
    date: dayjs().add(5, "d").format("dddd, MMMM D"),
    value: "50",
    fee: 50,
  },
  {
    date: dayjs().add(1, "d").format("dddd, MMMM D"),
    value: "100",
    fee: 100,
  },
];

export const categoryOptions: IOption[] = [
  { value: "Men", label: "Men" },
  { value: "Women", label: "Women" },
  { value: "Kids", label: "Kids" },
];

export const subCategoryOptions: IOption[] = [
  { value: "Tops", label: "Tops" },
  { value: "Bottoms", label: "Bottoms" },
  { value: "Full Outfit", label: "Full Outfit" },
];

export const sizesOption: { value: string[]; label: string }[] = [
  { value: ["S", "M", "L", "XL", "2XL"], label: "Clothes" },
  {
    value: [
      "US 7",
      "US 7.5",
      "US 8",
      "US 8.5",
      "US 9",
      "US 9.5",
      "US 10",
      "US 10.5",
      "US 11",
      "US 11.5",
      "US 12",
      "US 12.5",
      "US 13",
    ],
    label: "Sneakers",
  },
  { value: [], label: "N/A" },
];

export const orderProductStatus: IOption[] = [
  { value: "toPay", label: "To Pay" },
  { value: "toReceive", label: "To Receive" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

export const userTabs = [
  {
    label: "All Orders",
    route: "/user",
  },
  {
    label: "To Pay",
    route: "/user/to-pay_products",
  },
  {
    label: "To Receive",
    route: "/user/to-receive_products",
  },
  {
    label: "Delivered",
    route: "/user/delivered_products",
  },
  {
    label: "Cancelled",
    route: "/user/cancelled_products",
  },
];

export const orderStatus = ["Completed", "Pending", "Partial", "Cancelled"];

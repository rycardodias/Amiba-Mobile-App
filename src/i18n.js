import i18next from "i18next";
import { i18nPT } from "./i18nPT";
import { initReactI18next } from "react-i18next";
const resources = {
  en: {
    translation: {
      Sales: "Sales",
      "All Spending": "All Spending",
      Earnings: "Earnings",
      "Weekly revenue": "Weekly revenue",
      "New Clients": "New Clients",
      "Total Spent": "Total Spent",
      Analytics: "Analytics",
      "Recent Orders": "Recent Orders",
      "Top selling Products": "Top selling Products",
      "Congratulations Watson!": "Congratulations Watson!",
      Revenue: "Revenue",
      "Repeat Purchase": "Repeat Purchase",
      "Average Order": "Average Order",
      "New Customers": "New Customers",
      "Earnings Report": "Earnings Report",
      "Total Sales": "Total Sales",
      "Calculated in last 7 days": "Calculated in last 7 days",
      "View Full Report": "View Full Report",
      "Popular Products": "Popular Products",
      "Sales By Country": "Sales By Country",
      "Sales Product Details": "Sales Product Details",
      "Project Management": "Project Management",
      "Recent Projects": "Recent Projects",
      "More than 50+ new projects running": "More than 50+ new projects running",
      "Total Project Completion Rate": "Total Project Completion Rate",
      "Team Progress": "Team Progress",
      "Todo List": "Todo List",
      "Uko Dashboard & UI kit": "Uko Dashboard & UI kit",
      "Clean design & code for your next project.": "Clean design & code for your next project.",
      "Project Management V2": "Project Management V2",
      Progress: "Progress",
      "Recent Activity": "Recent Activity",
      Projects: "Projects",
      "Task Progress": "Task Progress",
      Teams: "Teams",
      "Karen leave some comments on Konsep Ilustrasi": "Karen leave some comments on Konsep Ilustrasi",
      "Karen change project info on Project Homepage": "Karen change project info on Project Homepage",
      "Andrea change the due date of Project Homepage": "Andrea change the due date of Project Homepage",
      "Web Design": "Web Design",
      "Project Nightfall": "Project Nightfall",
      "Load More": "Load More",
      Copywriting: "Copywriting",
      Illustrations: "Illustrations",
      "UI Design": "UI Design",
      "Account Settings": "Account Settings",
      "User Profile": "User Profile",
      "User Info": "User Info",
      Experiences: "Experiences",
      Skills: "Skills",
      Password: "Password",
      Preferences: "Preferences",
      "Connected Accounts": "Connected Accounts",
      "Recent Devices": "Recent Devices",
      Notifications: "Notifications",
      "Social Accounts": "Social Accounts",
      "Edit your account information:": "Edit your account information:",
      "Professional Info": "Professional Info",
      "Social Profiles": "Social Profiles",
      Save: "Save",
      Cancel: "Cancel",
      "Work Experiences": "Work Experiences",
      Stacks: "Stacks",
      "New Skill": "New Skill",
      "Change Your Password": "Change Your Password",
      "Password requirements:": "Password requirements:",
      "Save Changes": "Save Changes",
      Following: "Following",
      Followers: "Followers",
      About: "About",
      Profile: "Profile",
      Follower: "Follower",
      Friends: "Friends",
      Gallery: "Gallery",
      "Data Table V1": "Data Table V1",
      Users: "Users",
      "All Users": "All Users",
      Editor: "Editor",
      Contributor: "Contributor",
      Administrator: "Administrator",
      Subscriber: "Subscriber",
      "Add New User": "Add New User",
      "Data Table V2": "Data Table V2",
      "Add Employee": "Add Employee",
      "Product List": "Product List",
      "Add Products": "Add Products",
      "Order List": "Order List",
      All: "All",
      Available: "Available",
      Disabled: "Disabled",
      "Customer List": "Customer List",
      Active: "Active",
      Blocked: "Blocked",
      "Add Customer": "Add Customer",
      Shop: "Shop",
      "Uko Ecommerce": "Uko Ecommerce",
      Categories: "Categories",
      "Sort By": "Sort By",
      "Price Range": "Price Range",
      "View Cart": "View Cart",
      Shoes: "Shoes",
      Furniture: "Furniture",
      Clothes: "Clothes",
      Accessories: "Accessories",
      Others: "Others",
      Newest: "Newest",
      Popular: "Popular",
      Default: "Default",
      "Price: high to low": "Price: high to low",
      "Price: low to high": "Price: low to high",
      Cart: "Cart",
      "Order Summery": "Order Summery",
      Subtotal: "Subtotal",
      Discount: "Discount",
      "Shipping Cost": "Shipping Cost",
      Total: "Total",
      "Proceed to payment": "Proceed to payment",
      Payment: "Payment",
      "Payment Success": "Payment Success",
      Success: "Success",
      "Back to order": "Back to order",
      "Invoice List": "Invoice List",
      "Add New": "Add New",
      "Add Invoice": "Add Invoice",
      "Order Status": "Order Status",
      Pending: "Pending",
      Processing: "Processing",
      Delivered: "Delivered",
      Amount: "Amount",
      "Add New Item": "Add New Item",
      Delete: "Delete",
      "Invoice Details": "Invoice Details",
      "Invoice Info": "Invoice Info",
      "Order Number": "Order Number",
      "Order Date": "Order Date",
      "Bill To": "Bill To",
      "Bill from": "Bill from",
      Client: "Client",
      "Item Name": "Item Name",
      Price: "Price",
      Quantity: "Quantity",
      "User Grid": "User Grid",
      "User List": "User List",
      "Uko Project V1": "Uko Project V1",
      "Uko Project V2": "Uko Project V2",
      "Uko Project V3": "Uko Project V3",
      "Project Details": "Project Details",
      "Team Member": "Team Member",
      "To Do List": "To Do List",
      "To do": "To do",
      "In Progress": "In Progress",
      Done: "Done",
      Chat: "Chat",
      Calendar: "Calendar",
      Contact: "Contact",
      Privacy: "Privacy",


      'Add Picture': 'Add Picture',
      'Choose a file': 'Choose a file',

      Animals: 'Animals',
      Carts: 'Carts',
      Certifications: 'Certifications',
      "Eggs Batch": "Eggs Batch",
      Explorations: 'Explorations',
      Menus: 'Menus',
      Orders: 'Orders',
      Organizations: 'Organizations',
      Products: 'Products',
      Restaurants: 'Restaurants',

      Name: 'Name',
      Type: 'Type',
      Address: 'Address',
      Locale: 'Locale',
      "Zip Code": 'Zip Code',
      "VAT Number": 'VAT Number',
      User: 'User',
    }
  },

  pt: {
    translation: i18nPT
  }
};
i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: "pt",
  fallbackLng: "pt",
  interpolation: {
    escapeValue: false
  }
});
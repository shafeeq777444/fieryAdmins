import { MenuItem } from "../types/Type.WeeklyMenu";

export const initialVegWeeklyMenu: MenuItem[] = [
    {
      day: "Monday",
      mainDish: "Paneer Tikka Masala",
      sides: ["Tandoori Roti", "Cucumber Salad", "Mint Chutney"],
      image: "/assets/monday.png",
      id: 1,
    },
    {
      day: "Tuesday",
      mainDish: "Chana Masala",
      sides: ["Bhatura", "Onion Rings", "Pickle"],
      image: "/assets/tuesday.png",
      id: 2,
    },
    {
      day: "Wednesday",
      mainDish: "Aloo Baingan",
      sides: ["Chapati", "Boondi Raita", "Papad"],
      image: "/assets/wedsday.png",
      id: 3,
    },
    {
      day: "Thursday",
      mainDish: "Veg Pulao",
      sides: ["Mix Veg Curry", "Raita", "Salad"],
      image: "/assets/thursday.png",
      id: 4,
    },
    {
      day: "Friday",
      mainDish: "Palak Paneer",
      sides: ["Jeera Rice", "Naan", "Lassi"],
      image: "/assets/friday.png",
      id: 5,
    },
    {
      day: "Saturday",
      mainDish: "Kadhi Pakora",
      sides: ["Rice", "Papad", "Pickle"],
      image: "/assets/sat.png",
      id: 6,
    },
  ];

  export const initialNonVegWeeklyMenu: MenuItem[] = [
      {
        day: "Monday",
        mainDish: "Chicken Curry",
        sides: ["Rice", "Roti", "Onion Salad"],
        image: "/assets/monday-nonveg.png",
        id: 1,
      },
      {
        day: "Tuesday",
        mainDish: "Mutton Rogan Josh",
        sides: ["Naan", "Cucumber Raita", "Lemon"],
        image: "/assets/tuesday-nonveg.png",
        id: 2,
      },
      {
        day: "Wednesday",
        mainDish: "Egg Curry",
        sides: ["Paratha", "Tomato Chutney", "Onion Rings"],
        image: "/assets/wednesday-nonveg.png",
        id: 3,
      },
      {
        day: "Thursday",
        mainDish: "Fish Fry",
        sides: ["Lemon Rice", "Cabbage Slaw", "Green Chutney"],
        image: "/assets/thursday-nonveg.png",
        id: 4,
      },
      {
        day: "Friday",
        mainDish: "Butter Chicken",
        sides: ["Jeera Rice", "Garlic Naan", "Salad"],
        image: "/assets/friday-nonveg.png",
        id: 5,
      },
      {
        day: "Saturday",
        mainDish: "Keema Matar",
        sides: ["Lachha Paratha", "Pickle", "Curd"],
        image: "/assets/saturday-nonveg.png",
        id: 6,
      },
    ];
  
   export const initialMixedWeeklyMenu: MenuItem[] = [
      {
        day: "Monday",
        mainDish: "Vegetable Biryani",
        sides: ["Raita", "Papad", "Pickle"],
        image: "/assets/monday-mixed.png",
        id: 1,
      },
      {
        day: "Tuesday",
        mainDish: "Chicken Biryani",
        sides: ["Mirchi Ka Salan", "Onion Raita", "Boiled Egg"],
        image: "/assets/tuesday-mixed.png",
        id: 2,
      },
      {
        day: "Wednesday",
        mainDish: "Dal Makhani",
        sides: ["Butter Naan", "Salad", "Lassi"],
        image: "/assets/wednesday-mixed.png",
        id: 3,
      },
      {
        day: "Thursday",
        mainDish: "Grilled Fish",
        sides: ["Steamed Veggies", "Lemon Rice", "Mint Sauce"],
        image: "/assets/thursday-mixed.png",
        id: 4,
      },
      {
        day: "Friday",
        mainDish: "Shahi Paneer",
        sides: ["Tandoori Roti", "Jeera Rice", "Kachumber"],
        image: "/assets/friday-mixed.png",
        id: 5,
      },
      {
        day: "Saturday",
        mainDish: "Mutton Biryani",
        sides: ["Onion Raita", "Pickle", "Fried Papad"],
        image: "/assets/saturday-mixed.png",
        id: 6,
      },
    ];
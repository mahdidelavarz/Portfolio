// import React, { useEffect, useState } from "react";
// import { Icon } from "@iconify/react";

// interface Item {
//   id: number;
//   x: number;
//   y: number;
//   icon: string;
// }

// const BlackHole: React.FC = () => {
//   const [items, setItems] = useState<Item[]>([]);

//   useEffect(() => {
//     const generateItems = () => {
//       const newItems: Item[] = [];
//       const iconSet = [
//         "mdi:star", // ستاره
//         "mdi:planet", // سیاره
//         "mdi:meteor", // شهاب‌سنگ
//         "mdi:sparkles", // جرقه
//         "mdi:moon", // ماه
//       ];

//       for (let i = 0; i < 20; i++) {
//         const side = Math.floor(Math.random() * 4);
//         let x: number, y: number;
//         switch (side) {
//           case 0: // بالا
//             x = Math.random() * window.innerWidth;
//             y = 0;
//             break;
//           case 1: // راست
//             x = window.innerWidth - 20;
//             y = Math.random() * window.innerHeight;
//             break;
//           case 2: // پایین
//             x = Math.random() * window.innerWidth;
//             y = window.innerHeight - 20;
//             break;
//           case 3: // چپ
//             x = 0;
//             y = Math.random() * window.innerHeight;
//             break;
//           default:
//             x = 0;
//             y = 0;
//         }
//         newItems.push({
//           id: i,
//           x,
//           y,
//           icon: iconSet[Math.floor(Math.random() * iconSet.length)],
//         });
//       }
//       setItems(newItems);
//     };

//     generateItems();
//     const interval = setInterval(generateItems, 5000); // هر 5 ثانیه تکرار
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="h-screen w-screen relative flex items-center justify-center ">
//       {/* سیاه‌چاله */}
//       <div className="w-40 h-40 bg-black rounded-full border-4 border-purple-500 shadow-[0_0_60px_rgba(147,51,234,0.8)] z-10"></div>

//       {/* آیکون‌ها */}
//       {items.map((item) => (
//         <div
//           key={item.id}
//           className="absolute animate-suck-natural"
//           style={{ left: `${item.x}px`, top: `${item.y}px` }}
//         >
//           <Icon icon={item.icon} width="36" height="36" className="text-white" />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default BlackHole;
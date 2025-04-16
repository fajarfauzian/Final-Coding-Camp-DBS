// import React from "react";
// import Link from "next/link";

// interface ProductItemProps {
//   icon: React.ReactNode;
//   label: string;
//   path: string;
//   active?: boolean;
// }

// const ProductItem = ({ icon, label, path, active }: ProductItemProps) => {
//   return (
//     <Link
//       href={path}
//       className={`glow-on-hover hover:transform hover:scale-105 flex items-center p-2 my-2 ${
//         active ? "text-primary" : "text-gray"
//       }`}
//     >
//       <span className="mr-3">{icon}</span>
//       <span className="flex-1">{label}</span>
//     </Link>
//   );
// };

// export default ProductItem;
import React from "react";
import Link from "next/link";

interface ProductItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  active?: boolean;
}

const ProductItem = ({ icon, label, path, active }: ProductItemProps) => {
  return (
    <Link
      href={path}
      className={`flex items-center p-2 my-2 $ {active ?  'text-primary' : 'text-gray' hover:text-red-400 transition-colors duration-300} `}
    >
      <span className="mr-3">{icon}</span>
      <span className="flex1">{label}</span>
    </Link>
  );
};

export default ProductItem;

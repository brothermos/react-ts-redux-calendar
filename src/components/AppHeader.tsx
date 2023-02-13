import React, { useEffect, useState } from "react";

type AppHeaderProps = {
   title: string;
   year?: number;
};

const AppHeader = ({ title, year }: AppHeaderProps) => {
   const [isShow, setIsShow] = useState(false);

   useEffect(() => {
      console.log("ทำครั้งแรกและทุกครั้งที่ re render");
   });
   useEffect(() => {
      console.log("ทำครั้งแรกครั้งเดียว");
   }, []);
   useEffect(() => {
      console.log("ทำครั้งแรกและทำก็ต่อเมื่อ isShow มีการอัพเดตค่าเท่านั้น");
   }, [isShow]);

   const mouseOver = () => {
      setIsShow(!isShow); //toggle
   };

   return (
      <div>
         <div onMouseOver={mouseOver}>
            {title} {year}
         </div>
         {isShow && <p>Hello App Header</p>}
      </div>
   );
};

export default AppHeader;

import React from "react";
import { Link } from "react-router-dom";
import {
   selectAuthState,
   updateProfileAction,
} from "../redux-toolkit/auth/auth-slice";
import { useAppDispatch, useAppSelector } from "../redux-toolkit/hooks";

function About() {
   const { profile,email } = useAppSelector(selectAuthState);
   const dispatch = useAppDispatch();
   const update = () => {
      dispatch(updateProfileAction());
   };
   return (
      <div>
         <h1>About</h1>
         <p>{profile}</p>
         <button onClick={update}>Update</button>
         <Link to="/" replace={true}>
            กลับสู่หน้าหลัก
         </Link>
      </div>
   );
}

export default About;

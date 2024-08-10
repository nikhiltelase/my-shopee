import React from "react";
import { useParams } from "react-router-dom";
import UserDetails from "../components/UserDetails";

function Profile() {
  const { option } = useParams();
  return (
    <div className="mt-20">{option === "profile" ? <UserDetails /> : option}</div>
  );
}

export default Profile;

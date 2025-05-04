import React, { useEffect, useState } from "react";
import { setUser } from "../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { decodeToken } from "../../utils/utils";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const storedUser = useSelector((state) => state.user);

  

  useEffect(() => {
    if (storedUser.email) {
      setUserData({
        firstName: storedUser.firstName,
        lastName: storedUser.lastName,
        email: storedUser.email,
      });
    } else {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = decodeToken(token);
        if (decoded) {
          const user = {
            email: decoded.sub,
            firstName: decoded.firstName,
            lastName: decoded.lastName,
            token: token,
          };
          dispatch(setUser(user));
          setUserData(user);
          console.log("decoded",decoded)
        }
      }
    }
  }, [dispatch, storedUser]);

  const handleWatchlistNavigate = () => {
    navigate("/watchlist");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Welcome to Your Profile</h2>
      {userData ? (
        <>
          <p><strong>Name:</strong> {userData.firstName} {userData.lastName}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <Button variant="contained" onClick={handleWatchlistNavigate} sx={{ mt: 2 }}>
            View Watchlist
          </Button>
        </>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
};

export default Profile;

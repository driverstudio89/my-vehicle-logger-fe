import Login from "../components/Login";
import User from "../components/User"
import { useAuthContext } from "../context/AuthContext";

function Profile() {
  const authContext = useAuthContext();
  
  console.log(authContext.isAuthenticated);
  
  return (
    <div>
      {authContext.isAuthenticated ? (
        <div className="profile"><User /></div>
      ) : (
        <div className="profile"><Login /></div>
      )}
    </div>
  );
}

export default Profile;

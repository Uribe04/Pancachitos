import Footer from "../../components/footer/footer";
import UserProfile from '../../components/users/userprofile'; 

function UserProfilePage() {
  return (
    <div className="bg-[#FBEFD5] min-h-screen">
      <UserProfile />
      <Footer />
    </div>
  );
}

export default UserProfilePage;

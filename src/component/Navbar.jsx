import { useState } from "react";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

 
  const [username, setUsername] = useState(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    return loggedInUser ? loggedInUser.fullName : null;
  });

 let navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "هل أنت متأكد؟",
      text: "سيتم تسجيل خروجك.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "نعم، تسجيل الخروج",
      cancelButtonText: "إلغاء",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("loggedInUser");
        setUsername(null);
        Swal.fire("تم تسجيل الخروج", "", "success").then(() => {
          navigate("/signin");
        });
      }
    });
  };

  return (
    <nav className="bg-white shadow-md w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="inline-flex items-center">
				<div className="text-xl font-bold text-[#00473e]">An </div>
			    <img src="/logoh.png" className="w-5 h-5" />
			    <div className="text-xl font-bold text-[#00473e]">ime</div>
			</div>

        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-[#272343] hover:text-[#bae8e8]">Home</Link>
          {username ? (
            <>
              <span className="text-md underline font-bold text-[#272343]">{username}</span>
              <Link to="/signin">
                <button onClick={handleLogout} className="text-[#272343] pl-2 pr-2 pt-0.5 pb-0.5 rounded-sm bg-[#f3d2c184] hover:text-[#bae8e8]">Sign Out</button>
              </Link>
            </>
          ) : (
            <Link to="/signin" className="text-[#272343] pl-2 pr-2 pt-0.5 pb-0.5 rounded-sm bg-[#f3d2c184] hover:text-[#bae8e8]">Sign In</Link>
          )}
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X color="#272343" className="w-6 h-6" /> : <Menu color="#eac704" className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white shadow-lg px-4 pt-2 pb-4 space-y-2">
          <ul>
            <Link to="/" className="text-[#272343] hover:text-indigo-600 ">
              <li className="mb-1">Home</li>
            </Link>
            {username ? (
              <>
                <li><span className="text-xl underline font-bold text-[#272343]">{username}</span></li>
                <Link to="/signin">
                  <button onClick={handleLogout} className="text-[#272343] pl-2 pr-2 pt-0.5 pb-0.5 mt-1 rounded-2xl hover:text-[#bae8e8]">Sign Out</button>
                </Link>
              </>
            ) : (
              <Link to="/signin" className="text-[#272343] pl-2 pr-2 pt-0.5 pb-0.5 rounded-2xl hover:text-[#bae8e8]">
                <li className="mb-1">Sign In</li>
              </Link>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
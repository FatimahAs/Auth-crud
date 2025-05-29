import { useState } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router";
import axios from "axios"; 

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (formData.fullName.length < 3 || formData.fullName.length > 50) {
      newErrors.fullName = "الاسم يجب أن يكون بين 3 و50 حرفًا.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "البريد الإلكتروني غير صالح.";
    }

    if (formData.password.length < 6) {
      newErrors.password = "كلمة المرور يجب أن تكون على الأقل 6 أحرف.";
    }

    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "كلمتا المرور غير متطابقتين.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        await axios.post("https://682199f9259dad2655afc0f9.mockapi.io/User", {
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        });

        Swal.fire({
          icon: "success",
          title: "تم التسجيل بنجاح!",
          text: "يرجى تسجيل الدخول الآن.",
          confirmButtonText: "الذهاب لتسجيل الدخول",
        }).then(() => {
          navigate("/signin");
        });

        setFormData({
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "خطأ في التسجيل",
          text: "حدث خطأ أثناء إرسال البيانات. حاول مرة أخرى.",
        });
        console.error("Signup error:", error);
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "فشل التسجيل",
        text: "يرجى تصحيح الأخطاء في النموذج.",
        confirmButtonText: "BACK",
      });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Sign Up</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500">Forgot password?</a>
          </div>

          <button className="w-full bg-[#272343] hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors">
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/signin" className="text-[#272343] hover:text-indigo-500 font-medium">Sign In</Link>
        </div>
      </div>
    </div>
  );
}

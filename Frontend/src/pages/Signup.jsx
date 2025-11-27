
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    if (!form.name || !form.email || !form.password) return "Please fill required fields.";
    // simple email regex
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Invalid email.";
    if (form.password.length < 6) return "Password must be at least 6 characters.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const err = validate();
    if (err) { setError(err); return; }
    console.log("Submitting to", "http://localhost:1000/api/auth/signup")
    try {
      setLoading(true);
      const res = await axios.post(
        `${"http://localhost:1000/api/auth/signup"}`,
        form,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("resp:", res.data);
      // expected response: { token, user }
      const { token } = res.data;
      localStorage.setItem("token", token);
      // redirect to dashboard
      navigate("/login");
    } catch (err) {
      console.error("AXIOS ERROR", err);
      console.error(err);
      setError(err.response?.data?.message || "Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="pt-20 min-h-[calc(100vh-8rem)] flex items-center justify-center bg-gradient-to-b from-pink-50 via-rose-50 to-sky-50">
      <div className="max-w-md w-full mx-4 bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl p-8 border border-pink-100">
        <p className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full bg-sky-50 text-sky-600 border border-sky-100 mb-4">
          <span className="w-2 h-2 rounded-full bg-sky-400" />
          Create your handmade world 💕
        </p>

        <h1 className="text-3xl font-semibold text-gray-900 tracking-tight mb-2">
          Create your <span className="text-rose-500">Perfect Gifts</span> account
        </h1>
        <p className="text-sm text-gray-500 mb-6">Join us & explore beautiful handcrafted goodies ✨</p>

        <form className="space-y-4" onSubmit={handleSubmit}>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input name="name" value={form.name} onChange={onChange} type="text" placeholder="Your full name" className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-200 transition" />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input name="email" value={form.email} onChange={onChange} type="email" placeholder="you@example.com" className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-200 transition" />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Phone Number</label>
            <input name="phone" value={form.phone} onChange={onChange} type="text" placeholder="Enter phone number" className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-200 transition" />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input name="password" value={form.password} onChange={onChange} type="password" placeholder="Create a strong password" className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-200 transition" />
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}

          <button type="submit" disabled={loading} className="w-full mt-2 inline-flex justify-center items-center rounded-xl bg-rose-500 text-white text-sm font-medium py-2.5 shadow-md shadow-rose-200 hover:bg-rose-600 active:scale-[0.98] transition">
            {loading ? "Creating..." : "Signup"}
          </button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-rose-200 to-transparent" />
          <span className="text-xs text-gray-400">or</span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-rose-200 to-transparent" />
        </div>

        <button onClick={() => window.location.href = "/auth/google"} className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 text-sm font-medium text-gray-700 bg-white hover:shadow-md hover:-translate-y-[1px] transition">
          <FcGoogle className="text-xl" />
          <span>Signup with Google</span>
        </button>

        <p className="mt-6 text-center text-xs text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-rose-500 font-medium hover:underline">Login</Link>
        </p>
      </div>
    </main>
  );
};

export default Signup;

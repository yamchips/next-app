"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const RegisterPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState("");
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");
    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      const error = await response.json();
      console.error(error);
      setText("Invalid email or password.");
    } else {
      const data = await response.json();
      console.log("User registered:", data);
      setText("Registration succeeded. Redirect soon.");
      form.reset();
      setTimeout(() => router.push("/api/auth/signin"), 2000);
    }
    setIsLoading(false);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-rows-4 grid-cols-2 w-90 gap-3"
    >
      <label htmlFor="email" className="text-right">
        Email:
      </label>
      <input
        type="email"
        id="email"
        name="email"
        className="input input-neutral input-xs"
      />
      <label htmlFor="password" className="text-right">
        Password:
      </label>
      <input
        type="password"
        id="password"
        name="password"
        className="input input-neutral input-xs"
      />
      <button
        disabled={isLoading}
        className="btn btn-primary col-span-2 justify-self-center"
      >
        {isLoading ? <span className="loading loading-spinner" /> : "Submit"}
      </button>
      <p className="col-span-2 justify-self-center">{text}</p>
    </form>
  );
};

export default RegisterPage;

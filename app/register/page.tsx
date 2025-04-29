"use client";

import { FormEvent } from "react";

const RegisterPage = () => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
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
    } else {
      const data = await response.json();
      console.log("User registered:", data);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-rows-3 grid-cols-2 w-90 gap-3"
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
      <button className="btn btn-primary col-span-2 justify-self-center">
        Submit
      </button>
    </form>
  );
};

export default RegisterPage;

import React from "react";

export default function Signup() {
  return (
    <div>
      <h2>Did you want to join us ?</h2>
      <label>What is your name ?</label>
      <input
        type="text"
        name="firstName"
        placeholder="Enter your name"
        required
      />
      <label>What's your secondName ?</label>
      <input
        type="text"
        name="secondName"
        placeholder="Enter your send name"
        required
      />
      <label>What's your mail address ?</label>
      <input
        type="mail"
        name="email"
        placeholder="Enter your email address"
        required
      />
      <label>What's your password ?</label>
      <input
        type="password"
        name="password"
        placeholder="Enter your password"
        required
      />
      <input type="button" name="signUp" value="Sign up" />
    </div>
  );
}

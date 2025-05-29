import { useState } from "react";
import FormInput from "../common/form";

function Register() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({
    username: false,
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const usernameValid = username.trim() !== "" && !/\s/.test(username);
  const nameValid = name.trim() !== "";
  const emailValid = /\S+@\S+\.\S+/.test(email);
  const passwordValid =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@*%$#]).{8,}$/.test(password);
  const confirmPasswordValid = password === confirmPassword && passwordValid;

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({
      username: true,
      name: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    if (!usernameValid) {
      setError("Username is required and must not contain spaces.");
      return;
    }
    if (!nameValid) {
      setError("Please enter your name.");
      return;
    }
    if (!emailValid) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!passwordValid) {
      setError(
        "Password must be at least 8 characters, contain uppercase, lowercase, a digit, and a special character (*@%$#)."
      );
      return;
    }
    if (!confirmPasswordValid) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form
        className="w-50 p-5 border border-2 rounded shadow bg-white"
        onSubmit={handleSubmit}
        noValidate
      >
        <h1 className="text-center mb-4">Register</h1>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <FormInput
          label="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onBlur={() => handleBlur("username")}
          isInvalid={touched.username && !usernameValid}
          isValid={touched.username && usernameValid}
          feedbackInvalid="Username is required and must not contain spaces."
          feedbackValid="Looks good!"
          placeholder="Username"
        />
        <FormInput
          label="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => handleBlur("name")}
          isInvalid={touched.name && !nameValid}
          isValid={touched.name && nameValid}
          feedbackInvalid="Please enter your name."
          feedbackValid="Looks good!"
          placeholder="John Doe"
        />
        <FormInput
          label="Email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => handleBlur("email")}
          isInvalid={touched.email && !emailValid}
          isValid={touched.email && emailValid}
          feedbackInvalid="Please enter a valid email address."
          feedbackValid="Looks good!"
          placeholder="name@example.com"
        />
        <div className="position-relative">
          <FormInput
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => handleBlur("password")}
            isInvalid={touched.password && !passwordValid}
            isValid={touched.password && passwordValid}
            feedbackInvalid="Password must be at least 8 characters, contain uppercase, lowercase, a digit, and a special character (*@%$#)."
            feedbackValid="Looks good!"
            placeholder="Password"
          />
          <i
            className={`bi ${
              showPassword ? "bi-eye-slash" : "bi-eye"
            } position-absolute`}
            style={{
              top: "50%",
              right: "1rem",
              transform: "translateY(-50%)",
              cursor: "pointer",
              fontSize: "1.2rem",
              zIndex: 2,
            }}
            onClick={() => setShowPassword((prev) => !prev)}
          ></i>
        </div>
        <FormInput
          label="Confirm Password"
          type={showPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onBlur={() => handleBlur("confirmPassword")}
          isInvalid={touched.confirmPassword && !confirmPasswordValid}
          isValid={touched.confirmPassword && confirmPasswordValid}
          feedbackInvalid="Passwords do not match."
          feedbackValid="Looks good!"
          placeholder="Confirm Password"
        />
        <button
          type="submit"
          className="btn btn-primary w-100 mt-3"
          disabled={
            !usernameValid ||
            !nameValid ||
            !emailValid ||
            !passwordValid ||
            !confirmPasswordValid
          }
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;

import { useState } from "react";
import FormInput from "../common/form";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });

  const emailValid = /\S+@\S+\.\S+/.test(email);
  const passwordValid = password.length >= 8;

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (!emailValid) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!passwordValid) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    setError("");
  };

  return (
    <form
      className="w-50 m-auto mt-5 p-5 border border-2 rounded shadow"
      onSubmit={handleSubmit}
      noValidate
    >
      <h1 className="text-center mb-4">Login</h1>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
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
          feedbackInvalid="Password must be at least 8 characters long."
          feedbackValid="Looks good!"
          placeholder="Password"
        />
        <i
          className={`bi ${
            showPassword ? "bi-eye-slash" : "bi-eye"
          } position-absolute top-50 end-0 translate-middle-y me-5`}
          style={{ cursor: "pointer", fontSize: "1.5rem" }}
          onClick={() => setShowPassword((prev) => !prev)}
          tabIndex={0}
          aria-label={showPassword ? "Hide password" : "Show password"}
        ></i>
      </div>
      <input
        type="submit"
        value="Login"
        className="btn btn-primary mt-3 w-100"
      />
    </form>
  );
}

export default Login;

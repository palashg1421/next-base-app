"use client";

import React from "react";
import { useFormik } from "formik";
import { Eye, EyeOff, Lock, User } from "lucide-react";

const Form = () => {

  const [showPassword, setShowPassword] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);


  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      role: '',
    },
    validationSchema: 'create if not exist, and attach login schema at "src\\schemas\\loginSchema"',
    onSubmit: async (values) => {
    },
  });

  return (
    <form className="form" onSubmit={formik.handleSubmit}>

      {/* simple input */}
      <div className="form-group">
        <label htmlFor="role" className="input-label">Role</label>
        <input
          type="text"
          id="role"
          className="form-input"
          value={formik.values.role}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <p className="input-help">send to you in email</p>
        <p className="form-error">
          {formik.errors.role}
        </p>
      </div>

      {/* grouped input */}
      <div className="form-group">
        <label htmlFor="email" className="input-label">Email</label>
        <div className="input-group">
          <User size={16} />
          <input
            type="text"
            id="email"
            className="form-input"
            autoComplete="off"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <p className="input-help"></p>
        {formik.touched.email && formik.errors.email && (
          <p className="form-error">
            {formik.errors.email}
          </p>
        )}
      </div>

      {/* grouped input with 2 icons */}
      <div className="form-group">
        <label htmlFor="password" className="input-label">Password</label>
        <div className="input-group">
          <Lock size={16} />
          <input
            type="password"
            id="password"
            className="form-input"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <button
            type="button"
            className="cursor-pointer"
          >
            <EyeOff className="h-4 w-4" />
          </button>
        </div>
        <p className="input-help"></p>
        {formik.touched.password && formik.errors.password && (
          <p>
            {formik.errors.password}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
      >
        Login
      </button>
    </form>

  );
};

export default Form

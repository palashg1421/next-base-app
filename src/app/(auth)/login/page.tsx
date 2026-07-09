"use client";

import React from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LoaderCircle, Lock, Mail } from "lucide-react";

import loginSchema from "@/schemas/loginSchema";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";
import { sanatizeInput } from "@/services/utilService";

const Page = () => {
	const router = useRouter();
  const {login} = useAuth();

  const [showPassword, setShowPassword] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      email: "", //jhen@mailinator.com
      password: "", //test@1234
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting, resetForm }: any) => {
      try {
        await login(values.email, sanatizeInput(values.password));
        router.push("/home");
      } catch (error: any) {
        console.log(error);
        toast.error(error.message);
      } finally {
        setSubmitting(false);
        resetForm();
      }
    },
  });

  const doSsoLogin = async () => {
    toast.error("SSO login is not implemented yet.");
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm p-4 rounded-xl shadow-md" style={{ backgroundColor: "var(--app-bg)" }}>
        <h1 className="text-2xl font-bold text-center mb-6 uppercase" style={{ color: "var(--app-text)" }}>
          Sign In
        </h1>

        <form onSubmit={formik.handleSubmit}>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email" className="input-label">Email</label>
            <div className="input-group">
              <Mail size={16} style={{ color: "var(--app-border)" }} />
              <input
                type="email"
                id="email"
                className="form-input"
                placeholder="you@example.com"
                autoComplete="off"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <p className="input-help">Must be the organisation email</p>
            {formik.touched.email && formik.errors.email && (
              <p className="form-error">{formik.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password" className="input-label">Password</label>
            <div className="input-group">
              <Lock size={16} style={{ color: "var(--app-border)" }} />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="form-input"
                placeholder="••••••••"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <button
                type="button"
                className="cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
                style={{ color: "var(--app-border)" }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="form-error">{formik.errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="btn btn-secondary btn-md btn-block"
          >
            {formik.isSubmitting ? (
              <>
                <div className="flex items-center justify-center gap-2">
                  <span>Logging in</span>
                  <LoaderCircle size={16} className="animate-spin" />
                </div>
              </>
            ) : (
              <>Login</>
            )}
          </button>

          <div className="uppercase text-center text-xs" style={{margin: '2px 0'}}>or</div>

          <button
            className="btn btn-outline btn-md btn-block"
            type="button"
            onClick={doSsoLogin}
          >
            SSO Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;

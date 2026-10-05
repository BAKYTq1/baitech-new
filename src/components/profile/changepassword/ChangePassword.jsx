"use client";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { $api } from "../../../../API/api";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { useTranslation } from "react-i18next";
import Breadcrumb from "../../product/ui/Breadcrumb/Breadcrumb.jsx";

const ChangePassword = () => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [passwords, setPasswords] = useState({
    new_password: "",
    confirm_password: "",
  });
  const [showPassword, setShowPassword] = useState({
    new_password: false,
    confirm_password: false,
  });

  // 1. Запрос кода (OTP)
  const requestMutation = useMutation({
    mutationFn: (data) => $api.post("/api/password-reset/request/", data),
    onSuccess: () => {
      setStep(2);
      toast.success(t("changePassword.messages.codeSent"));
    },
    onError: (error) => {
      const message =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        t("changePassword.messages.requestError");
      toast.error(message);
    },
  });

  // 2. Верификация кода
  const verifyMutation = useMutation({
    mutationFn: (data) => $api.post("/api/password-reset/verify/", data),
    onSuccess: () => {
      setStep(3);
      toast.success(t("changePassword.messages.codeConfirmed"));
    },
    onError: (error) => {
      const message =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        t("changePassword.messages.invalidCode");
      toast.error(message);
    },
  });

  // 3. Установка нового пароля
  const completeMutation = useMutation({
    mutationFn: (data) => $api.post("/api/password-reset/complete/", data),
    onSuccess: () => {
      toast.success(t("changePassword.messages.passwordChanged"));
      setStep(1);
      setEmail("");
      setOtp("");
      setPasswords({ new_password: "", confirm_password: "" });
    },
    onError: (error) => {
      const message =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        t("changePassword.messages.saveError");
      toast.error(message);
    },
  });

  const handlePasswordsChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });
  };

  const onFinalSubmit = (e) => {
    e.preventDefault();

    if (passwords.new_password.length < 8) {
      toast.error(t("changePassword.validation.minLength"));
      return;
    }

    if (passwords.new_password !== passwords.confirm_password) {
      toast.error(t("changePassword.validation.passwordMismatch"));
      return;
    }

    completeMutation.mutate({
      email: email,
      otp: otp,
      new_password: passwords.new_password,
      confirm_password: passwords.confirm_password,
    });
  };

  return (
    <div className=" min-h-screen">
      <div className="max-w-[545px]">
        <div className="mb-8 lg:mb-[40px]">
          <Breadcrumb
            items={[
              { label: t("changePassword.breadcrumbs.home"), path: "/" },
              {
                label: t("changePassword.breadcrumbs.account"),
                path: "/profile",
              },
              { label: t("changePassword.breadcrumbs.current"), path: "" },
            ]}
          />
        </div>

        {/* ШАГ 1: EMAIL */}
        {step === 1 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              requestMutation.mutate({ email });
            }}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-2">
              <label className="font-medium text-[#1f2937]">
                * {t("changePassword.step1.emailLabel")}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@example.com"
                className="w-full h-[48px] px-5 bg-white border border-[#D1D5DB] rounded-lg outline-none focus:border-[#122D52]"
              />
            </div>
            <button
              type="submit"
              disabled={requestMutation.isPending}
              className="w-full lg:w-[280px] h-[48px] bg-[#122D52] text-white rounded-lg disabled:bg-gray-400"
            >
              {requestMutation.isPending
                ? t("changePassword.step1.sending")
                : t("changePassword.step1.getCode")}
            </button>
          </form>
        )}

        {/* ШАГ 2: OTP */}
        {step === 2 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              verifyMutation.mutate({ email, otp });
            }}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-2">
              <p className="text-[#122D52] font-medium">
                {t("changePassword.step2.codeSentTo")} {email}
              </p>
              <label className="font-medium text-[#1f2937]">
                * {t("changePassword.step2.enterCode")}
              </label>
              <input
                type="text"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder={t("changePassword.step2.codePlaceholder")}
                className="w-full h-[48px] px-5 bg-white border border-[#D1D5DB] rounded-lg outline-none focus:border-[#122D52]"
              />
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={verifyMutation.isPending}
                className="w-full lg:w-[280px] h-[48px] bg-[#122D52] text-white rounded-lg disabled:bg-gray-400"
              >
                {verifyMutation.isPending
                  ? t("changePassword.step2.checking")
                  : t("changePassword.step2.confirmCode")}
              </button>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-[#122D52] underline text-sm"
              >
                {t("changePassword.step2.changeEmail")}
              </button>
            </div>
          </form>
        )}

        {/* ШАГ 3: НОВЫЙ ПАРОЛЬ */}
        {step === 3 && (
          <form onSubmit={onFinalSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-medium text-[#1f2937]">
                  * {t("changePassword.step3.newPassword")}
                </label>
                <div className="relative">
                  <input
                    type={showPassword.new_password ? "text" : "password"}
                    name="new_password"
                    required
                    value={passwords.new_password}
                    onChange={handlePasswordsChange}
                    className="w-full h-[48px] px-5 pr-12 bg-white border border-[#D1D5DB] rounded-lg outline-none focus:border-[#122D52]"
                    placeholder={t("changePassword.step3.minChars")}
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("new_password")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword.new_password ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {passwords.new_password &&
                  passwords.new_password.length < 8 && (
                    <p className="text-xs text-red-500">
                      {t("changePassword.validation.minLength")}
                    </p>
                  )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-medium text-[#1f2937]">
                  * {t("changePassword.step3.confirmPassword")}
                </label>
                <div className="relative">
                  <input
                    type={showPassword.confirm_password ? "text" : "password"}
                    name="confirm_password"
                    required
                    value={passwords.confirm_password}
                    onChange={handlePasswordsChange}
                    className="w-full h-[48px] px-5 pr-12 bg-white border border-[#D1D5DB] rounded-lg outline-none focus:border-[#122D52]"
                    placeholder={t("changePassword.step3.repeatPassword")}
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("confirm_password")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword.confirm_password ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {passwords.confirm_password &&
                  passwords.new_password !== passwords.confirm_password && (
                    <p className="text-xs text-red-500">
                      {t("changePassword.validation.passwordMismatch")}
                    </p>
                  )}
              </div>
            </div>

            <button
              type="submit"
              disabled={completeMutation.isPending}
              className="w-full lg:w-[280px] h-[48px] bg-[#122D52] text-white rounded-lg disabled:bg-gray-400"
            >
              {completeMutation.isPending
                ? t("changePassword.step3.saving")
                : t("changePassword.step3.resetPassword")}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ChangePassword;

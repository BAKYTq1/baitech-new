"use client"
import React, { useState } from "react";
import "./LoginPage.scss";
import InputField from "@/components/ui/auth/inputFeiled";
import Divider from "@/components/ui/auth/divider";
import Button from "@/components/ui/auth/buttton";
import CloseRegister from "@/components/ui/auth/closeregister";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useLogin, useRegister } from "@/lib/auth/hooks/hooks";
import { useTranslation } from "react-i18next";

const LoginPage = ({ type = "login" }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [number, setPhone] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const router = useRouter();

  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (type === "login") {
      try {
        const response = await loginMutation.mutateAsync({
          email,
          password
        });

        console.log('Login response:', response);

        const isAdmin = response?.role === 'admin' ||
                        response?.user?.role === 'admin' ||
                        response?.user?.is_staff === true ||
                        response?.user?.is_superuser === true;

        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminRefreshToken');
        localStorage.removeItem('isAdmin');

        if (isAdmin) {
          if (response?.access) {
            localStorage.setItem('adminToken', response.access);
            localStorage.setItem('access_token', response.access);
            localStorage.setItem('accessToken', response.access);
          }
          if (response?.refresh) {
            localStorage.setItem('adminRefreshToken', response.refresh);
            localStorage.setItem('refresh_token', response.refresh);
          }
          localStorage.setItem('isAdmin', 'true');
          localStorage.setItem('userRole', response?.role || response?.user?.role || 'admin');
          toast.success(t('loginPage.messages.welcomeAdmin'));
          router.push('/productss');
        } else {
          if (response?.access) {
            localStorage.setItem('access_token', response.access);
            localStorage.setItem('accessToken', response.access);
          }
          if (response?.refresh) {
            localStorage.setItem('refresh_token', response.refresh);
          }
          localStorage.setItem('userRole', response?.user?.role || 'user');
          toast.success(t('loginPage.messages.loginSuccess'));
          router.push('/');
        }

        if (response?.user) {
          localStorage.setItem('user', JSON.stringify(response.user));
          console.log('User data saved');
        }
        
      } catch (error) {
        console.error('Login error:', error);
      }
    } else {
      if (!acceptedTerms) {
        toast.error(t('loginPage.messages.acceptTerms'));
        return;
      }

      if (password.length < 8) {
        toast.error(t('loginPage.messages.passwordLength'));
        return;
      }

      try {
        const formData = {
          name: name,
          surname: surname,
          number,
          email,
          password
        };

        await registerMutation.mutateAsync(formData);
        
        router.push(`/codeverify?email=${encodeURIComponent(email)}`);
      } catch (error) {
        console.error('Registration error:', error);
      }
    }
  };

  const isLoading = type === "login" 
    ? loginMutation.isPending 
    : registerMutation.isPending;

  const error = type === "login"
    ? loginMutation.error
    : registerMutation.error;

  return (
    <div className={`login-form1`}>
      <div className="login-form1__container">
        <CloseRegister onClose={() => router.push("/")}/>
        <header className="login-form1__header">
          <h2
            onClick={() => router.push("/login")}
            className={`login-form1__title ${type === "login" ? "active" : ""}`}
          >
            {t('loginPage.tabs.login')}
          </h2>
          <h2
            className={`login-form1__title ${
              type === "register" ? "active" : ""
            }`}
            onClick={() => router.push("/register")}
          >
            {t('loginPage.tabs.register')}
          </h2>
        </header>

        <form onSubmit={handleSubmit} className="login-form1__form">
          {type === "register" && (
            <>
              <InputField
                type="text"
                placeholder={t('loginPage.placeholders.name')}
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
                required
              />
              <InputField
                type="text"
                placeholder={t('loginPage.placeholders.surname')}
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                disabled={isLoading}
                required
              />
              <InputField
                type="tel"
                placeholder={t('loginPage.placeholders.phone')}
                value={number}
                onChange={(e) => setPhone(e.target.value)}
                disabled={isLoading}
                required
              />
            </>
          )}
          <InputField
            type="email"
            placeholder={t('loginPage.placeholders.email')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
          />

          <InputField
            type="password"
            placeholder={t('loginPage.placeholders.password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            required
          />

          {error && (
            <div className="login-form1__error">
              {error?.response?.data?.message || 
               error?.response?.data?.detail ||
               error?.response?.data?.email ||
               error?.response?.data?.number ||
               error?.response?.data?.non_field_errors  ||
               (type === "login" ? t('loginPage.messages.loginError') : t('loginPage.messages.registerError'))}
            </div>
          )}

          <Divider />

          {type === "register" && (
            <div className="login-form1__terms-container">
              <input 
                type="checkbox" 
                className="login-form1__terms-checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                disabled={isLoading}
              />
              <p className="login-form1__terms">
                {t('loginPage.termsText')}
                <Link href="/terms" className="login-form1__terms-link">
                  {t('loginPage.termsLink')}
                </Link>
              </p>
            </div>
          )}

          <Button
            type="submit"
            variant="dark-blue"
            size="large"
            fullWidth
            loading={isLoading}
            disabled={isLoading || (type === "register" && !acceptedTerms)}
          >
            {type === "login" ? t('loginPage.buttons.login') : t('loginPage.buttons.register')}
          </Button>
        </form>

        {type === "login" && (
          <div className="login-form1__footer">
            <Link href="/forgot-password" className="login-form1__forgot-password">
              {t('loginPage.forgotPassword')}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;


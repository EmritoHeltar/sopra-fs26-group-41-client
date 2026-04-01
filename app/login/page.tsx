"use client"; // For components that need React hooks and browser APIs, SSR (server side rendering) has to be disabled. Read more here: https://nextjs.org/docs/pages/building-your-application/rendering/server-side-rendering

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // use NextJS router for navigation
import { useApi } from "@/hooks/useApi";
import useLocalStorage from "@/hooks/useLocalStorage";
import { LoginRequest, LoginResponse} from "@/types/user";
import { Button, Form, Input, Typography, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Link from "next/link";
import styles from "../styles/page.module.css";

interface FormFieldProps {
  label: string;
  value: string;
}

const Login: React.FC = () => {
  const router = useRouter();
  const apiService = useApi();
  const [form] = Form.useForm();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // useLocalStorage hook example use
  // The hook returns an object with the value and two functions
  // Simply choose what you need from the hook:
  const {
    // value: token, // is commented out because we do not need the token value
    set: setToken, // we need this method to set the value of the token to the one we receive from the POST request to the backend server API
    // clear: clearToken, // is commented out because we do not need to clear the token when logging in
  } = useLocalStorage<string>("token", ""); // note that the key we are selecting is "token" and the default value we are setting is an empty string
  // if you want to pick a different token, i.e "usertoken", the line above would look as follows: } = useLocalStorage<string>("usertoken", "");

  const handleLogin = async (values: LoginRequest) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const response = await apiService.post<LoginResponse>("/login", values);
      setToken(response.token);
      router.push("/users/me");
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(`Login failed: ${error.message}`);
      } else {
        setErrorMessage("Login failed. Please check your credentials.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.headerSection}>
        <Typography.Title level={2} className={styles.title}>
          Movieblendr.
        </Typography.Title>
        <Typography.Text type="secondary">
          Welcome back! Login to continue
        </Typography.Text>
      </div>

      <div className={styles.formCard}>
        <Typography.Title level={3} className={styles.formTitle}>
          Login
        </Typography.Title>
        
        {errorMessage && (
          <Alert
            description={errorMessage}
            type="error"
            showIcon
            className={styles.errorAlert}
          />
        )}

        <Form
          form={form}
          name="login"
          size="large"
          layout="vertical"
          onFinish={handleLogin}
          requiredMark={false}
        >
          <Form.Item
            name="username"
            label={<span className={styles.labelSpan}>Username</span>}
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              prefix={<UserOutlined className={styles.inputIcon} />}
              placeholder="Enter your username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            label={<span className={styles.labelSpan}>Password</span>}
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className={styles.inputIcon} />}
              placeholder="Enter your password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              className={styles.loginButton}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
        <div className={styles.registerTextContainer}>
          <Typography.Text>
            Don&apos;t have an account? <Link href="/register" className={styles.registerLink}>Register</Link>
          </Typography.Text>
        </div>
      </div>
    </div>
  );
};

export default Login;

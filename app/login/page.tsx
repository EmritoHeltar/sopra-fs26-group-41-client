"use client"; // For components that need React hooks and browser APIs, SSR (server side rendering) has to be disabled. Read more here: https://nextjs.org/docs/pages/building-your-application/rendering/server-side-rendering

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // use NextJS router for navigation
import { useApi } from "@/hooks/useApi";
import useLocalStorage from "@/hooks/useLocalStorage";
import { LoginRequest, LoginResponse, User } from "@/types/user";
import { Button, Form, Input, Typography, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Link from "next/link";
// Optionally, you can import a CSS module or file for additional styling:
// import styles from "@/styles/page.module.css";

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#FDFBD4",
        padding: "20px",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <Typography.Title level={2} style={{ color: "#d32f2f", margin: 0 }}>
          Movieblendr.
        </Typography.Title>
        <Typography.Text type="secondary">
          Welcome back! Login to continue
        </Typography.Text>
      </div>

      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "#fff",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography.Title
          level={3}
          style={{ textAlign: "center", color: "#d32f2f", marginBottom: "24px" }}
        >
          Login
        </Typography.Title>
        
        {errorMessage && (
          <Alert
            message={errorMessage}
            type="error"
            showIcon
            style={{ marginBottom: "20px" }}
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
            label={<span style={{ color: "#d32f2f" }}>Username</span>}
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Enter your username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            label={<span style={{ color: "#d32f2f" }}>Password</span>}
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Enter your password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              style={{
                width: "100%",
                backgroundColor: "#d32f2f",
                borderColor: "#d32f2f",
                marginTop: "10px",
              }}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <Typography.Text>
            Don't have an account? <Link href="/register" style={{ color: "#1890ff" }}>Register</Link>
          </Typography.Text>
        </div>
      </div>
    </div>
  );
};

export default Login;

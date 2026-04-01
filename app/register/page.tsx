"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useApi } from "@/hooks/useApi";
import { Button, Form, Input, Typography, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Link from "next/link";
import styles from "../styles/page.module.css";

const Register: React.FC = () => {
  const router = useRouter();
  const apiService = useApi();
  const [form] = Form.useForm();
  
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRegister = async (values: any) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      await apiService.post("/register", values);
      router.push("/login");
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(`Registration failed: ${error.message}`);
      } else {
        setErrorMessage("Registration failed. Username might be taken.");
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
          Create your account to start blending
        </Typography.Text>
      </div>

      <div className={styles.formCard}>
        <Typography.Title level={3} className={styles.formTitle}>
          Create Account
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
          name="register"
          size="large"
          layout="vertical"
          onFinish={handleRegister}
          requiredMark={false}
        >
          <Form.Item
            name="username"
            label={<span className={styles.labelSpan}>Username</span>}
            rules={[{ required: true, message: "Please choose a username!" }]}
          >
            <Input
              prefix={<UserOutlined className={styles.inputIcon} />}
              placeholder="Choose a username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            label={<span className={styles.labelSpan}>Password</span>}
            rules={[{ required: true, message: "Please create a secure password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className={styles.inputIcon} />}
              placeholder="Create a secure password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              className={styles.loginButton}
            >
              Create Account
            </Button>
          </Form.Item>
        </Form>
        <div className={styles.registerTextContainer}>
          <Typography.Text>
            Already have an account? <Link href="/login" className={styles.registerLink}>Login</Link>
          </Typography.Text>
        </div>
      </div>
    </div>
  );
};

export default Register;

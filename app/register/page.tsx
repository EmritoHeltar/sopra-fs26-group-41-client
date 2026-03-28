"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useApi } from "@/hooks/useApi";
import { Form } from "antd";

const Register: React.FC = () => {
  // Navigation hook
  const router = useRouter();
  // API hook
  const apiService = useApi();
  // Ant Design Form hook
  const [form] = Form.useForm();
  
  // Step 2: Establish state variables for error messaging and loading
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div>
      <h1>Register Page State Initialized</h1>
      <p>Error Message State: {errorMessage === null ? "null" : errorMessage}</p>
      <p>Loading State: {isLoading.toString()}</p>
    </div>
  );
};

export default Register;

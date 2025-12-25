import { Alert } from "@mui/material";
import React from "react";

// 에러 메시지 타입 정의
interface ErrorMessageProps {
  message: string;
}

// 에러 메시지를 화면에 표시하는 컴포넌트
const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return <Alert severity="error">{message}</Alert>;
};

export default ErrorMessage;

import React, {useCallback, useState} from "react";
import useInput from "../hooks/useInput";
import {Button, Form, Spinner} from "react-bootstrap";
import {loginAPI} from "../apis/user";
import Router from "next/router";

const LoginForm = () => {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback((event) => {
    event.preventDefault();
    setLoading(true);
    loginAPI({email, password})
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {
        alert(error.response.data);
      })
      .finally(() => {
        setLoading(false);
      });
    setLoading(false);
  }, [email, password])

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group controlId="email">
        <Form.Label column="sm">이메일</Form.Label>
        <Form.Control type="email" onChange={onChangeEmail} placeholder="이메일을 입력해주세요."/>
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label column="sm">이메일</Form.Label>
        <Form.Control type="password" onChange={onChangePassword} placeholder="이메일을 입력해주세요."/>
      </Form.Group>
      <Button variant="primary" size="sm" type="submit">
        {loading && <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
          className="me-2"
        />}
        로그인</Button>
    </Form>
  );
}

export default LoginForm;

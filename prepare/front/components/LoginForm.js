import React, {useCallback, useState} from "react";
import useInput from "../hooks/useInput";
import {Button, Form, Spinner} from "react-bootstrap";
import {loginAPI} from "../apis/user";
import Router from "next/router";
import {useMutation, useQueryClient} from "react-query";

const LoginForm = () => {
  const queryClient = useQueryClient();
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [loading, setLoading] = useState(false);

  const mutation = useMutation('user', loginAPI, {
    onMutate: () => {
      setLoading(true);
    },
    onError: (error) => {
      alert(error.response?.data);
    },
    onSuccess: (user) => {
      console.log(user)
      queryClient.setQueryData('user', user);
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const onSubmit = useCallback((event) => {
    event.preventDefault();
    mutation.mutate({email, password});
  }, [email, password, mutation])

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

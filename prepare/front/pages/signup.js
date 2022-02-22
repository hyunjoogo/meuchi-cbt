import React from 'react';
import {useForm} from "react-hook-form";
import AppLayout from "../components/AppLayout";
import {Button, Col, Container, Form, Row} from "react-bootstrap";

const Signup = () => {
  const {register, handleSubmit, watch, getValues, formState: {errors}} = useForm();
  const onSubmit = data => {
    console.log(data);
  }

  return (
    <AppLayout>
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="email">
            <Form.Label column="sm">이메일</Form.Label>
            <Form.Control
              {...register("email", {
                required: "이메일을 입력해주세요.",
                maxLength: {
                  value: 256,
                  message: "256자 이내로 입력해주세요."
                },
                pattern: {
                  value: /[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9.]+/gm,
                  message: "이메일 주소 형식이 올바르지 않습니다.",
                },
              })}
            />
            <div>{errors?.email?.message}</div>
          </Form.Group>
          <Form.Group controlId="name">
            <Form.Label column="sm">이름</Form.Label>
            <Form.Control
              {...register("name", {
                required: "이름을 입력해주세요.",
                maxLength: {
                  value: 256,
                  message: "256자 이내로 입력해주세요."
                },
              })}
              placeholder="이름을 입력해주세요."
            />
            <div>{errors?.name?.message}</div>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label column="sm">비밀번호</Form.Label>
            <Form.Control
              {...register("password", {
                required: "비밀번호를 입력해주세요.",
                minLength: 8,
                maxLength: {
                  value: 16,
                  message: "8~16자리 영문자, 숫자, 특수문자를 사용해주세요."
                },
                pattern: {
                  value: /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,16}$/,
                  message: "영문자, 숫자, 특수문자를 사용해주세요.",
                },
              })}
              placeholder="8~16자리 영문자, 숫자, 특수문자를 사용해주세요." type="password"
            />
            <div>{errors?.password?.message}</div>
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label column="sm">비밀번호 확인</Form.Label>
            <Form.Control
              {...register("confirmPassword", {
                required: "비밀번호를 입력해주세요.",
                validate: value => {
                  if (value === getValues('password')) {
                    return true
                  } else {
                    return <span>비밀번호가 맞지 않습니다.</span>
                  }
                }
              })}
              placeholder="다시 한 번 입력해주세요." type="password"
            />
            <div>{errors?.confirmPassword?.message}</div>
          </Form.Group>
          <Button variant="primary" size="sm" type="submit">저장</Button>
        </Form>
      </Container>
    </AppLayout>
  )
}

export default Signup;

import React from 'react';
import {useForm} from "react-hook-form";
import AppLayout from "../components/AppLayout";
import {Button, Col, Container, Form, Row} from "react-bootstrap";

const Signup = () => {
  const {register, handleSubmit, watch, formState: {errors}} = useForm();
  const onSubmit = data => {
    console.log(errors)
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
          </Form.Group>
          <div>{errors?.email?.message}</div>
          <Button variant="primary" size="sm" type="submit">저장</Button>
        </Form>
      </Container>
    </AppLayout>
  )
}

export default Signup;

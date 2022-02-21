import AppLayout from "../components/AppLayout";
import React, {useCallback, useEffect, useState} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {addDay, format, now, subtractDay} from "../utils/DateUtil";
import useInput from "../hooks/useInput";


const Diet = () => {
  const [calorie, onChangeCalorie] = useInput('');
  const [weight, onChangeWeight] = useInput('');
  const [date, setDate] = useState(format(now()));

  useEffect(() => {
    // 서버에서 해당날짜의 칼로리, 체중 받아오기
    // 받아온 값 set하기
  }, [])

  const onSubmitForm = useCallback((event) => {
    event.preventDefault();
    console.log(calorie, weight)
  }, [calorie, weight]);

  const onChangeDate = useCallback((event) => {
    const name = event.target.dataset.name;
    if (name === "subtract") {
      setDate(subtractDay(date))
      console.log(subtractDay(date))
    } else {
      setDate(addDay(date))
      console.log(addDay(date))
    }
  }, [date])

  return (
    <AppLayout>
      <Container>
        <Row>
          <Col className="d-flex justify-content-center">
            <div className="fs-4" data-name='subtract' onClick={onChangeDate}>&lt;</div>
            <div className="fs-4 mx-2">{date}</div>
            <div className="fs-4" data-name='add' onClick={onChangeDate}>&gt;</div>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex flex-row justify-content-center">
            <Form className="d-flex flex-row justify-content-center"
                  onSubmit={onSubmitForm}>
              <Form.Group controlId="calorie">
                <Form.Label column="sm">섭취 칼로리</Form.Label>
                <Form.Control type="number" value={calorie} onChange={onChangeCalorie} placeholder="섭취 칼로리량을 입력해주세요."/>
              </Form.Group>
              <Form.Group controlId="weight">
                <Form.Label column="sm">체중</Form.Label>
                <Form.Control type="number" value={weight} onChange={onChangeWeight} placeholder="체중을 입력해주세요."/>
              </Form.Group>
              <Button variant="primary" size="sm" type="submit">저장</Button>
            </Form>
          </Col>
        </Row>

        7일 1달 3개월 그래프 보여주기
      </Container>
    </AppLayout>
  )
}

export default Diet;

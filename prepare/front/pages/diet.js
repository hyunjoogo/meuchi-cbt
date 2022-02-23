import AppLayout from "../components/AppLayout";
import React, {useCallback, useEffect, useState} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {addDay, format, now, subtractDay} from "../utils/DateUtil";
import useInput from "../hooks/useInput";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {loadMyInfoAPI, loginAPI} from "../apis/user";
import {addDietAPI, loadDietAPI} from "../apis/diet";
import {Router, useRouter} from "next/router";


const Diet = () => {
  const router = useRouter()
  const queryClient = useQueryClient();
  const {data: me} = useQuery('user', loadMyInfoAPI);
  const [calorie, onChangeCalorie, setCalorie] = useInput('');
  const [weight, onChangeWeight, setWeight] = useInput('');
  const [date, setDate] = useState(format(now()));
  const [loading, setLoading] = useState(false);

  const [dietId, setDietId] = useState();

  const mutation = useMutation('diet', addDietAPI, {
    onMutate: () => {
      setLoading(true);
    },
    onError: (error) => {
      alert(error.response?.data);
    },
    onSuccess: (diet) => {
      queryClient.setQueryData('diet', diet);
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  useEffect(() => {
    // 서버에서 해당날짜의 칼로리, 체중 받아오기
    // 받아온 값 set하기
    if (!me) {
      return router.replace("/");
    }

  }, [date])

  const fetch = () => {
    loadDietAPI(me.id, date)
      .then(res => {
        setCalorie(res.calorie);
        setWeight(res.weight);
        setDietId(res.id);
      })
  }

  const onSubmitForm = useCallback((event) => {
    event.preventDefault();
    if (!me.id) {
      return alert('로그인을 해주세요!');
    }
    mutation.mutate({
      calorie: calorie === "" ? null : calorie,
      weight: weight === "" ? null : weight,
      date,
      userId: me.id,
      dietId
    });
  }, [calorie, weight, date]);

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
              <div>
                <label>섭취 칼로리</label>
                <input
                  type="number"
                  value={calorie}
                  onChange={onChangeCalorie}
                  onBlur={onSubmitForm}/>
              </div>
              <div>
                <label>체중</label>
                <input
                  type="number"
                  value={weight}
                  onChange={onChangeWeight}
                  onBlur={onSubmitForm}/>
              </div>
            </Form>
          </Col>
          {/*<Button variant="primary" size="sm" type="submit">저장</Button>*/}
        </Row>

        7일 1달 3개월 그래프 보여주기
      </Container>
    </AppLayout>
  )
}

export default Diet;

import React, {useCallback, useState} from 'react';
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {useRouter} from "next/router";
import Link from 'next/link';
import {useMutation, useQuery, useQueryClient} from "react-query";
import {logOutAPI} from "../apis/user";

const AppLayout = ({children}) => {
  const router = useRouter()
  const currentPath = router.pathname
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const {data: me} = useQuery('user');

  const mutation = useMutation(logOutAPI, {
    onMutate: () => {
      setLoading(true);
    },
    onError: (error) => {
      alert(error.response?.data);
    },
    onSuccess: () => {
      queryClient.setQueryData('user', null);
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const onLogOut = useCallback(() => {
    console.log('logout mutate');
    mutation.mutate();
  }, [mutation]);

  return (
    <>
      <Navbar bg="light" expand="sm" className="pe-3 ps-3">
        <Link href="/" passHref>
          <Navbar.Brand>메루치 양식장</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          {/* TODO 현재 페이지에는 글씨가 두껍게 나오게 하기*/}
          <Nav className="me-auto">
            <Link href="/diet" passHref>
              <Nav.Link>식단 입력</Nav.Link>
            </Link>
            <Link href="/weight" passHref>
              <Nav.Link>체중 변화</Nav.Link>
            </Link>
            <Link href="/routine" passHref>
              <Nav.Link>운동 루틴</Nav.Link>
            </Link>
            <Link href="/profile" passHref>
              <Nav.Link>프로필</Nav.Link>
            </Link>
            {me ?
              <Link href="/" passHref >
                <Nav.Link onClick={onLogOut}>로그아웃</Nav.Link>
              </Link>
              : <Link href="/signup" passHref>
                <Nav.Link>회원가입</Nav.Link>
              </Link>}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {children}
    </>
  )
}

export default AppLayout;

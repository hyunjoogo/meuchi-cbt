import React from 'react';
import AppLayout from "../components/AppLayout";
import LoginForm from "../components/LoginForm";
import {useQuery} from "react-query";
import {loadMyInfoAPI} from "../apis/user";


const Home = () => {
  const { data: me } = useQuery('user', loadMyInfoAPI);
  return (
    <AppLayout>
      {!me ? <LoginForm/> : <h1>로그인되었습니다.</h1>}
    </AppLayout>
  )
}

export default Home;

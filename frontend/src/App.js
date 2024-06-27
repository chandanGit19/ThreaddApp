
import {  Container } from '@chakra-ui/react';
import { Navigate, Route, Routes } from 'react-router-dom';
import UserPages from './pages/UserPages';
import PostPage from './pages/PostPage';
import Header from './component/Header';
import HomePage from './pages/HomePage';
import AuthPages from './pages/AuthPages';
import { useRecoilValue } from 'recoil';
import userAtom from './atoms/userAtoms';
import Loginbutton from './component/Loginbutton';
import Updateprofile from './component/Updateprofile';
import Createpost from './component/Createpost';

function App() {
  const user = useRecoilValue(userAtom);
  return (
   <Container maxW="620px">
    <Header/>
    <Routes>
      <Route path='/' element={user ? <HomePage/> : <Navigate to="/auth"/>}/>
      <Route path='/auth' element={!user ? <AuthPages/> : <Navigate to="/"/>}/>
      <Route path='/updateprofile' element={user ? <Updateprofile/> : <Navigate to="/"/>}/>
      <Route path="/:username" element={ <UserPages/> }/>
      <Route path="/:username/post/:pid" element={<PostPage/>}/>
    </Routes>

      {user && <Loginbutton/>}
      {user && <Createpost/>}


   </Container>
  );
}

export default App;

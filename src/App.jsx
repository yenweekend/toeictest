import { useState } from 'react'
import {Routes, Route} from "react-router-dom";
import { paths } from './utils/paths.jsx'
import {Login, Register, StudentMaster, Testpro} from "./containers/pages/user";
import {AdminMaster, ManageRoom, CreateExam, ManageStudent,} from './containers/pages/admin';
function App() {

  return (
    <>
    <Routes>
      <Route element={<Login/>} path={paths.LOGIN}></Route>
      <Route element={<Register/>} path={paths.REGISTER}></Route>
      <Route element={<StudentMaster/>} path={paths.STUDENTCLASSROOM}>
      </Route>
      <Route element={<Testpro/>} path={paths.STUDENTTEST}>
      </Route>
      <Route element={<AdminMaster/>} path='/vi'>
        <Route element={<ManageRoom/>} path={paths.ADMIN_MANAGE_CLASSROOM}></Route>
        <Route element={<CreateExam/>} path={paths.ADMIN_CREATE_EXAM}></Route>
        <Route element={<ManageStudent/>} path={paths.ADMIN_MANAGE_STUDENT}></Route>
      </Route>
    </Routes>
    </>
  )
}

export default App

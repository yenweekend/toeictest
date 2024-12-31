import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { paths } from "./utils/paths.jsx";
import {
  Class,
  Login,
  Register,
  StudentMaster,
  Testpro,
  StudentClassDetail,
  ViewResult,
  ViewProgress,
} from "./containers/pages/user";
import {
  AdminMaster,
  ManageRoom,
  CreateExam,
  ManageStudent,
  AdminStudent,
  ClassDetail,
  ViewStudentProgress,
  ListTest,
  ReviewTest,
} from "./containers/pages/admin";
import { ProtectedRoute, DefaultRoute } from "./containers/components";
import { currentUser } from "./redux-toolkit/selector/auth.selector.jsx";
import { useSelector } from "react-redux";
import setAuthToken from "./helpers/setAuthToken.jsx";

function App() {
  const navigate = useNavigate();
  const userRole = useSelector(currentUser);
  useEffect(() => {
    if (window.location.pathname === "/") {
      if (userRole.role === "Student") {
        navigate("/vi/student/classroom");
      } else if (userRole.role === "Teacher") {
        navigate("/vi/admin/student/manage-classroom/");
      } else {
        navigate("/vi/auth/login"); // Redirect to login if role is not recognized
      }
    }
  }, [navigate, userRole]);
  useEffect(() => {
    if (localStorage["auth-token"]) {
      setAuthToken(localStorage["auth-token"]);
    } else {
      setAuthToken(null);
    }
  }, [localStorage["auth-token"]]);
  return (
    <>
      <Routes>
        <Route element={<Login />} path={paths.LOGIN}></Route>
        <Route element={<Register />} path={paths.REGISTER}></Route>
        <Route
          element={
            <ProtectedRoute allowedRoles={["Student"]}>
              <Testpro />
            </ProtectedRoute>
          }
          path={paths.STUDENTTEST}
        ></Route>

        <Route
          element={
            <ProtectedRoute allowedRoles={["Student"]}>
              <StudentMaster />
            </ProtectedRoute>
          }
          path={paths.STUDENTMASTER}
        >
          <Route
            index
            element={<Navigate to={paths.STUDENTCLASSROOM} replace />}
          />

          <Route element={<ViewResult />} path={paths.VIEWTESTRESULT}></Route>
          <Route element={<Class />} path={paths.STUDENTCLASSROOM}></Route>
          <Route
            element={<ViewProgress />}
            path={paths.STUDENTVIEWPROGRESS}
          ></Route>
          <Route
            element={<StudentClassDetail />}
            path={paths.STUDENTVIEWCLASS}
          ></Route>
          <Route element={<Class />} path="*"></Route>
        </Route>
        {/* <Route element={<Chart/>} path='/chart'></Route> */}

        <Route element={<AdminMaster />} path="/vi">
          <Route
            element={
              <ProtectedRoute allowedRoles={["Teacher"]}>
                <AdminStudent />
              </ProtectedRoute>
            }
            path={paths.ADMIN_STUDENT}
          >
            <Route
              index
              element={<Navigate to={paths.ADMIN_MANAGE_CLASSROOM} replace />}
            />
            <Route
              element={<ManageRoom />}
              path={paths.ADMIN_MANAGE_CLASSROOM}
            ></Route>
            <Route
              element={<ManageStudent />}
              path={paths.ADMIN_MANAGE_STUDENT}
            ></Route>
            <Route
              element={<CreateExam />}
              path={paths.ADMIN_CREATE_EXAM}
            ></Route>
            <Route element={<ClassDetail />} path={paths.ADMIN_CLASSDETAIL}>
              <Route index element={<DefaultRoute />} />
              <Route
                element={<ViewStudentProgress />}
                path="/vi/admin/student/classroom-details/:classroomId/0"
              ></Route>
              <Route
                element={<ListTest />}
                path="/vi/admin/student/classroom-details/:classroomId/1"
              ></Route>
              <Route
                element={<ReviewTest />}
                path="/vi/admin/student/classroom-details/:classroomId/1/test-review/:testId"
              ></Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;

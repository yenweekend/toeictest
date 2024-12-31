import React from 'react'
import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
const DefaultRoute = () => {
const { classroomId } = useParams(); // Get the classroomId from the URL
  return (
    <Navigate
    to={`/vi/admin/student/classroom-details/${classroomId}/1`}
    replace
  />
  )
}

export default DefaultRoute

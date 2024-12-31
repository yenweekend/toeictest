export const paths = {
    MASTER: "",
    LOGIN: "/vi/auth/login",
    REGISTER: "/vi/auth/register",
    STUDENTMASTER:"/vi/student",
    STUDENTCLASSROOM: "/vi/student/classroom",
    STUDENTTEST: "/vi/student/classroom/testpro/:testId",
    STUDENTVIEWCLASS: "/vi/student/classroom-details/:classroomId",
    STUDENTVIEWPROGRESS: "/vi/student/view-progress",
    VIEWTESTRESULT:"/vi/student/test-result/:attemptId",
    ADMIN_CREATE_EXAM :"/vi/admin/student/create-manual-test",
    ADMIN_MANAGE_STUDENT: "/vi/admin/student/manage-student/:classroomId",
    ADMIN_MANAGE_CLASSROOM: "/vi/admin/student/manage-classroom/",
    ADMIN_CLASSDETAIL: "/vi/admin/student/classroom-details/:classroomId",
    ADMIN_REVIEW_RESULT: "/vi/admin/student/review-test/:testId",
    ADMIN_STUDENT: "/vi/admin/student"
}
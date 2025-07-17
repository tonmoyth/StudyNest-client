import {
  FaUsers,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaClipboardList,
} from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Components/Loading/Loading";
import useAuth from "../../../Hooks/useAuth";
import useUserRole from "../../../Hooks/useUserRole";

const Dashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { role } = useUserRole();

  // admin
  // get total classes
  const { data: totalClasses = [] } = useQuery({
    queryKey: ["totalClasses"],
    queryFn: async () => {
      const res = await axiosSecure.get("/total-classes");
      return res.data;
    },
  });
  // get total users
  const { data: totalUser = [], isLoading } = useQuery({
    queryKey: ["totalUser"],
    queryFn: async () => {
      const res = await axiosSecure.get("/total-users");
      return res.data;
    },
  });
  const { data: totalStudents = [] } = useQuery({
    queryKey: ["totalStudents"],
    queryFn: async () => {
      const res = await axiosSecure.get("/total-students");
      return res.data;
    },
  });
  const { data: totalTeachers = [] } = useQuery({
    queryKey: ["total-teachers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/total-teachers");
      return res.data;
    },
  });

  // teacher
  // total class
  const { data: teacherClasses = [] } = useQuery({
    queryKey: ["teacher-classes"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/classes?email=${user?.email}`);
      return res.data;
    },
  });

  // get total enrolment
  const { data: teacherTotalEnrollments = [] } = useQuery({
    queryKey: ["teacherTotalEnrollments"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/teachers_enrollments_total?email=${user?.email}`
      );
      return res.data;
    },
  });

  // get totol assignment for techer
  const { data: totalAssignment = [] } = useQuery({
    queryKey: ["total-assignment"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/assignments_total?email=${user?.email}`
      );
      return res.data;
    },
  });

  // student
  const { data: totalEnrolledClasses = [] } = useQuery({
    queryKey: ["total-enrolled-classes", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/enrolled-classes?email=${user?.email}`
      );
      return res.data;
    },
  });

  const { data: totalStudentAssignment = [] } = useQuery({
    queryKey: ["total-student-assignment"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/assignments_student_total?email=${user?.email}`
      );
      return res.data;
    },
  });

  const pieData = [
    { name: "Students", value: totalStudents.totalStudents || 0 },
    { name: "Teachers", value: totalTeachers.totalTeachers || 0 },
    { name: "Users", value: totalUser.totalUser || 0 },
    { name: "Classes", value: totalClasses.totalClasses || 0 },
  ];

  const teacherData = [
    { name: "classes", value: teacherClasses.totalItems || 0 },
    {
      name: "enrollments",
      value: teacherTotalEnrollments.totalEnrollments || 0,
    },
    { name: "assignments", value: totalAssignment.totalAssignments || 0 },
  ];
  const studentData = [
    {
      name: "total Enrollments classes",
      value: totalEnrolledClasses?.data?.length || 0,
    },
    {
      name: "total Assignments",
      value: totalStudentAssignment?.totalAssignments || 0,
    },
  ];


  if (isLoading) {
    return <Loading></Loading>;
  }

  const COLORS = ["#5e4cc8", "#9080ea", "#573bf7"];
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-[var(--primary)] text-white p-6 rounded-xl shadow-md flex items-center gap-4">
        <FaClipboardList className="text-3xl" />
        <div>
          <p className="text-sm">
            {role === "admin"
              ? "Total Classes"
              : role === "teacher"
              ? "Total Classes"
              : "Total Enrollments Classes"}
          </p>
          <h2 className="text-2xl font-bold">
            {role === "admin"
              ? totalClasses.totalClasses
              : role === "teacher"
              ? teacherClasses.totalItems
              : totalEnrolledClasses?.data?.length}
          </h2>
        </div>
      </div>

      <div className="bg-[var(--secondary)] text-white p-6 rounded-xl shadow-md flex items-center gap-4">
        <FaUsers className="text-3xl" />
        <div>
          <p className="text-sm">
            {role === "admin"
              ? "Total Users"
              : role === "teacher"
              ? "Total Enrollments"
              : "Total Assignments"}
          </p>
          <h2 className="text-2xl font-bold">
            {role === "admin"
              ? totalUser?.totalUsers
              : role === "teacher"
              ? teacherTotalEnrollments?.totalEnrollments
              : totalStudentAssignment?.totalAssignments}
          </h2>
        </div>
      </div>

      {role === "student" || role === 'user' ? (
        " "
      ) : (
        <div className="bg-[var(--accent)] text-white p-6 rounded-xl shadow-md flex items-center gap-4">
          <FaUserGraduate className="text-3xl" />
          <div>
            <p className="text-sm">
              {role === "admin" ? "Total Students" : "Total assignments"}
            </p>
            <h2 className="text-2xl font-bold">
              {role === "admin"
                ? totalStudents.totalStudents
                : totalAssignment.totalAssignments}
            </h2>
          </div>
        </div>
      )}

      {role === "admin" && (
        <>
          <div className="bg-[var(--primary)] text-white p-6 rounded-xl shadow-md flex items-center gap-4">
            <FaChalkboardTeacher className="text-3xl" />
            <div>
              <p className="text-sm">Total Teachers</p>
              <h2 className="text-2xl font-bold">
                {totalTeachers.totalTeachers}
              </h2>
            </div>
          </div>
        </>
      )}

      {/* Chart */}
      <div className="col-span-1 md:col-span-2 lg:col-span-4 bg-[var(--background)] dark:bg-[var(--background)] rounded-xl  p-4">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={
                role === "admin"
                  ? pieData
                  : role === "teacher"
                  ? teacherData
                  : studentData 
              }
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;

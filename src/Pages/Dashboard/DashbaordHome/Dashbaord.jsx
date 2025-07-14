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

const Dashboard = () => {
  const axiosSecure = useAxiosSecure();

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

  const pieData = [
    { name: "Students", value: totalStudents.totalStudents || 0 },
    { name: "Teachers", value: totalTeachers.totalTeachers || 0 },
    { name: "Users", value: totalUser.totalUser || 0 },
    { name: "Classes", value: totalClasses.totalClasses || 0 },
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
          <p className="text-sm">Total Classes</p>
          <h2 className="text-2xl font-bold">{totalClasses.totalClasses}</h2>
        </div>
      </div>

      <div className="bg-[var(--secondary)] text-white p-6 rounded-xl shadow-md flex items-center gap-4">
        <FaUsers className="text-3xl" />
        <div>
          <p className="text-sm">Total Users</p>
          <h2 className="text-2xl font-bold">{totalUser.totalUsers}</h2>
        </div>
      </div>

      <div className="bg-[var(--accent)] text-white p-6 rounded-xl shadow-md flex items-center gap-4">
        <FaUserGraduate className="text-3xl" />
        <div>
          <p className="text-sm">Total Students</p>
          <h2 className="text-2xl font-bold">{totalStudents.totalStudents}</h2>
        </div>
      </div>

      <div className="bg-[var(--primary)] text-white p-6 rounded-xl shadow-md flex items-center gap-4">
        <FaChalkboardTeacher className="text-3xl" />
        <div>
          <p className="text-sm">Total Teachers</p>
          <h2 className="text-2xl font-bold">{totalTeachers.totalTeachers}</h2>
        </div>
      </div>

     
       {/* Chart */}
      <div className="col-span-1 md:col-span-2 lg:col-span-4 bg-[var(--background)] dark:bg-[var(--background)] rounded-xl  p-4">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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

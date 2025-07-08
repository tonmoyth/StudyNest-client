import educationStateImage from '../../../assets/education-state.jpg'

const statsData = {
  totalUsers: 845,
  totalClasses: 52,
  totalEnrollments: 1740,
};

const WebsiteStatsSection = () => {
  return (
    <section className="py-16 bg-base-100">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        {/* Left Side - Stats */}
        <div className="w-full md:w-1/2 grid gap-6">
          <h2 className="text-3xl font-bold mb-4 text-center md:text-left">📈 Platform Overview</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Total Users */}
            <div className="card bg-white border shadow-md">
              <div className="card-body">
                <h3 className="card-title text-xl font-semibold">Total Users</h3>
                <p className="text-3xl text-primary font-bold">{statsData.totalUsers}</p>
              </div>
            </div>

            {/* Total Classes */}
            <div className="card bg-white border shadow-md">
              <div className="card-body">
                <h3 className="card-title text-xl font-semibold">Total Classes</h3>
                <p className="text-3xl text-primary font-bold">{statsData.totalClasses}</p>
              </div>
            </div>

            {/* Total Enrollments */}
            <div className="card bg-white border shadow-md">
              <div className="card-body">
                <h3 className="card-title text-xl font-semibold">Total Enrollments</h3>
                <p className="text-3xl text-primary font-bold">{statsData.totalEnrollments}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={educationStateImage} // Replace with your own image path
            alt="Education Stats Illustration"
            className="max-w-md w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default WebsiteStatsSection;

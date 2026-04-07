import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AdminSlideBar from "../../components/admin/AdminSlideBar";
import AdminNavbar from "../../components/admin/AdminNavbar";
import axiosInstance from "../../utils/axiosInstance";

const AdminHome = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const [openCompanyModel, setCompanyModel] = useState(false);
  const navigate = useNavigate();
  const [openCollegeModel, setOpenCollegeModel] = useState(false);
  // Hide navbar in course section
  const hideNavbar = location.pathname.includes("/admin-panel/course/");
  const isJobPostPage = location.pathname.includes("/admin-panel/jobs/post");
  const isHackathonPostPage = location.pathname.includes("/admin-panel/hackathon/post");
  useEffect(() => {
    if (isJobPostPage) {
      getCompanyInfo()
    }
    if(isHackathonPostPage){
      getCollegeInfo()
    }

  }, [])

  const [isCompanyInfoAvailable, setIsCompanyInfoAvailable] = useState(false);
  const [isCollegeInfoAvailable, setIsCollegeInfoAvailable] = useState(false);

const getCollegeInfo = async () => {
  try {
    const res = await axiosInstance.get("/college");
    if (res?.data?.colleges?.length > 0) {
      setIsCollegeInfoAvailable(true);
    } else {
      setIsCollegeInfoAvailable(false);
    }
  } catch (error) {
    setIsCollegeInfoAvailable(false);
  }
};

const getCompanyInfo = async () => {
  try {
    const res = await axiosInstance.get("/company");

    if (res?.data?.companies?.length > 0) {
      setIsCompanyInfoAvailable(true);
    } else {
      setIsCompanyInfoAvailable(false);
    }

  } catch (error) {
    setIsCompanyInfoAvailable(false);
  }
};

  const handleJobNavigation = async () => {
      if(isCompanyInfoAvailable){

        navigate("/admin-panel/jobs/post");
      }else{

        setCompanyModel(true);
      }
  };
  const handleSubmitCollegeInfo = async (data) => {
    
      const res = await axiosInstance.post('/college', data)
      if (res.data) {
        setOpenCollegeModel(false)
          navigate("/admin-panel/study-space/post");
      }
    
  }
  const handleNavigation = async () => {
    if (isCollegeInfoAvailable) {
        setOpenCollegeModel(false)
          navigate("/admin-panel/study-space/post");
      } else {
        setOpenCollegeModel(true);
      }
    
  };
  const [actionType, setActionType] = useState()

  return (
    <div className="min-h-screen w-full bg-backGray flex">

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <AdminSlideBar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Wrapper */}
      <div className="flex-1 md:ml-64 transition-all duration-300">

        {/* Top Navbar */}
        {!hideNavbar && (
          <div className="sticky top-0 z-30">
            <AdminNavbar onMenuClick={() => setSidebarOpen(true)} />
          </div>
        )}

        {/* Page Content */}
        <div className="p-2 md:p-4">
          <Outlet context={{ handleJobNavigation, openCompanyModel, setCompanyModel, setActionType, handleNavigation, openCollegeModel, setOpenCollegeModel, handleSubmitCollegeInfo }} />
        </div>

      </div>
    </div>
  );
};

export default AdminHome;

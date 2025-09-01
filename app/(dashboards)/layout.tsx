import React from "react";
import { DashboardHeader } from "./_components/dashboard-header";
import { DashboardFooter } from "./_components/dashboard-footer";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
     
      <DashboardHeader />
      {children}
      <DashboardFooter />
    </div>
  );
};

export default layout;

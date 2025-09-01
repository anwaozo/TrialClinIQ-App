import FooterSection from "@/components/FooterSection";
import Header from "@/components/Header";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {" "}
      <Header />
      {children}
      <FooterSection />
    </div>
  );
};

export default layout;

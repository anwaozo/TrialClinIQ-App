"use client";

import { useState } from "react";

import { ResearcherAccountForm } from "./_components/researcher-account-form";
import { InvestigatorInfoForm } from "./_components/investigator-info-form";
import { SiteInfoForm } from "./_components/site-info-form";
import { ResearcherSuccessPage } from "./_components/researcher-success-page";

export default function ResearcherSignup() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { component: ResearcherAccountForm, title: "Create Account" },
    { component: InvestigatorInfoForm, title: "Investigator Information" },
    { component: SiteInfoForm, title: "Site Information" },
    { component: ResearcherSuccessPage, title: "Success" },
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-white">
   
      <CurrentStepComponent onNext={nextStep} />
     
    </div>
  );
}

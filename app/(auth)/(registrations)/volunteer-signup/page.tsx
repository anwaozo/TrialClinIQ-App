"use client";

import { useState } from "react";
import { SignupForm } from "./_components/signup-form";
import { HealthProfileForm } from "./_components/health-profile-form";
import { MedicalConditionsForm } from "./_components/medical-conditions-form";
import { ConsentForm } from "./_components/consent-form";
import { SuccessPage } from "./_components/success-page";

export default function PatientSignup() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { component: SignupForm, title: "Sign Up" },
    { component: HealthProfileForm, title: "Health Profile" },
    { component: MedicalConditionsForm, title: "Medical Conditions" },
    { component: ConsentForm, title: "Consent" },
    { component: SuccessPage, title: "Success" },
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

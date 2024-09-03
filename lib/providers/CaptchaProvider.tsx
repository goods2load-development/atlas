"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const CaptchaProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey="6Lc8mjIqAAAAALP0vCHIVuOrimuyWEucELhzJNf2">
      {children}
    </GoogleReCaptchaProvider>
  );
};

export default CaptchaProvider;

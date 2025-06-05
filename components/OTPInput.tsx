import React from "react";
import { OtpInput } from "react-native-otp-entry";

const OTPInput = ({
  setOtp,
}: {
  setOtp: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <OtpInput
      numberOfDigits={6}
      onTextChange={(text) => setOtp(text)}
      theme={{
        focusedPinCodeContainerStyle: { borderColor: "#002143" },
        pinCodeContainerStyle: { width: 50, height: 50 },
        pinCodeTextStyle: { fontSize: 18, color: "#474747" },
      }}
      
    />
  );
};

export default OTPInput;

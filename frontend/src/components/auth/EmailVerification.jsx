/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyUserEmail } from "../../api/auth";
import { useNotification } from "../../hooks";
import { commonModalClasses } from "../../utils/theme";
import Container from "../Container";
import FormContainer from "../form/FormContainer";
import Submit from "../form/Submit";
import Title from "../form/Title";

const OTP_LENGTH = 6;

const isValidOTP = (otp) => {
  let valid = false;

  for (let val of otp) {
    valid = !isNaN(parseInt(val));
    if (!valid) break;
  }

  return valid;
}

export default function EmailVerification() {
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(""));
  const [activeOtpIndex, setActiveOptIndex] = useState(0);

  const focusNextInputField = (index) => {
    setActiveOptIndex(index + 1)
  }

  const focusPrevInputField = (index) => {
    let nextIndex;
    const diff = index - 1;
    nextIndex = diff !== 0 ? diff : 0;
    setActiveOptIndex(nextIndex);
  }

  const inputRef = useRef();

  const { state } = useLocation();
  const user = state?.user;

  const navigate = useNavigate();

  const handleOtpChange = ({target}, index) => {
    const { value } = target;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1, value.length);

    if (!value) focusPrevInputField(index);
    else focusNextInputField(index);
    setOtp([...newOtp]);
  }

  const handleKeyDown = ({key}, index) => {
    if (key === "Backspace") {
      focusPrevInputField(index);
    }
  }
  const {updateNotification} = useNotification()
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidOTP(otp)) return updateNotification('error', "invalid OTP");
    // Submit OTP
    const {error, message} = await verifyUserEmail({OTP: otp.join(''), userId: user.id})
    if(error) return updateNotification('error', error);
    updateNotification('success', message)
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);
  
  useEffect(() => {
    if (!user) navigate('/not-found');
  }, [user])

  // if (!user) return null;

  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModalClasses}>
          <div>
            <Title>Please enter the OTP to verify your account</Title>
            <p className="text-center dark:text-dark-subtle text-light-subtle">
              OTP has been sent to your email
            </p>
          </div>

          <div className="flex justify-center items-center space-x-4">
            {otp.map((_, index) => {
              return (
                <input
                  ref={activeOtpIndex === index ? inputRef : null}
                  key={index}
                  type="number"
                  value={otp[index] || ''}
                  onChange={(e) => handleOtpChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 border-2 dark:border-dark-subtle border-light-subtle dark:focus:border-white 
                  focus:border-primary rounded bg-transparent ontline-none text-center dark:text-white text-primary font-semibold text-xl"
                />
              );
            })}
          </div>

          <Submit value="Verify Account" />
        </form>
      </Container>
    </FormContainer>
  );
}

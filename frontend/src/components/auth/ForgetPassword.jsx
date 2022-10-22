import React from "react";
import { commonModalClasses } from "../../utils/theme";
import Container from "../Container";
import CustomLink from "../CustomLink";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";

export default function ForgetPassword() {
  return (
    <div className="fixed inset-0 dark:bg-primary :bg-white -z-10 flex justify-center items-center">
      <Container>
        <form className={commonModalClasses +" w-96"}>
          <Title>Please Enter Your Email</Title>
          <FormInput label="Email" placeholder="john@email.com" name="email"/>
          <Submit value="Send Link" />

          <div className="flex justify-between">
            <CustomLink to="/auth/signin">Sign in</CustomLink>
            <CustomLink to="/auth/signup">Sign up</CustomLink>
          </div>
        </form>
      </Container>
    </div>
  )
}

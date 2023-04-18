import ViewCard from "@/context/viewcard/ViewCard";

import { useContext } from "react";
import { Button, TextField } from "@material-ui/core";

import { ViewCardContext } from "@/context";
import useUserForm from "@/hooks/user/User";

import "./register.scss";
import { userApi } from "@/apis/user";

const Register = () => {
  const ViewCard = useContext(ViewCardContext);
  const { form, handleFormChange } = useUserForm();

  const handleSubmit = async () => {
    console.log("form", form);
    const res = await userApi.register({
      id: "aa",
      name: "aa",
      password: "aa",
      gender: "male",
    });
    console.log("res", res);
  };

  return (
    <ViewCard>
      <div className="register-container">
        <span className="register-title">Register</span>
        <TextField
          name="id"
          value={form.id}
          variant="outlined"
          label="ID"
          margin="normal"
          onChange={handleFormChange}
        />
        <TextField
          name="password"
          value={form.password}
          type="password"
          variant="outlined"
          label="Password"
          margin="normal"
          onChange={handleFormChange}
        />
        <TextField
          name="passwordConfirm"
          value={form.passwordConfirm}
          variant="outlined"
          type="password"
          label="PasswordConfirm"
          margin="normal"
          onChange={handleFormChange}
        />
        <TextField
          name="name"
          value={form.name}
          variant="outlined"
          label="name"
          margin="normal"
          onChange={handleFormChange}
        />
        <TextField
          name="gender"
          value={form.gender}
          variant="outlined"
          label="gender"
          margin="normal"
          onChange={handleFormChange}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Register
        </Button>
      </div>
    </ViewCard>
  );
};

export default Register;

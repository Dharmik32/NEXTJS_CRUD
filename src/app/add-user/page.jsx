"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  gender: yup
    .string()
    .oneOf(["Male", "Female"], "Gender is required")
    .required(),
  department: yup
    .string()
    .oneOf(
      ["HR", "Sales", "Engineering", "PHP", "MERN", "MEAN", "UI/UX", "QA"],
      "Department is required"
    )
    .required("Department is required"),
  image: yup.string().required("Image is required"),
});
const AddUser = () => {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue, 
    trigger
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    const newUser = { id: users.length + 1, ...data, image: selectedImage };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    toast.success("User added successfully!");

    setTimeout(() => {
      router.push("/dashboard");
    }, 2000);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log("file", file);
    if (file) {
      const reader = new FileReader();
      console.log("reader", reader);
      reader.onload = () => {
        setSelectedImage(reader.result);
        setValue("image", reader.result);
        trigger("image");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container maxWidth="sm">
      <ToastContainer position="top-right" autoClose={3000} />
      <Box
        sx={{
          mt: 8,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          bgColor: "background.paper",
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Add User
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Name"
            {...register("name")}
            fullWidth
            margin="normal"
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            label="Email"
            {...register("email")}
            type="email"
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <FormControl
            component="fieldset"
            margin="normal"
            error={!!errors.gender}
            fullWidth
          >
            <FormLabel component="legend">Gender</FormLabel>
            <Controller name="gender" control={control} defaultValue="" render={({field}) => (
              <RadioGroup {...field} row>
                <FormControlLabel value="Male" control={<Radio />} label="Male" />
                <FormControlLabel value="Female" control={<Radio />} label="Female" />
              </RadioGroup>
            )}
            />
            {errors.gender && (
              <Typography color="error">{errors.gender.message}</Typography>
            )}
          </FormControl>
          
          <TextField
            select
            label="Department"
            {...register("department")}
            fullWidth
            margin="normal"
            error={!!errors.department}
            helperText={errors.department?.message}
          >
            <MenuItem value="HR">HR</MenuItem>
            <MenuItem value="Sales">Sales</MenuItem>
            <MenuItem value="Engineering">Engineering</MenuItem>
            <MenuItem value="PHP">PHP</MenuItem>
            <MenuItem value="MERN">MERN</MenuItem>
            <MenuItem value="UI/UX">UI/UX</MenuItem>
            <MenuItem value="QA">QA</MenuItem>
          </TextField>

          <Button
            variant="contained"
            component="label"
            fullWidth
            sx={{ mt: 2 }}
          >
            Upload Image
            <input
              type="file"
              hidden
              onChange={handleFileChange}
              accept="image/*"
            />
          </Button>
          {selectedImage && (
            <Box sx={{ mt: 2, textAlign: "center" }}>
              <img
                src={selectedImage}
                alt="Uploaded Preview"
                style={{ width: "100px", borderRadius: "8px" }}
              />
            </Box>
          )}
          {errors.image && (
            <Typography color="error">{errors.image.message}</Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Add User
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => router.back()}
          >
            Back
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AddUser;

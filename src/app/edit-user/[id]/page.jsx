"use client";

import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const EditUser = () => {
  const router = useRouter();
  const { id } = useParams();
  const [user, setUser] = useState({
    name: "",
    email: "",
    gender: "",
    department: "",
    image: "",
  });

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = storedUsers.find((u) => String(u.id) === id);

    console.log("founduser", foundUser, id, typeof id);
    if (!foundUser) {
      toast.error("User not found");
      router.push("/dashboard");
    } else {
      setUser(foundUser);
    }
  }, [id, router]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUser((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = storedUsers.map((u) =>
      String(u.id) === id ? { ...u, ...user } : u
    );

    console.log("updatedUsers", updatedUsers);

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    toast.success("User updated successfully");

    setTimeout(() => {
      router.push("/dashboard");
    }, 2000);
  };

  console.log("user edit component render");

  return (
    <Container maxWidth="sm">
      <ToastContainer position="top-right" autoClose={2000} />
      <Box
        sx={{
          mt: 8,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Edit User
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={user?.name || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Email"
            name="email"
            value={user?.email || ""}
            type="email"
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <FormControl component="fieldset" margin="normal" fullWidth>
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              row
              name="gender"
              value={user?.gender || ""}
              onChange={handleChange}
            >
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="Female"
                control={<Radio />}
                label="Female"
              />
            </RadioGroup>
          </FormControl>

          <TextField
            select
            label="Department"
            name="department"
            value={user?.department || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          >
            <MenuItem value="HR">HR</MenuItem>
            <MenuItem value="Sales">Sales</MenuItem>
            <MenuItem value="Engineering">Engineering</MenuItem>
            <MenuItem value="PHP">PHP</MenuItem>
            <MenuItem value="MERN">MERN</MenuItem>
            <MenuItem value="UI/UX">UI/UX</MenuItem>
            <MenuItem value="QA">QA</MenuItem>
          </TextField>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {user.image && (
              <img
                src={user?.image || ""}
                alt="User"
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "3px solid #1976d2",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                  margin: "10px",
                }}
              />
            )}
            <Button
              variant="outlined"
              component="label"
              sx={{
                bgcolor: "#1976d2",
                color: "white",
                textTransform: "none",
                fontSize: "16px",
                padding: "8px 16px",
                borderRadius: "8px",
                "&:hover": {
                  bgcolor: "#135ba1",
                },
              }}
            >
              Upload New Image
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
            </Button>
          </Box>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            type="submit"
          >
            Update User
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => router.back()}
          >
            Cancel
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default EditUser;

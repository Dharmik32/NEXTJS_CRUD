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
import { useState } from "react";

const UserForm = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      email: "",
      gender: "Male",
      department: "",
      image: "",
    }
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Container maxWidth="sm">
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
          {initialData ? "Edit User" : "Add User"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            fullWidth
            margin="normal"
            required
          />
          <FormControl component="fieldset" margin="normal" fullWidth>
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              row
              name="gender"
              value={formData.gender}
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
            value={formData.department}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          >
            <MenuItem value="HR">HR</MenuItem>
            <MenuItem value="Sales">Sales</MenuItem>
            <MenuItem value="Engineering">Engineering</MenuItem>
          </TextField>
          <Box sx={{ mt: 2, textAlign: "center" }}>
            {formData.image && (
              <img
                src={formData.image}
                alt="User"
                width="100"
                height="100"
                style={{ borderRadius: "8px" }}
              />
            )}
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            {initialData ? "Update User" : "Add User"}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default UserForm;

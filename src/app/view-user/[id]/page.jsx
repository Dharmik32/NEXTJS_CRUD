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

const ViewUser = () => {
  const router = useRouter();
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = storedUsers.find((user) => user.id === parseInt(id));
    console.log("foundUser", foundUser, id, storedUsers);
    if(!foundUser){
        toast.error("User not found");
        router.push("/dashboard");
    }else{
        setUser(foundUser);
    }
  }, [id]);

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
          View User
        </Typography>

        {user && (
          <form>
            <TextField
              label="Name"
              value={user?.name || ""}
              fullWidth
              margin="normal"
              disabled
            />
            <TextField
              label="Email"
              value={user?.email || ""}
              type="email"
              fullWidth
              margin="normal"
              disabled
            />

            <FormControl component="fieldset" margin="normal" fullWidth>
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup row value={user?.gender || ""}>
                <FormControlLabel
                  value="Male"
                  control={<Radio />}
                  label="Male"
                  disabled
                />
                <FormControlLabel
                  value="Female"
                  control={<Radio />}
                  label="Female"
                  disabled
                />
              </RadioGroup>
            </FormControl>

            <TextField
              select
              label="Department"
              value={user?.department || ""}
              fullWidth
              margin="normal"
              disabled
            >
              <MenuItem value="HR">HR</MenuItem>
              <MenuItem value="Sales">Sales</MenuItem>
              <MenuItem value="Engineering">Engineering</MenuItem>
              <MenuItem value="PHP">PHP</MenuItem>
              <MenuItem value="MERN">MERN</MenuItem>
              <MenuItem value="UI/UX">UI/UX</MenuItem>
              <MenuItem value="QA">QA</MenuItem>
            </TextField>

            <Box sx={{ mt: 2, textAlign: "center" }}>
              <img
                src={user?.image || ""}
                alt="Uploaded Preview"
                style={{ width: "100px", borderRadius: "8px" }}
              />
            </Box>

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
        )}
      </Box>
    </Container>
  );
};

export default ViewUser;

"use client";

import {
  AppBar,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import withAuth from "../components/hoc/withAuth";
import { Edit, Delete, Visibility } from "@mui/icons-material";

const Dashboard = () => {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });

  useEffect(() => {
    console.log("inside dasboard useffect");
    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("Unauthorized! please login first.");
      router.push("/login");
    }

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    toast.success("Logout out successfully");
    setTimeout(() => {
      router.push("/login");
    }, 2000);
  };

  const handleAddUser = () => {
    router.push("/add-user");
  };

  const handleEditUser = (id) => {
    console.log("btn clicked", id);
    router.push(`/edit-user/${id}`);
  };

  const handleViewUser = (id) => {
    router.push(`/view-user/${id}`);
  };

  const handleOpenDialog = (id) => {
    setSelectedUserId(id);
    setOpen(true);
  };

  const handleCloseDialog = (id) => {
    setOpen(false);
    setSelectedUserId(null);
  };

  const handleDeleteUser = (id) => {
    console.log("delete user", id, users);
    const updatedusers = users.filter((user) => user.id !== selectedUserId);
    console.log("updatedusers", updatedusers);
    localStorage.setItem("users", JSON.stringify(updatedusers));
    setUsers(updatedusers);
    toast.success("User deleted successfully");
    handleCloseDialog();
  };

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sortedUsers = [...users]
    .filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.gender.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.department.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const isAscending = sortConfig.direction === "asc";
      if (a[sortConfig.key] < b[sortConfig.key]) return isAscending ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return isAscending ? 1 : -1;
      return 0;
    });

  const paginatedUsers = sortedUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handlePageChange = (event, newPage) => {
    console.log("page change", newPage);
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    console.log("handleRowsPerPageChange", event.target.value);
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  console.log("dashboard component render");

  return (
    <Container maxWidth="lg">
      <ToastContainer position="top-right" autoClose={2000} />

      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Dashboard</Typography>
          <Box>
            <Button color="inherit" onClick={handleAddUser}>
              Add User
            </Button>
            <Button
              color="error"
              variant="contained"
              onClick={handleLogout}
              sx={{ ml: 2 }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Paper elevation={3} sx={{ mt: 4, p: 3, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          User List
        </Typography>

        <TextField
          label="Search Users"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {sortedUsers.length === 0 ? (
          <Stack
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "50vh",
            }}
          >
            <Typography variant="h6" color="secondary">
              No users found. Add a new user.
            </Typography>
          </Stack>
        ) : (
          <>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    {/* <TableCell>ID</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Gender</TableCell>
                    <TableCell>Department</TableCell>
                    <TableCell>Actions</TableCell> */}
                    {["id", "name", "email", "gender", "department"].map(
                      (column) => (
                        <TableCell key={column}>
                          <TableSortLabel
                            active={sortConfig.key == column}
                            direction={sortConfig.direction}
                            onClick={() => handleSort(column)}
                          >
                            {column.charAt(0).toUpperCase() + column.slice(1)}
                          </TableSortLabel>
                        </TableCell>
                      )
                    )}
                    <TableCell>Image</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedUsers?.map((user, index) => (
                    <TableRow key={index}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.gender}</TableCell>
                      <TableCell>{user.department}</TableCell>
                      <TableCell>
                        <img
                          src={user.image}
                          alt={user.name}
                          width="50"
                          height="50"
                          style={{ borderRadius: "50%" }}
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          color="primary"
                          onClick={() => handleViewUser(user.id)}
                        >
                          <Visibility />
                        </IconButton>
                        <IconButton
                          color="warning"
                          onClick={() => handleEditUser(user.id)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleOpenDialog(user.id)}
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[5, 10, 20]}
              component="div"
              count={sortedUsers.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
            ></TablePagination>
          </>
        )}
      </Paper>

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteUser} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default withAuth(Dashboard);

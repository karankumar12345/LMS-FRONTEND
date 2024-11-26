/* eslint-disable @typescript-eslint/no-explicit-any */
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { AiOutlineDelete, AiOutlineMail } from 'react-icons/ai';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { format } from 'timeago.js';
import { useAllUserQuery, useDeleteUserMutation } from '../../../../../redux/features/auth/authapi';
import toast from 'react-hot-toast';

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#3F51B5',
    },
    background: {
      paper: '#1E1E2F',
      default: '#121212',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#AAB2BD',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

interface UserRow {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

interface AllUserProps {
  isTeam: boolean;
}

const AllUser: React.FC<AllUserProps> = ({ isTeam }) => {
  const theme = useTheme() || defaultTheme;
  const [deleteUserRole] = useDeleteUserMutation();
  const { isLoading, data, error } = useAllUserQuery({});
  const [rows, setRows] = useState<UserRow[]>([]);

  useEffect(() => {
    if (Array.isArray(data?.users)) {
      const filteredUsers = isTeam
        ? data.users.filter((item: any) => item.role === 'admin')
        : data.users;

      const formattedRows = filteredUsers.map((item: any) => ({
        id: item._id,
        name: item.name,
        email: item.email,
        role: item.role,
        createdAt: format(item.createdAt),
      }));

      setRows(formattedRows);
    }
  }, [data, isTeam]);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 0.5 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 0.5 },
    { field: 'role', headerName: 'Role', flex: 0.5 },
    { field: 'createdAt', headerName: 'Created At', flex: 0.5 },
    {
      field: 'delete',
      headerName: 'Delete',
      flex: 0.2,
      renderCell: (params) => (
        <Button color="error" onClick={() => handleDeleteUser(params.row.id)}>
          <AiOutlineDelete className="text-white" size={20} />
        </Button>
      ),
    },
    {
      field: 'mail',
      headerName: 'Mail',
      flex: 0.2,
      renderCell: (params) => (
        <a href={`mailto:${params.row.email}`}>
          <AiOutlineMail className="text-white" size={20} />
        </a>
      ),
    },
  ];

  const handleDeleteUser = async (id: string) => {
    // Display confirmation dialog
    const isConfirmed = window.confirm("Are you sure you want to delete this user?");
    
    if (!isConfirmed) return; // If not confirmed, exit the function
  
    try {
      await deleteUserRole({ id });
      toast.success("User Deleted Successfully");
      // Optionally, refresh the data here
    } catch (error) {
      console.error("Failed to delete user:", error);
      toast.error("Failed to delete user");
      // Optionally, handle error feedback to user here
    }
  };
  
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1 style={{ color: 'red' }}>Error: {error.message}</h1>;
  }

  return (
    <div className="mt-[120px] flex justify-center items-center px-4">
      <Box
        sx={{
          width: '100%',
          maxWidth: '1200px',
          backgroundColor: theme.palette.background.default,
          padding: '16px',
          borderRadius: '8px',
          boxShadow: theme.shadows[2],
        }}
      >
        <h1 className="text-center text-2xl font-bold mb-4" style={{ color: theme.palette.text.primary }}>
          All Users
        </h1>
        <DataGrid
          checkboxSelection
          rows={rows}
          columns={columns}
          autoHeight
          sx={{
            '& .MuiDataGrid-root': {
              border: 'none',
              color: theme.palette.text.primary,
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.text.primary,
              fontWeight: 'bold',
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              fontWeight: 'bold',
            },
            '& .MuiDataGrid-cell': {
              color: theme.palette.text.secondary,
            },
            '& .MuiDataGrid-footerContainer': {
              backgroundColor: theme.palette.background.paper,
            },
            '& .MuiCheckbox-root svg': {
              fill: theme.palette.primary.main,
            },
          }}
        />
      </Box>
    </div>
  );
};

const ThemedAllUser: React.FC<{ isTeam: boolean }> = ({ isTeam }) => (
  <ThemeProvider theme={defaultTheme}>
    <AllUser isTeam={isTeam} />
  </ThemeProvider>
);

export default ThemedAllUser;

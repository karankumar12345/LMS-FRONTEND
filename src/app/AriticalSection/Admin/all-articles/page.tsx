/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { format } from "timeago.js";
import {  useRouter } from 'next/navigation';
import AdminDashboard from '../../_component/ArticalDashBoard';
import Heading from '@/utils/Heading';
import { useDeleteArticalMutation, useGetAllArticalQuery } from '../../../../../redux/features/Artical/ArticalApi';

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

interface CourseRow {
  id: string;
  title: string;
  ratings: number;
  purchased: number;
  createdAt: string;
}

const AllCourses: React.FC = () => {
  const theme = useTheme() || defaultTheme;
  const { isLoading: loadingCourses, data: coursesData, error: coursesError } = useGetAllArticalQuery({});
  const router = useRouter();

  console.log(coursesData)
  
  const [deleteCourse] = useDeleteArticalMutation();


  const [rows, setRows] = useState<CourseRow[]>([]);

  useEffect(() => {
    if (Array.isArray(coursesData?.articles)) {
      const formattedRows = coursesData?.articles?.map((item: any) => ({
        id: item._id,
        title: item.title,
      
        Description: item.description,
        createdAt: format(item.createdAt),
      }));
      setRows(formattedRows);
    }
  }, [coursesData]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "title", headerName: "Course Title", flex: 1 },
    { field: "Description", headerName: "Description", flex: 0.5 },

    { field: "createdAt", headerName: "Created At", flex: 0.5 },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params) => (
        <Button color="error" variant="contained" onClick={() => handleDelete(params.row.id)}>
          <AiOutlineDelete className="text-white" size={20} />
        </Button>
      ),
    },
    {
      field: "edit",
      headerName: "Edit",
      flex: 0.2,
      renderCell: (params) => (
        <Button
          color="primary"
          variant="contained"
          onClick={(event) => {
            event.stopPropagation(); // Stop the event from propagating to the row
            handleUpdate(params.row.id);
          }}
        >
          <AiOutlineEdit className="text-white" size={20} />
        </Button>
      ),
    }
    
  ];

  const handleDelete = async (id: string) => {
    try {
      console.log(id)
      await deleteCourse(id);
      // Optionally refresh data or show a success message here
    } catch (error) {
      console.error("Failed to delete course:", error);
      // Optionally handle error feedback to user here
    }
  };

  const handleUpdate = (id: string) => {
    router.push(`/AriticalSection/Admin/editArtical/${id}`); // <-- Use router.push
  };;
  

  if (loadingCourses) {
    return <h1>Loading...</h1>;
  }

  if (coursesError) {
    return <h1 style={{ color: 'red' }}>Error: Courses Error try after some time</h1>;
  }

  return (
   <div>

  <Heading
        title="ALL Artical"
        description="Manage articles efficiently"
        keywords="articles, admin, dashboard AllArtical"
      />

      {/* Embedded Admin Dashboard */}
      <AdminDashboard  />
      <div className="mt-[120px] ml-[20%] flex justify-center items-center px-4">
 
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
          All Courses
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
    </div>
  );
};

const ThemedAllCourses = () => (
  <ThemeProvider theme={defaultTheme}>
    <AllCourses />
  </ThemeProvider>
);

export default ThemedAllCourses;

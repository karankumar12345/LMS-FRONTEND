/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#3F51B5",
    },
    background: {
      paper: "#1E1E2F",
      default: "#121212",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#AAB2BD",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

interface CourseRow {
  id: string;
}

const AllCourses: React.FC = () => {
  const { user } = useSelector((state: any) => state.auth);
  const router = useRouter();
  const [rows, setRows] = useState<CourseRow[]>([]);

  useEffect(() => {
    if (Array.isArray(user?.courses)) {
      const formattedRows = user.courses.map((item: any) => ({
        id: item._id,
      }));
      setRows(formattedRows);
    }
  }, [user]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1 },
  ];

  // Handle row click
  const handleRowClick = (params: any) => {
    const courseId = params.row.id;
    router.push(`/courses-acess/${courseId}`);
  };

  return (
    <div className="mt-[120px] flex justify-center items-center px-4">
      <Box
        sx={{
          width: "100%",
          maxWidth: "1200px",
          backgroundColor: defaultTheme.palette.background.default,
          padding: "16px",
          borderRadius: "8px",
          boxShadow: defaultTheme.shadows[2],
        }}
      >
        <h1
          className="text-center text-2xl font-bold mb-4"
          style={{ color: defaultTheme.palette.text.primary }}
        >
          All Courses
        </h1>
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight
          onRowClick={handleRowClick}
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              color: defaultTheme.palette.text.primary,
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: defaultTheme.palette.primary.main,
              color: defaultTheme.palette.text.primary,
              fontWeight: "bold",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold",
            },
            "& .MuiDataGrid-cell": {
              color: defaultTheme.palette.text.secondary,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: defaultTheme.palette.background.paper,
            },
          }}
        />
      </Box>
    </div>
  );
};

const ThemedAllCourses = () => (
  <ThemeProvider theme={defaultTheme}>
    <AllCourses />
  </ThemeProvider>
);

export default ThemedAllCourses;

import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Chip } from '@mui/material';
import ActionMenu from './ActionMenu';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomButton from '../../Common/Button/CustomButton';
import { Col, Container, Row } from 'react-bootstrap';
import { BASE_URL } from '../../utils/contants';





export default function AdminDashboard() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();
  const localStorageAdminAuth = localStorage.getItem("adminAuth")
  const columns = [
    { field: 'id', headerName: 'ID', width: 180 },
    {
      field: 'username',
      headerName: 'Username',
      width: 120,
    },
    {
      field: 'fullName',
      headerName: 'FullName',
      width: 120,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 150,
    },
    {
      field: 'phone',
      headerName: 'Phone',
      width: 180,
    },
    {
      field: 'company',
      headerName: 'Company',
      width: 180,
    },
    {
      field: 'country',
      headerName: 'Country',
      width: 180,
    },
    {
      field: 'jobs',
      headerName: 'Jobs',
      type: 'number',
      width: 110,
      renderCell: (params) => (
        params.row.jobs.length ? <Chip label={params.row.jobs.length} color="success" /> : <Chip label={0} color="error" />
      ),
    },
    {
      field: 'skills',
      headerName: 'Skills',
      type: 'number',
      width: 110,
      renderCell: (params) => (
        params.row.skills && params.row.skills.length ? <Chip label={params.row.skills.length} color="success" /> : <Chip label={0} color="error" />
      ),
    },
    {
      field: 'role',
      headerName: 'Role',
      width: 160,
      renderCell: (params) => (
        <Chip label={params.row.role} color="success" />
      ),
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 160,
      renderCell: (params) => (
        <ActionMenu row={params.row} setData={setData} />
      ),
    },
  ];
  
  useEffect(() => {
    if(!data.length && loading){
      getAllUsers()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, data.length])

  const getAllUsers = async() => {
  try {
    
    const response1 = await axios.get(`${BASE_URL}/api/admin/getAllUsers`)
    const response2 = await axios.get(`${BASE_URL}/api/admin/getAllCustomers`)
    const response3 = await axios.get(`${BASE_URL}/api/admin/getAllSellers`)
   await Promise.all([response1, response2, response3]).then((values) => {
     const result = combineData(values[0].data, values[1].data, values[2].data);
     setData(result)
      setLoading(false)
    })
  } catch (error) {
   console.error(error) 
  }
  }
  const combineData = (users, customers, sellers) => {
    const userData = users.map((user) => ({
      ...user,
      id: user._id,
      role: "USER",
    }));
    const customerData = customers.map((customer) => ({
      ...customer,
      id: customer._id,
      role: "CUSTOMER",
    }));
    const sellerData = sellers.map((seller) => ({
      ...seller,
      id: seller._id,
      role: "SELLER",
    }));
    return [...userData, ...customerData, ...sellerData];
  };
  
  if(!localStorageAdminAuth){
    navigate('/admin/login')
    return(
      <div style={{display:"flex", width:"100%",height:"100vh", justifyContent:"center",alignItems:"center"}}>
        <h5>Not Authorized</h5>
      </div>
    )
  }

  return (
    <>
   <div style={{display:"flex", width:"100%", justifyContent:"flex-end", marginBottom:"25px", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",}}>
   <CustomButton
          classes="my-2"
          type="secondary"
          values="Logout"
          variant="outlined"
          onClick={() =>{
            localStorage.removeItem("adminAuth")
            navigate('/admin/login')
          }}
          maxWidth="120px"
        />
   </div>
    <Box sx={{ height: 1000, width: '100%', }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSizeOptions={[5]}
        loading={loading}
        hideFooter
        hideFooterSelectedRowCount
        checkboxSelection={false}
      />
    </Box>
    </>
  );
}
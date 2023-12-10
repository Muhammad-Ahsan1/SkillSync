import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Chip } from '@mui/material';
import ActionMenu from './ActionMenu';



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
      <ActionMenu row={params.row} />
    ),
  },
];

export default function AdminDashboard() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if(!data.length && loading){
      getAllUsers()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, data.length])

  const getAllUsers = async() => {
  try {
    
    const response1 = await axios.get('http://localhost:5500/api/admin/getAllUsers')
    const response2 = await axios.get('http://localhost:5500/api/admin/getAllCustomers')
    const response3 = await axios.get('http://localhost:5500/api/admin/getAllSellers')
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
  
  
  return (
    <>
    <Box sx={{ height: 400, width: '100%' }}>
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
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Menu, MenuItem, Slide } from "@mui/material";
import { Input } from "antd";
import axios from "axios";
import { forwardRef, useState } from "react";
import { FaBuilding, FaPhone, FaUser, FaUserAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { toast } from "react-toastify";
import { BASE_URL } from "../../utils/contants";


const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function ActionMenu ({ row, setData}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] =useState(false);
  const [formData, setFormData] = useState({
    fullName: row?.fullName,
    username: row?.username,
    email: row?.email,
    phone: row?.phone,
    company: row?.company,
  });


  const handleClickOpenEditModal = () => {
    setOpen(true);
    handleMenuClose();
  };

  const handleClose = () => {
    setFormData({
      fullName: row?.fullName,
      username: row?.username,
      email: row?.email,
      phone: row?.phone,
      company: row?.company,
    });
    setOpen(false);
  };
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDelete = async() => {
    try {
      let response;
    if(row.role === 'SELLER'){
      response = await axios.get(`${BASE_URL}/api/admin/deleteSeller/${row.id}`)
    }else if(row.role === 'CUSTOMER'){
      response =await axios.get(`${BASE_URL}/api/admin/deleteCustomer/${row.id}`)
    }else if(row.role === 'USER'){
      response =await axios.get(`${BASE_URL}/api/admin/deleteUser/${row.id}`)
    }
    setData((prevData) => prevData.filter((user) => user.id !== row.id));
    toast(response.data)
    handleMenuClose();
    } catch (error) {
      toast('Delete Failed')
    }
  };
console.log('🔥🍊🍉 row',row);
  const handleSaveEditModal = async() => {
   try {
    let dataToSend = { ...formData };
    if(formData.company){
      dataToSend = {
        company: formData.company
      }
    }
    if(formData.email){
      dataToSend = {
        ...dataToSend,
        email: formData.email
      }
    }
    if(formData.fullName){
      dataToSend = {
        ...dataToSend,
        fullName: formData.fullName
      }
    }
    if(formData.phone){
      dataToSend = {
        ...dataToSend,
        phone: formData.phone
      }
    }
    if(formData.username){
      dataToSend = {
        ...dataToSend,
        username: formData.username
      }
    }

    let response;
    if(row.role === 'SELLER'){
      response = await axios.post(`${BASE_URL}/api/admin/editSeller/${row.id}`,dataToSend,{
        headers: {
          "Content-Type": "application/json",
        },
      })
    }else if(row.role === 'CUSTOMER'){
      response = await axios.post(`${BASE_URL}/api/admin/editCustomer/${row.id}`, dataToSend,{
        headers: {
          "Content-Type": "application/json",
        },
      })
    } else if (row.role === "USER") {
      response = await axios.post(`${BASE_URL}/api/admin/editUser/${row.id}`,dataToSend,{
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    setData((prevData) =>
    prevData.map((user) =>
      user.id === row.id ? { ...user, ...formData } : user
    )
  );
    toast(response.data)
    handleClose()
   } catch (error) {
    toast('Edit Failed')
   }
  }

  return (
    <>
    <div>
      <Button onClick={handleMenuOpen}>Actions</Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        >
        <MenuItem onClick={handleClickOpenEditModal}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </div>
    <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Edit Modal</DialogTitle>
        <DialogContent>
        <Input
                  className="color-grey my-2"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  prefix={<FaUser className="me-3 " />}
                />
                <Input
                  className="color-grey my-2"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  prefix={<FaUserAlt className="me-3 " />}
                />
                <Input
                  className="color-grey my-2"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  prefix={<IoMdMail className="me-3 " />}
                />


                <Input
                  type="number"
                  className="color-grey py-2 my-2"
                  placeholder="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  prefix={<FaPhone className="me-3" />}
                />

                <Input
                  type="text"
                  className="color-grey py-2 my-2"
                  name="company"
                  placeholder="Company"
                  value={formData.company}
                  onChange={handleChange}
                  prefix={<FaBuilding className="me-3" />}
                />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{
            handleClose()
          }}>Disagree</Button>
          <Button onClick={handleSaveEditModal}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

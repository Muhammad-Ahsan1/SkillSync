import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Container, Row, Col } from "react-bootstrap";
import "../../Stylesheet/Login/login.page.scss";
import { IoMdMail } from "react-icons/io";
import { Input, Radio, Upload, Button, Select } from "antd";
import {
  FaKey,
  FaUser,
  FaUserAlt,
  FaPhone,
  FaBuilding,
  FaUpload,
} from "react-icons/fa";
import CustomButton from "../../Common/Button/CustomButton";
import Navbar from "../../Common/CustomNavbar/Index";
import countries from "../../utils/countries";
import { API_URL } from "../../utils/contants";

const { Option } = Select;

const requiredFields = [
  "fullName",
  "username",
  "email",
  "password",
  "country",
  "phone",
  "type",
];

const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    country: "",
    phone: "",
    company: "",
    image: null,
    type: "customer",
  });

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    // Check Validation
    const emptyFields = Object.keys(formData).filter(
      (key) => requiredFields.includes(key) && !formData[key]
    );
    const anyInvalidField = emptyFields.length > 0 ? true : false;
    if (anyInvalidField) toast.error(`${emptyFields[0]} is required`);

    if (!anyInvalidField) {
      const payload = new FormData();

      payload.append("fullName", formData.fullName);
      payload.append("username", formData.username);
      payload.append("email", formData.email);
      payload.append("password", formData.password);
      payload.append("country", formData.country);
      payload.append("phone", formData.phone);
      if (formData.company) payload.append("company", formData.company);
      if (formData.image) payload.append("image", formData.image);

      axios
        .post(API_URL + `auth/user/${formData.type}`, payload, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          toast.success(res.data.message);
          navigate("/login");
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    }
  };

  return (
    <>
      <Navbar />

      <Container
        fluid
        className="form-card d-flex align-items-center justify-content-center my-2"
      >
        <Container className=" border rounded pb-5 loginCard">
          <Row className="justify-content-center text-center">
            <Col className="px-5">
              <div className="form-header py-2 my-3 mt-4">
                <h3 className="font-rebrand fw-bold">Get your free account</h3>
              </div>

              <div className="px-4 form-wrapper">
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
                  type="password"
                  className="color-grey py-2 my-2"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  prefix={<FaKey className="me-3 " />}
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

<Select
  showSearch
  placeholder="Select Country"
  className="w-100 color-grey py-2 my-2 d-flex text-start"
  onChange={(selected) =>
    setFormData((prevState) => ({
      ...prevState,
      country: selected,
    }))
  }
  filterOption={(input, option) =>
    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
  }
>
  {countries.map((item) => (
    <Option key={item.code} value={item.name}>
      {item.name}
    </Option>
  ))}
</Select>

                <Radio.Group
                  className="color-grey my-2 d-flex"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                >
                  <Radio value="customer">Customer</Radio>
                  <Radio value="seller">Seller</Radio>
                </Radio.Group>

                <div className="input-wrapper my-4 d-flex justify-content-between">
                  <Upload
                    name="image"
                    maxCount={1}
                    onChange={(selected) => {
                      setFormData((prevState) => ({
                        ...prevState,
                        image: selected.file,
                      }));
                    }}
                    beforeUpload={() => false}
                    listType="picture"
                    accept="image/png, image/jpeg"
                  >
                    <Button icon={<FaUpload className="me-2" />}>
                      Click to upload your image
                    </Button>
                  </Upload>
                </div>

                <CustomButton
                  classes="mt-4"
                  values="Create Account"
                  type="primary"
                  onClick={handleSubmit}
                  block
                />
                <p className="mt-3">
                  Already have an account? <Link to="/login">Login</Link>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>

      <Container fluid className="bg-color-primary text-white py-4">
        <Row>
          <Col className="d-flex align-items-center justify-content-center flex-column">
            <p className="mb-2">© 2015 - 2024 SkillSync® Global Inc.</p>
            <div className="footer-content text-center">
              <p className="mb-0">
                <a className="text-white" href="/">
                  Terms of Service
                </a>
              </p>
              <p className="mb-0">
                <a className="text-white" href="/">
                  Privacy Policy
                </a>
              </p>
              <p className="mb-0">
                <a className="text-white" href="/">
                  Accessibility
                </a>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SignUpPage;

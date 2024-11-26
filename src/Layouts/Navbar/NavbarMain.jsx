// import components
import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Modal, Form, ProgressBar} from "react-bootstrap";

// import icon
import {
  BsPlusLg,
  BsHouseDoor,
  BsClock,
  BsTrash,
  BsStar,
  BsPersonUp,
  BsCloud,
  BsBell,
  BsFillGridFill,
  BsFolder2,
  BsBraces,
} from "react-icons/bs";

// import style
import "./NavbarMain.css";

// เปลี่ยนชื่อไฟล์จาก Navbar เป็น NavbarMain
// เพราะชื่อไฟล์มันทับกับชื่อ import ใน bootstrap มันทำให้ error

function NavbarMain() {
  /* ----------ตัวเชื่อมของ Navbar----------*/
  // ใช้ state สำหรับจัดการปุ่มที่ถูกเลือก
  const [activeButton, setActiveButton] = useState("home");

  // ฟังก์ชันเพื่อเปลี่ยนปุ่มที่ถูกเลือกเมื่อกด
  const handleSelect = (buttonName) => {
    setActiveButton(buttonName);
  };
  /* ------------------------------ */

  return (
    <div className="navbar-container">
      {/* ลองดูๆ ชอบแบบไหน */}
      {/* v1=อันเดิม ,v2=แบบแนวตั้ง , v3=แบบแนวนอน(ถ้าจะใช้ตัวนี้ไป comment "width" ก่อนนะ */}

      <div className="navbar-v04">
        {/* Container สำหรับโครงสร้างภายนอกของ Navbar ที่มีขนาดเต็มความสูงของหน้าจอและพื้นหลังสีเทาอ่อน */}
        <Container
          fluid
          style={{
            width: "100%",
            height: "100%",
            background: "none",
          }}
        >
          <Row className="justify-content-center py-2">
            <Col className="text-center">
            </Col>
          </Row>

          {/* เมนูลิงก์สำหรับการนำทางไปยังหน้าแต่ละหน้า */}
          <Nav className="flex-column px-3">
            {/* ลิงก์ไปหน้าแรก */}
            <Nav.Link
              as={Link}
              to="/home"
              style={{ border: "none", borderRadius: "20px", color: "black" }}
              className={`d-flex align-items-center ${
                activeButton === "home" ? "bg-danger text-white" : ""
              }`}
              onClick={() => handleSelect("home")}
            >
              <BsHouseDoor className="me-2" /> หน้าแรก{" "}
            </Nav.Link>

            {/* ลิงก์ไปหน้าอนุมัติเอกสาร */}
            <Nav.Link
              as={Link}
              to="/approve"
              style={{ border: "none", borderRadius: "20px", color: "black" }}
              className={`d-flex align-items-center ${
                activeButton === "approve" ? "bg-danger text-white" : ""
              }`}
              onClick={() => handleSelect("approve")}
            >
              <BsFolder2 className="me-2" /> อนุมัติเอกสาร{" "}
            </Nav.Link>

            {/* ลิงก์ไปหน้าการจัดการสิทธิ์ */}
            <Nav.Link
              as={Link}
              to="/grant-access"
              style={{ border: "none", borderRadius: "20px", color: "black" }}
              className={`d-flex align-items-center ${
                activeButton === "grant-access" ? "bg-danger text-white" : ""
              }`}
              onClick={() => handleSelect("grant-access")}
            >
              <BsPersonUp className="me-2" /> การจัดการสิทธิ์{" "}
            </Nav.Link>

            {/* ลิงก์ไปหน้าแจ้งเตือน */}
            <Nav.Link
              as={Link}
              to="/notification"
              style={{ border: "none", borderRadius: "20px", color: "black" }}
              className={`d-flex align-items-center ${
                activeButton === "notification" ? "bg-danger text-white" : ""
              }`}
              onClick={() => handleSelect("notification")}
            >
              <BsBell className="me-2" /> แจ้งเตือน{" "}
            </Nav.Link>

            {/* ลิงก์ไปหน้าถังขยะ */}
            <Nav.Link
              as={Link}
              to="/bin"
              style={{
                color: "black",
                border: "none",
                borderRadius: "20px",
                marginTop: "2rem",
              }}
              className={`d-flex align-items-center ${
                activeButton === "bin" ? "bg-danger text-white" : ""
              }`}
              onClick={() => handleSelect("bin")}
            >
              <BsTrash className="me-2" /> ถังขยะ{" "}
            </Nav.Link>

            {/* ลิงก์ไปหน้าtestการใช้ถังขยะ */}
            <Nav.Link
              as={Link}
              to="/test_DocumentList"
              style={{
                color: "black",
                border: "none",
                borderRadius: "20px",
              }}
              className={`d-flex align-items-center ${
                activeButton === "test_DocumentList" ? "bg-danger text-white" : ""
              }`}
              onClick={() => handleSelect("test_DocumentList")}
            >
              <BsBraces  className="me-2" /> testการใช้ถังขยะ{" "}
            </Nav.Link>
          </Nav>
        </Container>
      </div>
    </div>
  );
}

export default NavbarMain;

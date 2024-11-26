// import components
import { useState, useRef, useMemo } from "react";
import { Button, Modal, Form, Col, Row, Dropdown } from "react-bootstrap";

// import data
import { verifyUser } from "./VerifyUser";

// import icon
import {
  BsPersonBadge,
  BsPersonCircle,
  BsFillDoorOpenFill,
} from "react-icons/bs";

// import style
import "./Login.css";

function Login({ setRole }) {
  const [userInfo, setUserInfo] = useState(null); // userInfo เก็บข้อมูลผู้ใช้
  const userRef = useRef();
  const passRef = useRef();

  // ระบบ Login
  const handleLogin = () => {
    const userID = userRef.current.value.trim();
    const pass = passRef.current.value.trim();

    userRef.current.value = "";
    passRef.current.value = "";

    const user = verifyUser(userID, pass);
    if (!user) {
      alert("Invalid username or password");
      userRef.current.focus();
    } else {
      // alert(`Welcome ${user.name} (${user.role})`);
      setUserInfo(user); // เก็บข้อมูลผู้ใช้หลังจากล็อกอิน
      if (setRole) setRole(user.role); // กำหนดบทบาทให้ Component Parent ถ้ามี
    }
  };

  // ระบบ Logout
  const handleLogout = () => {
    setUserInfo(null); // รีเซ็ตข้อมูลผู้ใช้
    setRole(""); // รีเซ็ตบทบาท
  };

  // popUp Login
  const [showLogin, setShowLogin] = useState(false);
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  // เปลี่ยนสีตาม"role"นั้นๆ
  const roleColor = useMemo(() => {
    if (!userInfo) return "#6c757d"; // ค่าเริ่มต้นถ้ายังไม่ได้ล็อกอิน
    switch (userInfo.role) {
      case "SuperAdmin":
        return "#DC3545";
      case "Admin":
        return "#FF834E";
      case "Officer":
        return "#FFB40D";
      default:
        return "#6c757d";
    }
  }, [userInfo]);

  // หากยังไม่ได้ล็อกอิน
  if (!userInfo) {
    return (
      <div className="Login-container">
        <Button
          variant="light"
          onClick={handleShowLogin}
          style={{
            background: "none",
            border: "none",
            boxShadow: " 0px 0px 4px #ddd",
            marginRight: "1rem",
          }}
        >
          เข้าสู่ระบบ
          <BsPersonCircle
            size={24}
            style={{
              color: "#4d4d4d",
              background: "none",
              border: "none",
              borderRadius: "30px",
              margin: "0 0 0 0.5rem",
            }}
          />
        </Button>
        <Modal
          show={showLogin}
          onHide={handleCloseLogin}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <BsPersonBadge
                className="me-3"
                style={{ marginLeft: "0.5rem" }}
              />
              ลงชื่อเข้าสู่ระบบ
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className="mt-2 mb-2 mx-3">
              <Form.Group as={Row} controlId="username">
                <Form.Label column sm="3">
                  รหัสพนักงาน
                </Form.Label>
                <Col sm="9">
                  <Form.Control type="text" placeholder="id" ref={userRef} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="password" className="mt-3">
                <Form.Label column sm="3">
                  รหัสผ่าน
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="password"
                    placeholder="pass"
                    ref={passRef}
                  />
                </Col>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseLogin}>
              ยกเลิก
            </Button>
            <Button variant="success" onClick={handleLogin}>
              เข้าสู่ระบบ
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

  // หากล็อกอินแล้ว
  return (
    <div className="Login-container">
      <Dropdown align="end" style={{ background: "none", border: "none" }}>
        <Dropdown.Toggle
          as={Button}
          className="align-items-center"
          style={{
            background: "none",
            border: "none",
            boxShadow: " 0px 0px 4px #ccc",
            marginRight: "0.5rem",
            color: "#4d4d4d",
          }}
        >
          <span style={{ color: roleColor }}><BsPersonBadge size={24} className="me-2" /></span>
          {userInfo.name}&nbsp; 
          (<span style={{ color: roleColor }}>{userInfo.role}</span>)&nbsp;&nbsp;
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#/profile">View Profile</Dropdown.Item>
          <Dropdown.Item href="#/settings">Settings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleLogout} style={{ color: "red" }}>
            <BsFillDoorOpenFill size={16} className="me-2" />
            Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default Login;

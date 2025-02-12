// styles
import "./GrantAccess.css";

//bootstrap
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

//react
import React, { useRef, useState } from "react";

function EditButton({ data, onRoleChange, allUsers, updateAllUsers }) {
  const superAdmin = allUsers.find((user) => user.role === "Super Admin");

  // สร้าง state ชั่วคราวสำหรับการแก้ไข (ไม่แก้ไขจริงจนกดปุ่มยืนยัน)
  const [tempRole, setTempRole] = useState(data.role);
  const [tempDownload, setTempDownload] = useState(data.download);
  const [tempUpload, setTempUpload] = useState(data.upload);

  // สร้าง state สำหรับการตรวจสอบสีของช่องกรอก ID และ Password
  const [isIdValid, setIsIdValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  // สร้าง state สำหรับการแสดง popup
  const [showEdit, setShowEdit] = useState(false);
  const [show, setShow] = useState(false); //ตัวแปรสําหรับเปิดปุ่ม 1
  const [show2, setShow2] = useState(false); //ตัวแปรสําหรับเปิดปุ่ม 2

  // สร้าง useRef สําหรับการกรอก ID และ Password
  const idRef = useRef();
  const passwordRef = useRef();

  // ฟังก์ชัน Notification
  const [notifications, setNotifications] = useState([]);

  // ฟังก์ชันสำหรับจัดการ role ชั่วคราว
  const handleRoleChange = (e) => {
    setTempRole(e.target.value);
  };

  // ฟังก์ชันสำหรับจัดการสถานะ download/upload ชั่วคราว
  const handleCheckboxChange = (type) => {
    if (type === "download") {
      setTempDownload((prev) => !prev); // สลับสถานะ download
    } else if (type === "upload") {
      setTempUpload((prev) => !prev); // สลับสถานะ upload
    }
  };

  // ฟังก์ชันเมื่อกดปุ่มยืนยัน
  const handleConfirm = () => {
    onRoleChange(data.id, tempRole, tempDownload, tempUpload); // ส่งข้อมูลที่อัปเดตไปยัง Parent

    // ส่งการแจ้งเตือน
    const notification = {
      title: "คุณได้รับการแก้ไขสิทธิ์", // หัวเรื่องของแจ้งเตือน
      body: `สิทธิ์ของ ${data.name} ได้ถูกแก้ไข ตำแหน่ง: ${
        tempRole === "Officer"
          ? `ตําแหน่ง Officer การดาวน์โหลด: ${
              tempDownload === true ? "ดาวน์โหลดได้" : "ดาวน์โหลดไม่ได้"
            } การอัปโหลด: ${
              tempUpload === true ? "อัปโหลดได้" : "อัปโหลดไม่ได้"
            }`
          : tempRole === "Admin"
          ? "ตําแหน่ง Admin"
          : "ตําแหน่ง Super Admin"
      }`, // เนื้อหาของแจ้งเตือน

      time: new Date().toLocaleString(), // เวลาที่แจ้งเตือน
    };
    const updatedNotifications = [...notifications, notification];
    setNotifications(updatedNotifications);
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications));

    setShowEdit(false); // ปิด popup
  };

  // ฟังก์ชันเมื่อกดปุ่มยกเลิก
  const handleCancel = () => {
    onRoleChange(data.id, data.role, data.download, data.upload); // ส่งข้อมูลเดิมไปยัง Parent
    setTempRole(data.role);
    setTempDownload(data.download);
    setTempUpload(data.upload);
    setShowEdit(false); // ปิด popup
  };

  // ฟังก์ชันสำหรับการตรวจสอบ ID และ Password
  const handleLogout = () => {
    const id = idRef.current.value;
    const password = passwordRef.current.value;

    // ตรวจสอบข้อมูลกับ Super Admin
    if (id === String(superAdmin.id) && password === superAdmin.password) {
      setShow2(true); // แสดง popup ถัดไป
      setShow(false); // ปิด popup ปัจจุบัน
    } else {
      setIsIdValid(false); // ตั้งให้สีช่อง ID เป็นแดง
      setIsPasswordValid(false); // ตั้งให้สีช่อง Password เป็นแดง
    }
  };

  const handleClose = () => {
    setIsIdValid(true);
    setIsPasswordValid(true);
    setShow(false);
  }; //ฟังก์ชันสําหรับปิดปุ่ม

  const handleShow = () => setShow(true); //ฟังก์ชันสําหรับเปิดปุ่ม

  // ฟังก์ชันสำหรับยืนยันการเปลี่ยน Super Admin
  const handleDoubleCheckConfirm = () => {
    const updatedUsers = allUsers.map((user) => {
      if (user.id === data.id) {
        // เปลี่ยน role ของผู้ที่ได้รับสิทธิ์เป็น Super Admin
        return { ...user, role: "Super Admin" };
      } else if (user.id === superAdmin.id) {
        // เปลี่ยน role ของ Super Admin คนเดิมเป็น Officer
        return { ...user, role: "Officer" };
      }
      return user; // ผู้ใช้คนอื่น ๆ ไม่เปลี่ยนแปลง
    });

    // อัปเดตข้อมูลใน localStorage
    localStorage.setItem("userData", JSON.stringify(updatedUsers));

    // อัปเดตข้อมูลผู้ใช้ทั้งหมดใน Parent Component
    updateAllUsers(updatedUsers);

    setShow2(false); // ปิด popup double check
    setShowEdit(false); // ปิด popup edit

    // ส่งการแจ้งเตือน
    const notification = {
      title: "คุณได้รับการแก้ไขสิทธิ์", // หัวเรื่องของแจ้งเตือน
      body: `สิทธิ์ของ ${data.name} ได้ถูกแก้ไข ตำแหน่ง: ตำแหน่ง Super Admin`, // เนื้อหาของแจ้งเตือน
  
      time: new Date().toLocaleString(), // เวลาที่แจ้งเตือน
    };
    const updatedNotifications = [...notifications, notification];
    setNotifications(updatedNotifications);
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
  };

  return (
    <div>
      <span
        className="drop bi bi-pencil-square"
        onClick={() => setShowEdit(true)}
      ></span>
      {/* popup Edit */}
      <Modal
        show={showEdit}
        onHide={() => setShowEdit(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            ข้อมูล
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="profile">
            <p>ชื่อ: {data.name}</p>
            <p>ตำแหน่ง: {tempRole}</p>
            <p>ID: {data.id}</p>
            <p>แผนก: {data.department}</p>
            <select name="role" value={tempRole} onChange={handleRoleChange}>
              <option value="Admin">Admin</option>
              <option value="Officer">Officer</option>
            </select>
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={() => {
                handleShow(), setShowEdit(false);
              }}
            >
              มอบสิทธิ์Super Admin
            </button>
            {data.role === "Officer" && (
              <>
                <div style={{ marginTop: "20px" }}>
                  {/* จัดการสถานะ download */}
                  <input
                    type="checkbox"
                    name="download"
                    id="download"
                    checked={tempDownload} // แสดงเป็นเช็คเมื่อ download === true
                    onChange={() => handleCheckboxChange("download")} // สลับสถานะ
                  />{" "}
                  &nbsp;<label>การดาวน์โหลด</label>
                </div>
                <div style={{ marginTop: "20px" }}>
                  {/* จัดการสถานะ upload */}
                  <input
                    type="checkbox"
                    name="upload"
                    id="upload"
                    checked={tempUpload} // แสดงเป็นเช็คเมื่อ upload === true
                    onChange={() => handleCheckboxChange("upload")} // สลับสถานะ
                  />{" "}
                  &nbsp;<label>การอัปโหลด</label>
                </div>
              </>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleCancel} className="btn btn-secondary">
            ยกเลิก
          </button>
          <button className="btn btn-danger" onClick={handleConfirm}>
            ยืนยัน
          </button>
        </Modal.Footer>
      </Modal>

      {/* popup confirm ID&Password */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "red" }}>
            การยืนยันเพื่อมอบสิทธิ์&nbsp;Super&nbsp;Admin
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <span>
                <b>
                  โปรดกรอก&nbsp;ID&nbsp;และ&nbsp;รหัสผ่าน เพื่อ
                  <span style={{ color: "red" }}>
                    ยืนยันการมอบสิทธิ์Super Admin
                  </span>
                  ให้กับ <span style={{ color: "red" }}>{data.name}</span>
                </b>
              </span>
              <br />
              <Form.Label>ID:</Form.Label>
              <Form.Control
                type="ID"
                autoFocus
                ref={idRef}
                style={{ borderColor: isIdValid ? "" : "red" }} // เปลี่ยนสีช่องกรอก ID เป็นแดงถ้าผิด
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                style={{ borderColor: isPasswordValid ? "" : "red" }} // เปลี่ยนสีช่องกรอก Password เป็นแดงถ้าผิด
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            ยกเลิก
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleLogout();
            }}
          >
            ออกจากระบบ
          </Button>
        </Modal.Footer>
      </Modal>

      {/* popup double check */}
      <Modal show={show2} onHide={() => setShow2(false)}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "red" }}>การยืนยัน</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <p>
                หากคุณทำการ
                <span style={{ color: "red" }}>
                  ยืนยันการมอบสิทธิ์Super&nbsp;Admin
                </span>
                ให้กับ<span style={{ color: "red" }}>{data.name}</span>
                &nbsp;ระบบจะปรับสิทธิ์คุณให้เป็น&nbsp;
                <span style={{ color: "red" }}>Admin</span>&nbsp;
                จากนั้นคุณจะต้องทำการเข้าสู่ระบบใหม่อีกครั้ง&nbsp;คุณยืนยันหรือไม่
              </p>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow2(false)}>
            ยกเลิก
          </Button>
          <Button variant="danger" onClick={handleDoubleCheckConfirm}>
            ยืนยัน
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditButton;

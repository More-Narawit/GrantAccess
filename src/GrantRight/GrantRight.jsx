import './GrantRight.css';
import Table from 'react-bootstrap/Table';
import Expandable from './Expandable';
import { data } from '../Data/data';
import ExpandableButton from './ExpandableButton';
import { useState } from 'react';

function GrantRight() {
    const [openRows, setOpenRows] = useState({}); // ใช้อ็อบเจ็กต์ในการเก็บสถานะของแต่ละแถว

    const toggleRow = (row) => {
        setOpenRows((prevState) => ({
            ...prevState,
            [row]: !prevState[row], // สลับสถานะของแถวที่เลือก
        }));
    };

    return (
        <div className="grantAccess-container">
            <h1 style={{ textAlign: "center" }}>การจัดการสิทธิ</h1>
            <div className="grantAccess-form">
                <Table className="grantAccess-table">
                    <thead>
                        <tr>
                            <th className='fs-5'>บทบาท</th>
                            <th className='fs-5'>รายระเอียด</th>
                            <th className='text-center fs-5'>จำนวน</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Super Admin</td>
                            <td>สามารถจัดการสิทธิ สามารถอนุมัติเอกสารของAdminที่เข้ามา</td>
                            <td className='text-center'>1</td>
                            <td className="drop">
                                <ExpandableButton isOpen={openRows["Super Admin"]} toggle={() => toggleRow("Super Admin")} />
                            </td>
                        </tr>
                        {data.filter(item => item.role === "Super Admin").map((data, index) => (
                            <Expandable key={index} data={data} isOpen={openRows["Super Admin"]}/>
                        ))}
                        <tr>
                            <td>Admin</td>
                            <td>สามารถเข้าถึงการใช้ของฟังก์ชั่นการอนุมัติเอกสารของOfficerที่เข้ามา สามารถอัปโหลดเอกสาร และสามารถดาวน์โหลดเอกสารได้</td>
                            <td className='text-center'>10</td>
                            <td className="drop">
                                <ExpandableButton isOpen={openRows["Admin"]} toggle={() => toggleRow("Admin")} />
                            </td>
                        </tr>
                        {data.filter(item => item.role === "Admin").map((data, index) => (
                            <Expandable key={index} data={data} isOpen={openRows["Admin"]}/>
                        ))}
                        <tr>
                            <td>Officer</td>
                            <td>สามารถเข้าถึงการอัปโหลดเอกสาร และสามารถดาวน์โหลดเอกสารได้</td>
                            <td className='text-center'>50</td>
                            <td className="drop">
                                <ExpandableButton isOpen={openRows["Officer"]} toggle={() => toggleRow("Officer")} />
                            </td>
                        </tr>
                        {data.filter(item => item.role === "Officer").map((data, index) => (
                            <Expandable key={index} data={data} isOpen={openRows["Officer"]} />
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default GrantRight;

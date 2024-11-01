import './GrantAccess.css'
import Table from 'react-bootstrap/Table';
import Expandable from '../Expandable/Expandable'
import { data } from '../Data/data'

function GrantAccess() {

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
                            <td className="drop"><span className="bi bi-box-arrow-right"></span>&nbsp;&nbsp;&nbsp;<span className="bi bi-caret-down"></span></td>
                        </tr>
                        {
                        data.map((data, index) => {
                            //filter super admin
                            if (data.role === "Super Admin"){
                                return (
                                    <Expandable data={data} index={index} />
                                )
                            }
                        })
                        }
                        <tr>
                            <td>Admin</td>
                            <td>สามารถเข้าถึงการใช้ของฟังก์ชั่นการอนุมัติเอกสารของOfficerที่เข้ามา สามารถอัปโหลดเอกสาร และสามารถดาวน์โหลดเอกสารได้</td>
                            <td className='text-center'>10</td>
                            <td className="drop"><span className="bi bi-caret-down"></span></td>
                        </tr>
                        {
                        data.map((data, index) => {
                            //filter admin
                            if (data.role === "Admin"){
                                return (
                                    <Expandable data={data} index={index} />
                                )
                            }
                        })
                        }
                        <tr>
                            <td>Officer</td>
                            <td>สามารถเข้าถึงการอัปโหลดเอกสาร และสามารถดาวน์โหลดเอกสารได้</td>
                            <td className='text-center'>50</td>
                            <td className="drop"><span className="bi bi-caret-down"></span></td>
                        </tr>
                        {
                        data.map((data, index) => {
                            //filter officer
                            if (data.role === "Office"){
                                return (
                                    <Expandable data={data} index={index} />
                                )
                            }
                        })
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default GrantAccess
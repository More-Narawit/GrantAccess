import React, { useState, useEffect } from "react";
import { FaTrash, FaPlus } from "react-icons/fa";

function DocumentList() {
  const [documents, setDocuments] = useState([]);

  // ดึงข้อมูลเอกสารจาก Local Storage
  useEffect(() => {
    const storedDocuments = JSON.parse(localStorage.getItem("documents")) || [];
    setDocuments(storedDocuments);
  }, []);

  // เพิ่มเอกสารใหม่
  const addDocument = () => {
    const newDocument = {
      id: Date.now(), // รหัสเอกสาร (Document ID)
      title: `Document ${documents.length + 1}`, // รหัสเอกสาร (Document ID)
      content: "Sample content", // เนื้อหาในเอกสาร
    };
    const updatedDocuments = [...documents, newDocument];
    setDocuments(updatedDocuments);
    localStorage.setItem("documents", JSON.stringify(updatedDocuments));
  };

  // ลบเอกสารไปยัง Bin
  const deleteDocument = (id) => {
    const docToBin = documents.find((doc) => doc.id === id);
    const updatedDocuments = documents.filter((doc) => doc.id !== id);

    const bin = JSON.parse(localStorage.getItem("bin")) || [];
    bin.push(docToBin);
    localStorage.setItem("bin", JSON.stringify(bin));

    setDocuments(updatedDocuments);
    localStorage.setItem("documents", JSON.stringify(updatedDocuments));
  };

  return (
    <div className="main_css-container">
      <h1>Document List</h1>
      <button className="btn btn-outline-secondary" onClick={addDocument}>
        <FaPlus /> Add Document
      </button>

      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Content</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr key={doc.id}>
              <td>{doc.id}</td>
              <td>{doc.title}</td>
              <td className="">{doc.content}</td>
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => deleteDocument(doc.id)}
                >
                  <FaTrash /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DocumentList;

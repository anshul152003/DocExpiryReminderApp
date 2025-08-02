import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ExpiringSoon from "../components/ExpiringSoon";
import DocsTable from "../components/DocsTable";
import UploadModal from "../components/UploadModal";
import { getDaysLeft } from "../utils/dateUtils";
import axios from "axios";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [documents, setDocuments] = useState([]);

  // ✅ Fetch documents from backend when Dashboard loads
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await axios.get("/api/documents", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        console.log("Fetched documents:", res.data);
        setDocuments(res.data.documents || []);
      } catch (err) {
        console.error("Error fetching documents:", err);
      }
    };

    fetchDocuments();
  }, []);

  // ✅ When a new doc is uploaded
  const handleUpload = async (newDoc) => {
    try {
      const res = await axios.post("/api/documents/create", newDoc, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log("Uploaded document:", res.data);
      setDocuments((prevDocs) => [...prevDocs, res.data.document || res.data]);
    } catch (err) {
      console.error("Error uploading document:", err);
    }
  };

  // ✅ Documents expiring in the next 7 days
  const expiringSoon = Array.isArray(documents)
    ? documents.filter((doc) => {
        const daysLeft = getDaysLeft(doc.expiryDate);
        return daysLeft >= 0 && daysLeft <= 7;
      })
    : [];

  return (
    <>
      <Navbar onUploadClick={() => setIsModalOpen(true)} />

      <main className="p-6 max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-blue-50 via-white to-purple-50 p-6 rounded-2xl shadow-md mb-6 animate-fade-in">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
            📁 Smart Document Dashboard
          </h1>
          <p className="text-lg text-gray-700">
            Stay on top of your important documents. Get notified before they
            expire — because deadlines shouldn’t be a surprise.
          </p>
        </div>

        <ExpiringSoon documents={expiringSoon} />
        <DocsTable documents={documents} />
      </main>

      <UploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpload={handleUpload}
      />
    </>
  );
};

export default Dashboard;
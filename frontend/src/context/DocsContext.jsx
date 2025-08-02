import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const DocsContext = createContext();

export const useDocs = () => useContext(DocsContext);

export const DocsProvider = ({ children }) => {
  const { user } = useAuth();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/documents", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const data = await res.json();
      setDocuments(data);
    } catch (err) {
      console.error("Failed to fetch documents", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchDocuments();
  }, [user]);

  return (
    <DocsContext.Provider
      value={{
        documents,
        setDocuments,
        fetchDocuments,
        loading,
      }}
    >
      {children}
    </DocsContext.Provider>
  );
};

import React, { useContext, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { FaFileExport } from "react-icons/fa";
import * as XLSX from "xlsx"; // Import the xlsx library
import jsPDF from "jspdf";
import "jspdf-autotable";
import { userContext } from "../context/userContext/userContext";
import "../css/loader.css";
import { Navigate } from "react-router-dom";

const Leads = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [leads, setLeads] = useState([]);
  const { user, logout } = useContext(userContext);

  console.log("leads user", user);
  console.log(user.user?.email);
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await fetch("https://webscrappingbackend.vercel.app/allLeads", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Error fetching leads");

        if (
          res.status === 401 ||
          data.msg === "Token Expired. Please log in again."
        ) {
          logout();
          Navigate("/login");
          return;
        }

        setLeads(data.success ? data.data : []);
      } catch (error) {
        console.error("Error fetching leads:", error.message);
      }
    };

    fetchLeads();
  }, [logout]);

  const filteredLeads = leads?.filter((lead) =>
    // lead.email !== null &&
    [lead?.storeName, lead?.address, lead?.category].some((field) =>
      field?.toLowerCase().includes(searchTerm?.toLowerCase())
    )
  );

  //! convert into csv
  const exportToCSV = () => {
    const csvRows = [
      [
        "ID",
        "Name",
        "Email",
        "Address",
        "Category",
        "Phone",
        "City",
        "Google Url",
        "Website",
        "Rating",
        "Stars",
        "Reviews",
        "About",
        "Facebook",
        "LinkedIn",
        "Instagram",
        "Youtube",
        "Logo",
        "Images",
      ],
      ...filteredLeads.map((lead) => [
        lead.placeId,
        lead.storeName,
        lead.email,
        lead.address,
        lead.category,
        lead.phone,
        lead.city,
        lead.googleUrl,
        lead.bizWebsite,
        lead.ratingText,
        lead.stars,
        lead.numberOfReviews,
        lead.about,
        lead.facebook || "N/A",
        lead.linkedIn || "N/A",
        lead.instagram || "N/A",
        lead.youtube || "N/A",
        lead.logoUrl || "N/A",
        lead.images || "N/A",
      ]),
    ];

    const csvContent = `data:text/csv;charset=utf-8,${csvRows
      .map((row) => row.join(","))
      .join("\n")}`;
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "leads.csv";
    link.click();
  };

  //! convert into pdf
  const exportToPdf = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    let yPosition = 20;

    filteredLeads.forEach((lead, index) => {
      doc.text(`Lead #${index + 1}`, 20, yPosition);
      yPosition += 10;

      doc.setFontSize(12);
      doc.text(`Store Name: ${lead.storeName || "N/A"}`, 20, yPosition);
      yPosition += 10;
      doc.text(`Email: ${lead.email || "N/A"}`, 20, yPosition);
      yPosition += 10;
      doc.text(`Address: ${lead.address || "N/A"}`, 20, yPosition);
      yPosition += 10;
      doc.text(`City: ${lead.city || "N/A"}`, 20, yPosition);
      yPosition += 10;
      doc.text(`Category: ${lead.category || "N/A"}`, 20, yPosition);
      yPosition += 10;
      doc.text(`Phone: ${lead.phone || "N/A"}`, 20, yPosition);
      yPosition += 10;
      doc.text(`Google URL: ${lead.googleUrl || "N/A"}`, 20, yPosition);
      yPosition += 10;
      doc.text(`Website: ${lead.bizWebsite || "N/A"}`, 20, yPosition);
      yPosition += 10;
      doc.text(`Rating: ${lead.ratingText || "N/A"}`, 20, yPosition);
      yPosition += 10;
      doc.text(`Stars: ${lead.stars || "N/A"}`, 20, yPosition);
      yPosition += 10;
      doc.text(`LogoUrl: ${lead.logoUrl || "N/A"}`, 20, yPosition);
      yPosition += 10;
      doc.text(`Images: ${lead.images || "N/A"}`, 20, yPosition);
      yPosition += 10;
      doc.text(`Reviews: ${lead.numberOfReviews || "N/A"}`, 20, yPosition);
      yPosition += 20; // Add space between leads

      if (yPosition > 280) {
        doc.addPage();
        yPosition = 20;
      }
    });

    doc.save("leads.pdf");
  };

  //! convert into excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredLeads);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Leads");
    XLSX.writeFile(wb, "leads.xlsx");
  };

  return (
    <div className="container-fluid mt-4 w-100">
      <h2 className="mb-3">All Leads</h2>
      <div className="input-group mb-3 w-50">
        <input
          type="text"
          className="form-control"
          placeholder="Search Leads"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {leads && leads.length > 0 ? (
          <>
            <Button variant="contained" color="primary" onClick={exportToCSV}>
              <FaFileExport className="me-1" /> Export CSV
            </Button>
            <Button variant="contained" color="primary" onClick={exportToPdf}>
              <FaFileExport className="me-1" /> Export Pdf
            </Button>
            <Button variant="contained" color="primary" onClick={exportToExcel}>
              <FaFileExport className="me-1" /> Export Excel
            </Button>
          </>
        ) : (
          <>
            <h5 className="ms-2">processing</h5>
            <div class="loader">
              <div class="bar1"></div>
              <div class="bar2"></div>
              <div class="bar3"></div>
              <div class="bar4"></div>
              <div class="bar5"></div>
              <div class="bar6"></div>
              <div class="bar7"></div>
              <div class="bar8"></div>
              <div class="bar9"></div>
              <div class="bar10"></div>
              <div class="bar11"></div>
              <div class="bar12"></div>
            </div>
          </>
        )}
      </div>

      <div className="table-responsive w-100">
        <table className="table table-bordered table-hover w-100">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Category</th>
              {/* <th>User Category</th> */}
              <th>Phone</th>
              <th>City</th>
              <th>Google Url</th>
              <th>Website</th>
              <th>Rating</th>
              <th>Stars</th>
              <th>Reviews</th>
              <th>About</th>
              <th>Facebook</th>
              <th>LinkedIn</th>
              <th>Instagram</th>
              <th>Youtube</th>
              <th>Logo</th>
              <th>Images</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads && filteredLeads.length > 0 ? (
              filteredLeads.map((lead, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{lead.storeName}</td>
                  <td>{lead.email || "N/A"}</td>
                  <td>
                    <div style={{ height: "130px", overflowY: "auto" }}>
                      {lead.address || "N/A"}
                    </div>
                  </td>
                  <td>{lead.category}</td>
                  {/* <td>{lead.projectCategory}</td> */}
                  <td>{lead.phone}</td>
                  <td>{lead.city}</td>
                  <td>
                    <a
                      className="sign"
                      href={lead.googleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Map
                    </a>
                  </td>
                  <td>
                    <a
                      className="sign"
                      href={lead.bizWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {lead.bizWebsite ? "Link" : "N/A"}
                    </a>
                  </td>
                  <td>{lead.ratingText}</td>
                  <td>{lead.stars}</td>
                  <td>{lead.numberOfReviews}</td>
                  <td>
                    <div style={{ height: "130px", overflowY: "auto" }}>
                      {lead.about || "N/A"}
                    </div>
                  </td>

                  <td>
                    <a
                      className="sign"
                      href={
                        lead.socialLinks?.facebook
                          ? `${lead.socialLinks.facebook}`
                          : "#"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {lead.socialLinks?.facebook ? "Facebook" : "N/A"}
                    </a>
                  </td>
                  <td>
                    <a
                      className="sign"
                      href={
                        lead.socialLinks?.linkedin
                          ? `${lead.socialLinks.linkedin}`
                          : "#"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {lead.socialLinks?.linkedin ? "LinkedIn" : "N/A"}
                    </a>
                  </td>
                  <td>
                    <a
                      className="sign"
                      href={
                        lead.socialLinks?.instagram
                          ? `${lead.socialLinks.instagram}`
                          : "#"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {lead.socialLinks?.instagram ? "Instagram" : "N/A"}
                    </a>
                  </td>
                  <td>
                    <a
                      className="sign"
                      href={
                        lead.socialLinks?.youtube
                          ? `${lead.socialLinks.youtube}`
                          : "#"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {lead.socialLinks?.youtube ? "Youtube" : "N/A"}
                    </a>
                  </td>

                  <td>
                    <img
                      src={
                        lead.logoUrl ||
                        "https://wallpapers.com/images/hd/information-technology-dna-graphic-pa9ocw0ok1doalhu.jpg"
                      }
                      alt="Lead Logo"
                      style={{ width: "100%", objectFit: "contain" }}
                    />
                  </td>
                  <td>
                    <img
                      src={
                        lead.imageUrl ||
                        "https://wallpapers.com/images/hd/information-technology-dna-graphic-pa9ocw0ok1doalhu.jpg"
                      }
                      alt="Lead Logo"
                      style={{ width: "100%", objectFit: "contain" }}
                    />
                  </td>

                  {/* <td>
                    {lead.images.map((image, ind) => (
                      <img
                        key={ind}
                        src={`${image}`}
                        alt="Lead Image"
                        style={{ width: "100%", objectFit: "contain" }}
                      />
                    ))}
                  </td> */}
                  <td>Search</td>
                </tr>
              ))
            ) : (
              <h5>Loading...</h5>
            )}
          </tbody>
        </table>
      </div>

      {/* <div className="d-flex justify-content-center mt-3">
        <button className="btn btn-primary">Prev</button>
        <button className="btn btn-success">Next</button>
      </div> */}
    </div>
  );
};

export default Leads;

import React, { useContext, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { FaFileExport } from "react-icons/fa";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { userContext } from "../context/userContext/userContext";
import "../css/loader.css";

const SpecificLeads = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { user, showSpecificProject } = useContext(userContext);
  console.log("specific lead", showSpecificProject.data);

  // Ensure `showSpecificProject` is an array or default to an empty array
  const leads = Array.isArray(showSpecificProject.data)
    ? showSpecificProject.data
    : [];

  // Filter leads based on search term and check if email is not null or empty
  const filteredLeads = leads.filter((lead) =>
    // lead.email !== null &&
    [lead?.storeName, lead?.address, lead?.category].some((field) =>
      field?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

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
            <div className="loader">
              <div className="bar1"></div>
              <div className="bar2"></div>
              <div className="bar3"></div>
              <div className="bar4"></div>
              <div className="bar5"></div>
              <div className="bar6"></div>
              <div className="bar7"></div>
              <div className="bar8"></div>
              <div className="bar9"></div>
              <div className="bar10"></div>
              <div className="bar11"></div>
              <div className="bar12"></div>
            </div>
          </>
        )}
      </div>

      <div className="table-responsive w-100">
        <table className="table table-bordered table-hover w-100">
          <thead className="table-light">
            <tr>
              {[
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
              ].map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredLeads && filteredLeads.length > 0 ? (
              filteredLeads.map((lead, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{lead.storeName}</td>
                  <td>{lead.email}</td>
                  <td>
                    <div style={{ height: "130px", overflowY: "auto" }}>
                      {lead.address || "N/A"}
                    </div>
                  </td>
                  <td>{lead.category}</td>
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
                      style={{ width: "70%", objectFit: "contain" }}
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
                        src={
                          image ||
                          "https://wallpapers.com/images/hd/information-technology-dna-graphic-pa9ocw0ok1doalhu.jpg"
                        }
                        alt="Lead Image"
                        style={{ width: "70%", objectFit: "contain" }}
                      />
                    ))}
                  </td> */}
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

export default SpecificLeads;

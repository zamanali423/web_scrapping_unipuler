import React from "react";
import Sidebar from "../adminPages/AdminSideBar";
import "../../css/adminDashboard.css";
import { BarChart } from '@mui/x-charts/BarChart';

const AdminDashboard = () => {
  return (
    <div className="d-flex main">
      <Sidebar />
      <div className="container-fluid p-4 adminDashboard">
        <div className="welcome-header mb-4">
          <h2>Welcome, Ali</h2>
        </div>

        {/* Cards Section */}
        <div className="row mb-4">
          {[
            { title: "Total Sales", value: "$10,000" },
            { title: "Available Balance", value: "$5,000" },
            { title: "Net Invoice Due", value: "$1,500" },
            { title: "Total Sale Return", value: "$500" },
            { title: "Total Leads", value: "200" },
            { title: "Total Purchase", value: "$8,000" },
            { title: "Purchase Due", value: "$2,000" },
            { title: "Total Purchase Return", value: "$300" },
            { title: "Expense", value: "$1,200" },
          ].map((card, index) => (
            <div className="col-md-4 mb-3" key={index}>
              <div className="card text-center shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{card.title}</h5>
                  <p className="card-text">{card.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sales Graph Placeholder */}
        <div className="mb-4">
          <h4>Sales Graph</h4>
          <div className="bg-light border rounded" style={{ height: "300px" }}>
            {/* Placeholder for graph integration */}
            <BarChart
              series={[
                { data: [35, 44, 24, 34] },
                { data: [51, 6, 49, 30] },
                { data: [15, 25, 30, 50] },
                { data: [60, 50, 15, 25] },
              ]}
              height={290}
              xAxis={[{ data: ["Q1", "Q2", "Q3", "Q4"], scaleType: "band" }]}
              margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
            />
          </div>
        </div>

        {/* Sales Order Section */}
        <div className="mb-4">
          <h4>Sales Orders</h4>
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th>Date</th>
                <th>Order No</th>
                <th>Customer Name</th>
                <th>Customer Number</th>
                <th>Location</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Sample data */}
              <tr>
                <td>2024-11-05</td>
                <td>#12345</td>
                <td>John Doe</td>
                <td>+1-123-456-7890</td>
                <td>New York</td>
                <td>Pending</td>
              </tr>
              <tr>
                <td>2024-11-04</td>
                <td>#12344</td>
                <td>Jane Smith</td>
                <td>+1-987-654-3210</td>
                <td>Los Angeles</td>
                <td>Completed</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pending Shipments Section */}
        <div>
          <h4>Pending Shipments</h4>
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th>Date</th>
                <th>Order No</th>
                <th>Customer Name</th>
                <th>Customer Number</th>
                <th>Location</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Sample data */}
              <tr>
                <td>2024-11-03</td>
                <td>#12343</td>
                <td>Michael Johnson</td>
                <td>+1-555-666-7777</td>
                <td>Chicago</td>
                <td>In Progress</td>
              </tr>
              <tr>
                <td>2024-11-02</td>
                <td>#12342</td>
                <td>Emily Davis</td>
                <td>+1-444-555-6666</td>
                <td>Houston</td>
                <td>Pending</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

import React from "react";
import "./index.css";
import formatDate from "../../utils/DateFormat";

const Table = ({ data }) => {
    return (
        <div className="table-container">
            <table className="custom-table">
                <thead>
                    <tr>
                        <th>Done</th>
                        <th>Name</th>
                        <th>Completed</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((item) => (
                            <tr key={item._id}>
                                <td className="done-cell">{item.done ? "✔️" : "❌"}</td>
                                <td className="name-cell">{item.name}</td>
                                <td className="updated-at-cell">{formatDate(item.updatedAt)}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="no-data">No Data Available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
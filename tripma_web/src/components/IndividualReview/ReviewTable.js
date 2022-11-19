import React, { useEffect, useState } from "react";
import axios from "axios";

function ReviewTable(data) {
  const [tableData, setTableData] = useState();

  useEffect(() => {
    setTableData(data.feedbacks);
  }, []);

  const deleteFeedback = (reviewID, userID) => {
    // console.log(reviewID);
    // console.log(userID);
    const deleteObject = {
      userID: userID._id,
      feedbackID: reviewID,
    };

    axios
      .put(
        "https://travel-buddy-research.herokuapp.com/feedback/delete",
        deleteObject
      )
      .then((res) => {
        console.log("deleted");
        alert("Review deleted successfully !");
        window.location.reload();
      })
      .catch((err) => console.log("Delete err - ", err));
  };

  const contactUser = (uID) => {
    console.log(uID);
    sessionStorage.setItem("USERID", uID);
    window.location = "/customer-details";
  };

  return (
    <div>
      <h2 className="PageHeader">{data.type} Table</h2>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">User Name</th>
              <th scope="col">Feedback</th>
            </tr>
          </thead>
          {tableData
            ? tableData.map((review, index) => (
                <tbody key={index}>
                  <tr>
                    <td>{review.userID.fullName}</td>
                    <td>{review.feedback}</td>
                    <td>
                      <button
                        onClick={() =>
                          deleteFeedback(review._id, review.userID)
                        }
                        type="button"
                        className="btn btn-danger"
                      >
                        DELETE
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => contactUser(review.userID._id)}
                        type="button"
                        className="btn btn-info"
                      >
                        USER DETAILS
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))
            : null}
        </table>
      </div>
    </div>
  );
}

export default ReviewTable;

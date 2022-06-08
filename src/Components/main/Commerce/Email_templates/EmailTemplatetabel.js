import React from "react";
import { Link } from "react-router-dom";
import { converttimestamp } from "../../../../utils";

const EmailTemplatetabel = ({ title, id, updatedAt, status }) => {
  return (
    <>
      <tr>
        <td>{title}</td>
        <td>{converttimestamp(updatedAt)}</td>
        <td>
          {status ? (
            <span className="badge badge-pill badge-success font-size-12">
              Active
            </span>
          ) : (
            <span className="badge badge-pill badge-danger font-size-12">
              Inactive
            </span>
          )}
        </td>
        <td>
          <Link to={`/email_template_edit/${id}`}>
            <button
              type="button"
              className="btn btn-primary btn-sm  waves-effect waves-light btn-table ml-2"
            >
              Edit
            </button>
          </Link>
          <a href="#">
            {status ? (
              <button
                type="button"
                className="btn btn-danger btn-sm  waves-effect waves-light btn-table ml-2"
                id="sa-params"
              >
                Suspend
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-warning btn-sm  waves-effect waves-light btn-table ml-2"
                id="sa-params"
              >
                Activate
              </button>
            )}
          </a>
        </td>
      </tr>
    </>
  );
};

export default EmailTemplatetabel;

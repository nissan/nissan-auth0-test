import React, { useState } from "react";
import { Button, Alert } from "reactstrap";
import Highlight from "../components/Highlight";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import config from "../auth_config.json";
import Loading from "../components/Loading";
import { useTable, useSortBy } from "react-table";

const { apiOrigin = "http://localhost:3001" } = config;

export const AppRulesListingComponent = () => {
  const [state, setState] = useState({
    showResult: false,
    apiMessage: "",
    error: null,
  });

  const {
    getAccessTokenSilently,
    loginWithPopup,
    getAccessTokenWithPopup,
  } = useAuth0();

  const handleConsent = async () => {
    try {
      await getAccessTokenWithPopup();
      setState({
        ...state,
        error: null,
      });
    } catch (error) {
      setState({
        ...state,
        error: error.error,
      });
    }

    await callApi();
  };

  const handleLoginAgain = async () => {
    try {
      await loginWithPopup();
      setState({
        ...state,
        error: null,
      });
    } catch (error) {
      setState({
        ...state,
        error: error.error,
      });
    }

    await callApi();
  };

  const callApi = async () => {
    try {
      const token = await getAccessTokenSilently();

      const response = await fetch(`${apiOrigin}/api/apprules`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();

      setState({
        ...state,
        showResult: true,
        apiMessage: responseData,
      });
    } catch (error) {
      setState({
        ...state,
        error: error.error,
      });
    }
  };

  const handle = (e, fn) => {
    e.preventDefault();
    fn();
  };

  const data = React.useMemo(
    () => [
      {
        col1: "App1",
        col2: "Rule1",
      },
      {
        col1: "App2",
        col2: "",
      },
      {
        col1: "App3",
        col2: "Rule1, Rule2",
        disabledRule: "Rule 9"
      },
    ],
    []
  );
  const columns = React.useMemo(
    () => [
      {
        Header: "Application Name",
        accessor: "col1", // accessor is the "key" in the data
      },
      {
        Header: "Enabled Rules Applied",
        accessor: "col2",
      },
      {
        Header: "Disabled Rules Applied",
        accessor: "disabledRule"
      }
    ],
    []
  );
  const tableInstance = useTable({ columns, data }, useSortBy);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;
  return (
    <>
      <div className="mb-5">
        {state.error === "consent_required" && (
          <Alert color="warning">
            You need to{" "}
            <a
              href="#/"
              class="alert-link"
              onClick={(e) => handle(e, handleConsent)}
            >
              consent to get access to users api
            </a>
          </Alert>
        )}

        {state.error === "login_required" && (
          <Alert color="warning">
            You need to{" "}
            <a
              href="#/"
              class="alert-link"
              onClick={(e) => handle(e, handleLoginAgain)}
            >
              log in again
            </a>
          </Alert>
        )}

        <h1>App Rules Listing</h1>
        <p>Show the List of Registered Apps and their associated Rules</p>
<div className="result-block-container">
  {!state.showResult && (<div><Button color="primary" className="mt-5" onClick={callApi}>
          Show Data
        </Button></div>)}
  {/* apply the table props */}
  <table {...getTableProps()}>
              <thead>
                {
                  // Loop over the header rows
                  headerGroups.map((headerGroup) => (
                    // Apply the header row props
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {
                        // Loop over the headers in each row
                        headerGroup.headers.map((column) => (
                          // Apply the header cell props
                          <th {...column.getHeaderProps()}>
                            {
                              // Render the header
                              column.render("Header")
                            }
                          </th>
                        ))
                      }
                    </tr>
                  ))
                }
              </thead>
              {/* Apply the table body props */}
              <tbody {...getTableBodyProps()}>
                {
                  // Loop over the table rows
                  rows.map((row) => {
                    // Prepare the row for display
                    prepareRow(row);
                    return (
                      // Apply the row props
                      <tr {...row.getRowProps()}>
                        {
                          // Loop over the rows cells
                          row.cells.map((cell) => {
                            // Apply the cell props
                            return (
                              <td {...cell.getCellProps()}>
                                {
                                  // Render the cell contents
                                  cell.render("Cell")
                                }
                              </td>
                            );
                          })
                        }
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
</div>
        <Button color="primary" className="mt-5" onClick={callApi}>
          Ping API
        </Button>
      </div>

      <div className="result-block-container">
        {state.showResult && (
          <div className="result-block" data-testid="api-result">
            <h6 className="muted">Result</h6>
            <Highlight>
              <span>{JSON.stringify(state.apiMessage, null, 2)}</span>
            </Highlight>
            
          </div>
        )}
      </div>
    </>
  );
};

export default withAuthenticationRequired(AppRulesListingComponent, {
  onRedirecting: () => <Loading />,
});

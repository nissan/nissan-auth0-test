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
        disabledRule: "Rule 9",
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
        accessor: "disabledRule",
      },
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
          {!state.showResult && (
            <div>
              <Button color="primary" className="mt-5" onClick={callApi}>
                Show Data
              </Button>
            </div>
          )}
          {state.showResult && (
            <>
              <div>
                <Button color="primary" className="mt-5" onClick={callApi}>
                  Refresh Data
                </Button>
              </div>
              <table
                style={{
                  borderCollapse: "collapse",
                  margin: "25px 0",
                  fontSize: "0.9em",
                  fontFamily: "sans-serif",
                  minWidth: "400px",
                  boxShadow: "0 0 20px rgba(0, 0, 0, 0.15)",
                }}
              >
                <thead>
                  <tr
                    style={{
                      backgroundColor: "#980000",
                      color: "#ffffff",
                      textAlign: "left",
                    }}
                  >
                    <th style={{ padding: "12px 15px" }}>App Name</th>
                    <th style={{ padding: "12px 15px" }}>Applied Rules</th>
                    <th style={{ padding: "12px 15px" }}>Disabled Rules</th>
                  </tr>
                </thead>
                {state.apiMessage.appData.map((app) => (
                  <tbody>
                    <tr
                      style={
                        app.name === "All Applications"
                          ? {
                              borderBottom: "1px solid #dddddd",
                              backgroundColor: "green",
                            }
                          : { borderBottom: "1px solid #dddddd" }
                      }
                    >
                      <td>
                        {app.name === "All Applications" ? (
                          <span style={{ fontWeight: "bold" }}>{app.name}</span>
                        ) : (
                          app.name
                        )}
                      </td>
                      <td>
                        <ul>
                          {app.rules.map(
                            (rule) =>
                              rule.enabled && (
                                <li style={{ listStyle: "disc" }}>
                                  {rule.name}
                                </li>
                              )
                          )}
                        </ul>
                      </td>
                      <td>
                        <ul>
                          {app.rules.map(
                            (rule) =>
                              !rule.enabled && (
                                <li style={{ listStyle: "disc" }}>
                                  {rule.name}
                                </li>
                              )
                          )}
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </>
          )}
        </div>
        <Button
          color="primary"
          className="mt-5"
          onClick={() => setState({ ...state, debug: true })}
        >
          Show API Return Data
        </Button>
      </div>
      {state.debug && (
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
      )}
    </>
  );
};

export default withAuthenticationRequired(AppRulesListingComponent, {
  onRedirecting: () => <Loading />,
});

const applicationState = {
  requests: [],
};

const mainContainer = document.querySelector("#container");

const API = "http://localhost:8088";

export const fetchRequests = () => {
  return fetch(`${API}/requests`)
    .then((response) => response.json())
    .then((serviceRequests) => {
      // Store the external state in application state
      applicationState.requests = serviceRequests;
    });
};

export const getRequests = () =>
  applicationState.requests.map((request) => ({ ...request }));

export const sendRequest = (userServiceRequest) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userServiceRequest),
  };

  return fetch(`${API}/requests`, fetchOptions)
    .then((response) => response.json())
    .then(() => {
      mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
    });
};

export const deleteRequest = (id) => {
  return fetch(`${API}/requests/${id}`, { method: "DELETE" })
      .then(
          () => {
              mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
          }
      )
}
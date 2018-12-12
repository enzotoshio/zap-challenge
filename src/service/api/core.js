const headers = {
  'Content-Type': 'application/json',
};

function mountError({ response: { status }, data }) {
  return Promise.reject(new Error(status));
}

async function handleResponse(response) {
  const responseData = await response.json();

  if (response.ok) {
    return responseData;
  }

  return mountError({ response, data: responseData });
}

export async function get(route) {
  const response = await fetch(route, {
    headers,
    method: 'GET',
    mode: 'cors',
  });

  return handleResponse(response);
}

export default { get };

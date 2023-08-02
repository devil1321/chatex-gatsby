
const axios = require('axios');

exports.handler = async (event, context) => {
  const { path, httpMethod, queryStringParameters, body } = event;

  try {
    // Your backend API base URL
    const backendBaseUrl = 'https://chatex-14m2.onrender.com';

    console.log(`${backendBaseUrl}${path}`)
    console.log('incominc req',event)
    const response = await axios({
      method: httpMethod,
      url: `${backendBaseUrl}${path}`,
      headers: event.headers,
      params: queryStringParameters,
      data: body,
    });

    const { data, status, headers } = response;

    return {
      statusCode: status,
      headers,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
import axios from 'axios';

export async function fetchData() {
  try {
    const response = await axios.get('https://example.com');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

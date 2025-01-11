import axios from 'axios';

export async function getCountry(): Promise<any> {
  try {
    const response = await axios({
      method: 'get',
      url: `https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries.json`,
      headers: {}
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw { message: error.response?.data.error };
    } else {
      throw { message: error };
    }
  }
}
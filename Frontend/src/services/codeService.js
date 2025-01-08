import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export const executeCode = async (code, languageId, stdin = '') => {
  const response = await axios.post(`${API_BASE_URL}/execute`, {
    source_code: code,
    language_id: languageId,
    stdin,
  });
  return response.data;
};

export const getChallenges = async () => {
  const response = await axios.get(`${API_BASE_URL}/challenges`);
  return response.data;
};

export const getChallengeById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/challenges/${id}`);
  return response.data;
};

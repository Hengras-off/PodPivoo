import axios from 'axios';

const KINOBD_API_URL = 'https://kinobd.net/api/films';

/**
 * Получить Kinopoisk ID из IMDB ID используя KinoBD API
 * @param {string} imdbId - IMDB ID (например, "tt1234567")
 * @returns {Promise<string|null>} - Kinopoisk ID или null
 */
export const getKinopoiskIdFromIMDB = async (imdbId) => {
  if (!imdbId) return null;
  
  try {
    const response = await axios.get(`${KINOBD_API_URL}`, {
      params: {
        imdb_id: imdbId
      }
    });
    
    if (response.data && response.data.kp_id) {
      return response.data.kp_id;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching Kinopoisk ID:', error);
    return null;
  }
};

/**
 * Поиск фильма в KinoBD по названию и году
 * @param {string} title - Название фильма
 * @param {number} year - Год выпуска
 * @returns {Promise<string|null>} - Kinopoisk ID или null
 */
export const searchKinoBD = async (title, year) => {
  if (!title) return null;
  
  try {
    const response = await axios.get(`${KINOBD_API_URL}`, {
      params: {
        title: title,
        year: year
      }
    });
    
    if (response.data && Array.isArray(response.data) && response.data.length > 0) {
      return response.data[0].kp_id || null;
    }
    
    if (response.data && response.data.kp_id) {
      return response.data.kp_id;
    }
    
    return null;
  } catch (error) {
    console.error('Error searching KinoBD:', error);
    return null;
  }
};

/**
 * Получить информацию о фильме из KinoBD
 * @param {string} kinopoiskId - Kinopoisk ID
 * @returns {Promise<Object|null>} - Данные фильма или null
 */
export const getKinoBDMovieInfo = async (kinopoiskId) => {
  if (!kinopoiskId) return null;
  
  try {
    const response = await axios.get(`${KINOBD_API_URL}/${kinopoiskId}`);
    return response.data || null;
  } catch (error) {
    console.error('Error fetching KinoBD movie info:', error);
    return null;
  }
};

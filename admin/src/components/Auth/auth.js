import axios from 'axios';

export const fetchUser = async (username, password) => {
  try {
    // Запрос на вход пользователя
    const response = await axios.post(`${server}/auth/login`, {
      username,
      password,
    });

    // Получаем информацию о пользователе
    const userInfo = await axios.get(`${server}/auth/me`, {
      headers: { Authorization: `Bearer ${response.data.token}` }, // Если используете токены
    });
    return userInfo.data; // Возвращаем данные о пользователе
  } catch (error) {
    throw new Error('Ошибка входа'); // Обработка ошибок
  }
};
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:9090';

export const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    
    // 백엔드 연결 실패 시 친화적인 에러 메시지
    if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
      error.message = '백엔드 서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.';
    }
    
    return Promise.reject(error);
  }
);

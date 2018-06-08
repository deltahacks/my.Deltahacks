import api from '@/helpers/api';

export default {
  register(credentials) {
    return api().post('register', credentials);
  },
};

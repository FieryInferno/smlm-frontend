import http from '../http-common';
import {stringify} from 'query-string';

const getAll = (param) => http.get(`/member?${stringify(param)}`);
const register = (data) => http.post('/member', data);
const Service = {getAll, register};

export default Service;

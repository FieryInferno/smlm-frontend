import http from '../http-common';
import {stringify} from 'query-string';

const getAll = (param) => http.get(`/member?${stringify(param)}`);
const getAllParent = (param) => http.get(`/parent?${stringify(param)}`);
const register = (data) => http.post('/member', data);
const Service = {getAll, register, getAllParent};

export default Service;

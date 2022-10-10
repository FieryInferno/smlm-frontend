import http from '../http-common';
import {stringify} from 'query-string';

const getAll = (param) => http.get(`/member?${stringify(param)}`);
const Service = {getAll};

export default Service;

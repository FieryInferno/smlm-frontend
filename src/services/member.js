import http from '../http-common';
import {stringify} from 'query-string';
import {v4 as uuidv4} from 'uuid';
import {populateError} from '../helpers';

const member = JSON.parse(localStorage.getItem('member')) || [];

const getAll = (param) => {
  if (process.env.REACT_APP_WEBSTORAGE) {
    return {
      status: 'Success',
      message: 'Success',
      data: member || [],
    };
  } else {
    return http.get(`/member?${stringify(param)}`);
  }
};

const getChildAndBonus = async (element) => {
  try {
    const children = member.filter((member) => {
      return member.parent_id === element.id;
    });

    let bonus = 0;

    if (children) {
      bonus += children.length * 1;
      children.children = await hierarchy(children);

      children.forEach((child) => {
        bonus += child.children?.length * 0.5;
      });
    }

    return {children, bonus};
  } catch (error) {
    populateError(error);
  }
};

const hierarchy = async (data) => {
  try {
    if (Array.isArray(data)) {
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        const {bonus, children} = await getChildAndBonus(element);

        data[index] = {
          ...data[index],
          children,
          bonus,
        };
      }
    } else {
      const {bonus, children} = await getChildAndBonus(data);

      data = {
        ...data,
        children,
        bonus,
      };
    }

    return data;
  } catch (error) {
    populateError(error);
  }
};

const getAllParent = async (param) => {
  if (process.env.REACT_APP_WEBSTORAGE) {
    let data = member.filter((member) => member.parent_id === null);

    if (Array.isArray(data) && data.length) {
      data = await hierarchy(data);
    }

    return {
      status: 'Success',
      message: 'Success',
      data: data || [],
    };
  } else {
    return http.get(`/parent?${stringify(param)}`);
  }
};

const register = (data) => {
  if (process.env.REACT_APP_WEBSTORAGE) {
    member.push({
      ...data,
      id: uuidv4(),
    });

    localStorage.setItem('member', JSON.stringify(member));

    return {
      status: 'Success',
      message: 'Success',
      data: data || [],
    };
  } else {
    return http.post('/member', data);
  }
};

const get = (id) => {
  if (process.env.REACT_APP_WEBSTORAGE) {
    const index = member.findIndex((member) => member.id === id);
    const data = hierarchy(member[index]);

    return {
      status: 'Success',
      message: 'Success',
      data: data || [],
    };
  } else {
    return http.get(`/member/${id}`);
  }
};

const migrate = (data) => {
  if (process.env.REACT_APP_WEBSTORAGE) {
    const {id, parent_id: parentId} = data;
    const index = member.findIndex((member) => member.id === id);
    member[index].parent_id = parentId;

    localStorage.setItem('member', JSON.stringify(member));

    return {
      status: 'Success',
      message: 'Success',
      data: data || [],
    };
  } else {
    return http.post(`member/${data.id}/migrate`, data);
  }
};

const Service = {getAll, register, getAllParent, get, migrate};

export default Service;

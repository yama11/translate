import token from './token';

const baseURI = 'http://translate.sidewalkgroup.com/api.php?s=api/Index/call';

const post = (url, dataObj) => fetch(baseURI + url, {
  method: 'POST',
  body: JSON.stringify({
    ...dataObj,
    TOKEN: localStorage.token,
  }),
}).then((res) => {
  const data = res.json();

  return data;
}).then((res) => {
  if (res.TOKEN) {
    token.set(res.TOKEN);
  }

  if (res.errCode === 10003) {
    if (window.location.hash !== '#/login') {
      // localStorage.removeItem('userName');
      // localStorage.removeItem('token');
      // window.location.href = '/';
    }

    throw res;
  }

  if (res.errCode !== 200) {
    throw res;
  }

  return res;
});

export default {
  post,
};

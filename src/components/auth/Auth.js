const auth = (function Auth() {
  const server = "https://fast-meadow-99165.herokuapp.com";
  let jwt = "";

  return {
    async login(userInfo) {
      const options = {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/JSON'
        },
        body: JSON.stringify(userInfo),
      };

      await fetch(server + '/authenticate', options)
        .then(res => res.json())
        .then(json => {
          if (!json.auth_token) {
            throw new Error('Invalid credentials');
          } else {
            jwt = json.auth_token;
          }
        });
    },

    logout() {
      jwt = null;
    },

    async signUp(user) {
      const options = {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/JSON'
        },
        body: JSON.stringify(user),
      };

      await fetch(server + '/users', options)
        .then(res => res.json())
        .then(json => {
          if (!json.auth_token) {
            throw new Error();
          } else {
            jwt = json.auth_token;
          }
        });
    },

    isAuthenticated() {
      return !!jwt;
    },

    async get(path, ...params) {
      let url = `${server}${path}`.replace(/\/:/g, `${params.shift()}`);
      const options = {
        method: "GET",
        headers: {
          'Content-Type': 'application/JSON',
          'mode': 'cors',
          'Authorization': `Bearer ${jwt}`,
        }
      };

      let res = await fetch(url, options);
      let data = await res.json();
      return data;
    },

    async post(body, path, ...params) {
      let url = `${server}${path}`.replace(/\/:/g, `${params.shift()}`);
      const options = {
        method: "POST",
        headers: {
          'Content-Type': 'application/JSON',
          'mode': 'cors',
          'Authorization': `Bearer ${jwt}`,
        },
        body: JSON.stringify(body),
      };

      let res = await fetch(url, options);
      let data = await res.json();
      return data;
    },

    async delete(path, ...params) {
      let url = `${server}${path}`.replace(/\/:/g, `/${params.shift()}`);
      const options = {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/JSON',
          'mode': 'cors',
          'Authorization': `Bearer ${jwt}`,
        },
      };

      return await fetch(url, options);
    }
  }
})();

export default auth;
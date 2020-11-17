// eslint-disable-next-line import/prefer-default-export
export const parseRequestUrl = () => {
    const url = document.location.hash.toLowerCase();
    const request = url.split('/');
    console.log(url);
    return {
      resource: request[1],
      id: request[2],
      action: request[3],
    };
  };
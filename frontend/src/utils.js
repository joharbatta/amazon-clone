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

  export const rerender=async (component)=>{
    document.getElementById('main-container').innerHTML = await component.render();
  // this means not calling function but render fxn again load code again
     await component.after_render();
  }
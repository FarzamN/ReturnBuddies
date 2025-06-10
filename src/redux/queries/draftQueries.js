import instance from "../../utils/urls";

export const uploadReturnItems = (data, image, load) => {
  return async (dispatch) => {
    load(true);
    const url =
      "https://vertically-welcome-mongrel.ngrok-free.app/api/AddProductItem";
    const body = new FormData();
    //   itemsWithImages.forEach((item, index) => {
    //     body.append(`items[${index}][detail]`, item.detail);
    //     body.append(`items[${index}][oversized]`, item.oversized);
    //     body.append(`items[${index}][image]`, {
    //       uri: item.image.uri,
    //       type: item.image.type,
    //       name: item.image.name,
    //     });
    //   });
    //   image.forEach((item, index) => {
    //     body.append(`items[${index}][image]`, {
    //       uri: item.image.uri,
    //       type: item.image.type,
    //       name: item.image.name,
    //     });
    //   });

    body.append("items", JSON.stringify(data));
    image.forEach((item, index) => {
      body.append(`images`, {
        uri: item.uri,
        type: item.type,
        name: item.name,
      });
    });
    try {
      const response = await fetch(url, {
        method: "POST",
        body,
      });
      console.log(response);
      const result = await response.json();
      console.log({ response, result });
      load(false);
    } catch (error) {
      load(false);
      console.log(error);
    }
  };
};

export const getReturnItem = () => {
  return async (dispatch) => {
    const url =
      "http://vertically-welcome-mongrel.ngrok-free.app/api/getProductItems/683d71a8ca8de97f3f3ba7c7";
    try {
      const response = await fetch(url);
      const result = await response.json();
      console.log({ response, result });
      //   dispatch({ type: "GET_RETURN_ITEM", payload: result });
    } catch (error) {
      console.log(error);
    }
  };
};

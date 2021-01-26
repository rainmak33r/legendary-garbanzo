import axios from 'axios';

export const getRandomGiphy = (tag: string) => {
  return axios
    .get(
      `https://api.giphy.com/v1/gifs/random?tag=${tag}&rating=pg-13&api_key=EcxhTmDm16n2UnSZCyNhjCILLRqduULq`
    )
    .then(({ data }) => data)
    .then(({ data }) => ({
      embed_url: data.embed_url,
      image_height: data.image_height,
      image_width: data.image_width,
    }));
};

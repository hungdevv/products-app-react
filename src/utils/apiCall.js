import axios from 'axios';
import * as Config from '../constants/config';

export default function callApi(method="GET", src, data){
   return  axios({
    method,
    url: `${Config.API_URL}/${src}`,
    data
  })
    .catch(err => {
      console.log(err);
    });
}
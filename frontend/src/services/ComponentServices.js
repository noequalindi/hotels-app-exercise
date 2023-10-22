import AxiosInstance from './serviceConfig';

const ComponentServices = {
      getHotels: (name, stars, index) => {
            return AxiosInstance.get(`/hotels`, { params: { name: name, stars: stars.join(';'), p: index }} );
      }
}

export default ComponentServices;
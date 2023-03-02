export const phoneSpecApi = {
  search(axios, phone) {
    return axios({
      method: "get",
      url: `https://phone-specs-api.azharimm.dev/search=${phone}`,
    });
  },
  getBrands(axios) {
    return axios({
      method: "get",
      url: `https://phone-specs-api.azharimm.dev/brands`,
    });
  },
  getBrandPhones(axios, brandSlug) {
    return axios({
      method: "get",
      url: `https://phone-specs-api.azharimm.dev/brands/${brandSlug}`,
    });
  },
  getTopByFans(axios) {
    return axios({
      method: "get",
      url: `https://phone-specs-api.azharimm.dev/top-by-fans`,
    });
  },
  getPhoneDetails(axios, phoneSlug) {
    return axios({
      method: "get",
      url: `https://phone-specs-api.azharimm.dev/${phoneSlug}`,
    });
  },
};

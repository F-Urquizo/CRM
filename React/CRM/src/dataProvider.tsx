import { fetchUtils, DataProvider, RaRecord, Identifier, GetManyParams, GetManyReferenceParams, UpdateManyParams, DeleteManyParams } from "react-admin";
import { HttpError } from "react-admin";

const apiUrl = "http://localhost:3000"; // Your API URL
const httpClient = fetchUtils.fetchJson;

const dataProvider: DataProvider = {
  getList: async (resource, params) => {
    const response = await httpClient(`${apiUrl}/${resource}`);
    // Map _id to id
    const data = response.json.map((item: any) => ({
      ...item,
      id: item._id,
    }));
    return {
      data,
      total: response.json.length, 
    };
  },

  getOne: async (resource, params) => {
    const response = await httpClient(`${apiUrl}/${resource}/${params.id}`);
    return {
      data: {
        ...response.json,
        id: response.json._id,
      },
    };
  },

  update: async (resource, params) => {
    const response = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify(params.data),
    });
    return {
      data: {
        ...response.json,
        id: response.json._id,
      },
    };
  },
  
  create: async (resource, params) => {
    const response = await httpClient(`${apiUrl}/${resource}`, {
      method: 'POST',
      body: JSON.stringify(params.data),
    });
    return {
      data: {
        ...response.json,
        id: response.json._id,
      },
    };
  },



  delete: async (resource, params) => {
    const response = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
        method: 'DELETE',
      });
      return {
        data: {
          ...response.json,
          id: response.json._id,
        },
      };
  },

  getMany: async (resource, params: GetManyParams) => {
    const response = await httpClient(`${apiUrl}/${resource}?ids=${params.ids.join(',')}`);
    const data = response.json.map((item: any) => ({
      ...item,
      id: item._id,
    }));
    return {
      data,
    };
  },

  getManyReference: async (resource, params: GetManyReferenceParams) => {
    const response = await httpClient(`${apiUrl}/${resource}?${params.target}=${params.id}`);
    const data = response.json.map((item: any) => ({
      ...item,
      id: item._id,
    }));
    return {
      data,
      total: response.json.length,
    };
  },

  updateMany: async (resource, params: UpdateManyParams<RaRecord>) => {
    const response = await httpClient(`${apiUrl}/${resource}`, {
      method: 'PUT',
      body: JSON.stringify({ ids: params.ids, data: params.data }),
    });
    const data = response.json.map((item: any) => ({
      ...item,
      id: item._id,
    }));
    return { data };
  },

  deleteMany: async (resource, params: DeleteManyParams<RaRecord>) => {
    await httpClient(`${apiUrl}/${resource}`, {
      method: 'DELETE',
      body: JSON.stringify({ ids: params.ids }),
    });
    return { data: params.ids };
  },
};

export default dataProvider;

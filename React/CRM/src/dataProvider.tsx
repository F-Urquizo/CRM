import {
  fetchUtils,
  DataProvider,
  RaRecord,
  Identifier,
  GetManyParams,
  GetManyReferenceParams,
  UpdateManyParams,
  DeleteManyParams,
} from "react-admin";
import { HttpError } from "react-admin";

const apiUrl = "https://localhost:3000";
const httpClient = fetchUtils.fetchJson;

// Function to get headers with token
const getHeaders = () => {
  const token = localStorage.getItem("token"); // Change this as necessary for your app structure
  return new Headers({
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`, // Include the JWT token
  });
};

const dataProvider: DataProvider = {
  getList: async (resource, params) => {
    const url = new URL(`${apiUrl}/${resource}`);

    // If there are filters, add them to the URL
    if (params.filter) {
      Object.keys(params.filter).forEach((key) => {
        url.searchParams.append(key, params.filter[key]);
      });
    }

    const response = await httpClient(url.toString(), { headers: getHeaders() });

    const data = Array.isArray(response.json)
      ? response.json.map((item: any) => ({
          ...item,
          id: item._id,
        }))
      : [];

    return {
      data,
      total: Array.isArray(response.json) ? response.json.length : 0,
    };
  },

  getOne: async (resource, params) => {
    const response = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
      headers: getHeaders(),
    });
    return {
      data: {
        ...response.json,
        id: response.json._id,
      },
    };
  },

  update: async (resource, params) => {
    const response = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
      headers: getHeaders(),
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
      method: "POST",
      body: JSON.stringify(params.data),
      headers: getHeaders(),
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
      method: "DELETE",
      headers: getHeaders(),
    });
    return {
      data: {
        ...response.json,
      },
    };
  },

  getMany: async (resource, params: GetManyParams) => {
    const response = await httpClient(
      `${apiUrl}/${resource}?ids=${params.ids.join(",")}`,
      { headers: getHeaders() }
    );
  
    const data = response.json.map((item: any) => ({
      ...item,
      id: item._id,
    }));
    
    return {
      data,
    };
  },

  getManyReference: async (resource, params: GetManyReferenceParams) => {
    const response = await httpClient(
      `${apiUrl}/${resource}?${params.target}=${params.id}`,
      { headers: getHeaders() }
    );
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
      method: "PUT",
      body: JSON.stringify({ ids: params.ids, data: params.data }),
      headers: getHeaders(),
    });
    const data = response.json.map((item: any) => ({
      ...item,
      id: item._id,
    }));
    return { data };
  },

  deleteMany: async (resource, params: DeleteManyParams<RaRecord>) => {
    await httpClient(`${apiUrl}/${resource}`, {
      method: "DELETE",
      body: JSON.stringify({ ids: params.ids }),
      headers: getHeaders(),
    });
    return { data: params.ids };
  },
};

export default dataProvider;

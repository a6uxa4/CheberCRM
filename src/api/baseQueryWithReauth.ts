import { FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { removeUserFromStorage } from "../utils/helpers/auth.helpers";

export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_SERVER_URL,
  prepareHeaders(headers, { getState }: any) {
    const token = getState().auth.user?.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth = async (
  args: FetchArgs | string,
  api: any,
  extraOptions: any
) => {
  const result: any = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 403 || result?.response?.status === 403) {
    removeUserFromStorage();
  } else if (result?.error?.status === 401 || result?.response?.status) {
  }
  return result;
};

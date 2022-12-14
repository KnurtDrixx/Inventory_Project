import { IFetchOptions } from "../types";
export const TOKENKEY = "token";

export async function apiService<T = any>(uri: string, method: string = "GET", data?: any) {
  // retreive token from storage
  const TOKEN = localStorage.getItem(TOKENKEY);
  // prepare a headers object to build
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  // prepare out fetch options to build
  const fetchOptions: IFetchOptions = {
    method,
    headers,
    body: JSON.stringify(data),
  };

  // if the token is found, attach it to headers
  // using the Authorization Bearer scheme
  if (TOKEN) {
    headers["Authorization"] = `Bearer ${TOKEN}`;
  }

  // we don't need { 'Content-Type': 'application/json' }
  // and { body: JSON.stringify(data) }
  // on GET requests
  if (method === "GET") {
    delete headers["Content-Type"];
    delete fetchOptions.body;
  }

  try {
    // make that fetch like usual
    const res = await fetch(uri, fetchOptions);
    const data = await res.json();
    // custom error handling is useful when you're learning
    if (res.status === 400) {
      throw new Error("check fetch options for any errors");
    }

    if (res.status === 401) {
      throw new Error("no token, expired token, or server could not validate token");
    }

    if (res.status === 404) {
      throw new Error("the server endpoint path was not found");
    }

    if (res.status === 500) {
      throw new Error("server blew up, check the terminal logs");
    }

    // only attempt to parse the response json
    // if the fetch gets a good status code e.g. 200/201
    if (res.ok) {
      return <T>data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error("[error]", error.message);
    // some choices here:
    // throw error to chain up to the next catch block
    // use history object to push a navigate to error page
    throw error;
  }
}

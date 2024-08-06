const base_url = "https://dummyjson.com/";

/* 
endpoint: name of endpoint

success: callbackk
*/

export default async function handleRemoteRequest(
  endpoint,
  success,
  error,
  startLoading,
  stopLoading
) {
  startLoading();
  try {
    const res = await fetch(`${base_url}${endpoint}`);
    if (res.ok) {
      const data = await res.json();
      success(data);
      //return data;
    } else {
      throw new Error("something went wrong");
    }
  } catch (e) {
    console.log(e);
    error(e);
  } finally {
    if (stopLoading && typeof stopLoading === "function") stopLoading();
  }
}

async function getData(endpoint) {
  try {
    const res = await fetch(`https://dummyjson.com/${endpoint}`);
    if (res.ok) {
      return await res.json();
    } else {
      throw new Error("Something went Wrong");
    }
  } catch (err) {
    return err;
  }
}

/**
 * 
 * 
 ui-handlers: {
  startLoading: logic happen during request calling
  error: method take `err` handle err case in UI
  stopLoding: mthod be called wehn reuest in done (in finally block)

  requestsConfig: array of object {endpoint: styring, success: loaignc that happen ijn happey case }
 }


  */

export async function getManyRequsets(uihandlers, requestsConfig) {
  const { startLoading, error, stopLoading } = uihandlers;
  startLoading();
  try {
    const mappedRequests = requestsConfig.map((item, index) =>
      getData(item.endpoint)
    ); //[getData(e), ]
    //blcok
    const results = await Promise.all(mappedRequests);

    results.forEach((item, index) => {
      if (item instanceof Error) {
        throw new Error("Something went Wrong");
      }

      //
      requestsConfig[index].success(item);
    });

    return results;
  } catch (err) {
    error(err);
  } finally {
    stopLoading();
  }
}

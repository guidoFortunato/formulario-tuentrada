export const errorLogs = async (url, email, content, error) => {
  console.log({email, content, error})
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, content, error }),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

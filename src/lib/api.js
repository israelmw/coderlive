export const fetchApiData = async (route) => {
  try {
    const response = await fetch("https://blog.ted.com/wp-json/wp/v2/" + route);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
    return null;
  }
};

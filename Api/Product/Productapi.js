export const getProductByID = async (productID) => {
  try {
    const response = await fetch(
      `http://192.168.1.96:5000/product/${productID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch product data`);
    }

    const productData = await response.json();
    return productData;
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error; 
  }
};



export const searchBynameNdes = async (searchquery) => {
  try {
    const response = await fetch(
      `http://192.168.1.96:5000/search/${searchquery}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error searching for products:", error);
    throw error;
  }
};

// all product api
export const getproductalllist = async () => {
  try {
    const response = await fetch("http://192.168.1.96:5000/products", {
      method: "get",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching store data:", error);
    throw error;
  }
};

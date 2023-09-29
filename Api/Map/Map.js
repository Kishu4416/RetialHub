// Store API 
export const getstoreapi = async () => {
    try {
        const response = await fetch("http://192.168.1.96:5000/stores", {
            method: "get",
             headers: {
            'Content-type': 'application/json; charset=UTF-8',
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
  
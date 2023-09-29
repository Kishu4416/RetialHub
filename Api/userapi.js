import AsyncStorage from "@react-native-async-storage/async-storage";

// Register API
export const senddatatobackendregisterapi = async (data) => {
  let fetchregisterresult = await fetch("http://192.168.1.96:5000/register", {
    method: "POST",
    body: JSON.stringify({
      firstName: `${data.firstName}`,
      lastname: `${data.lastname}`,
      email: `${data.email}`,
      mobileNo: `${data.mobileNo}`,
      password: `${data.password}`,
      confirmPassword: `${data.confirmPassword}`,
      address: `${data.address}`,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const result = await fetchregisterresult.json();
  return result;
};

//To login Api

export const senddatatobackendLoginapi = async (data) => {
  const response = await fetch("http://192.168.1.96:5000/login", {
    method: "POST",
    body: JSON.stringify({
      email: `${data.email}`,
      password: `${data.password}`,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const resJson = await response.json();
  return resJson;
};

// get user By ID

export const userInfo = async () => {
  try {
    const userID = await AsyncStorage.getItem('id'); 

    if (!userID) {
      throw new Error('User ID not found in AsyncStorage'); 
    }

    const response = await fetch(`http://192.168.1.96:5000/user/${userID}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user data: ${response.statusText}`);
    }

    const resJson = await response.json();
    return resJson;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error; 
  }
};

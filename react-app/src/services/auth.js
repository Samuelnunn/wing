export const authenticate = async() => {
  const response = await fetch('/api/auth/',{
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return await response.json();
}

export const login = async (email, password) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });
  const awaitJson = await response.json();
  debugger
  return awaitJson
}

export const logout = async () => {
  const response = await fetch("/api/auth/logout", {
    headers: {
      "Content-Type": "application/json",
    }
  });
  return await response.json();
};


export const signUp = async (username, email, password, firstName, 
                             lastName, age, zipCode, bio, 
                             gender, profilePicture) => {
            
    const formData = new FormData();

    formData.append("username", username);
    formData.append("email", email);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("age", age);
    formData.append("zip_code", zipCode);
    formData.append("bio", bio);
    formData.append("gender_id", gender);
    formData.append("password", password);

    if (profilePicture) {
        formData.append("profile_photo_file", profilePicture)
    };

    const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: formData
    });
    return await response.json();
}
import axios from "axios";

class UsersService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.SERVER_URL || "http://localhost:5005",
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  

  // POST /api/users
 /*  createProject = (requestBody) => {
    return this.api.post("/api/users", requestBody);
  }; */

  // GET /api/users
  getAllUsers = () => {
    return this.api.get("/api/users");
  };

  // GET /api/users/:id
  getUser = (id) => {
    return this.api.get(`/api/users/${id}`);
  };

  // PUT /api/users/:id
 /*  updateProject = (id, requestBody) => {
    return this.api.put(`/api/projects/${id}`, requestBody);
  }; */

  // DELETE /api/projects/:id
/*   deleteProject = (id) => {
    return this.api.delete(`/api/projects/${id}`);
  }; */
}

// Create one instance (object) of the service
const usersService = new UsersService();

export default usersService;
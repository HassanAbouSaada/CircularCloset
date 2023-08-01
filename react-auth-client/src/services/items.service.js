import axios from "axios";

class ItemsService {
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

  // POST /api/items
  createItem = (requestBody) => {
    return this.api.post("/api/items", requestBody);
  };

  // GET /api/items/:id
  getItem = (id) => {
    return this.api.get(`/api/items/${id}`);
  };

  // PUT /api/items/:id
  updateItem = (id, requestBody) => {
    return this.api.put(`/api/items/${id}`, requestBody);
  };

  // DELETE /api/items/:id
  deleteItem = (id) => {
    return this.api.delete(`/api/items/${id}`);
  };
}

// Create one instance (object) of the service
const itemsService = new ItemsService();

export default itemsService;

import axios from "axios";

class ClosetService {
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

  // POST /api/closets
  createCloset = (requestBody) => {
    return this.api.post("/api/closets", requestBody);
  };

  // GET /api/closets
  getAllClosets = () => {
    return this.api.get("/api/closets");
  };

  // GET /api/closets
  getOneCloset = (closetId) => {
    return this.api.get("/api/closet/" + closetId);
  };
}

// Create one instance (object) of the service
const closetService = new ClosetService();

export default closetService;

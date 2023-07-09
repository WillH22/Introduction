const BASE_URL = "/";

class sendToServer {
  // Method to make a generic request to the server
  static async makeRequest(endpoint, data) {
    try {
      const response = await axios.post(`${BASE_URL}${endpoint}`, data);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  // Method to check a word by sending it to the server
  static async checkWord(word) {
    return await this.makeRequest("word", { word });
  }

  // Method to send the user score to the server
  static async sendUserScore(score) {
    return await this.makeRequest("score", { score });
  }
}

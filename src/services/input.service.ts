import axios from "axios";
import { InputValue } from "@/types/inputs";

class InputService {
  async getList() {
    const response = await axios.get<InputValue[]>(
      "https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete"
    );

    return response.data;
  }
}

export const inputService = new InputService();

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const instance = axios.create({
  baseURL: "https://content.guardianapis.com/",
  timeout: 1000,
});

export const searchKeywords = createAsyncThunk(
  "search",
  async ({ keyword, page = "1", size = "10" }) => {
    const response = await instance.get(
      `search?api-key=test&show-fields=thumbnail,headline&show-tags=keyword&q=${keyword}&page=${page}&page-size=${size}`
    );
    return { response: response.data.response, keyword };
  }
);

export const search = createSlice({
  name: "search",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
    keyword: "",
  },
  reducers: {
    onNavigateNext: (state, action) => {
      state.currentPage++;
    },
    onNavigatePrev: (state, action) => {
      state.currentPage--;
    },
    onNavigateCertainIndex: (state, action) => {
      console.log(action);
      state.currentPage = action.payload;
    },
    resetStore: () => {
      return { isLoading: false, data: null, isError: false, keyword: "" };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchKeywords.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(searchKeywords.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.data = action.payload.response;
      state.keyword = action.payload.keyword;
      state.currentPage = action.payload.response.currentPage;
    });
    builder.addCase(searchKeywords.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });
  },
});

// Action creators are generated for each case reducer function

export const {
  onNavigateNext,
  onNavigatePrev,
  resetStore,
  onNavigateCertainIndex,
} = search.actions;
export default search.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
  status: "idle",
  error: null,
  totalPages: 0,
  currentPage: 1,
  limit: 5,
};
export const fetchPets = createAsyncThunk(
  "pets/fetchPets",
  async ({ currentPage, limit, search }) => {
    try {
      const response = await fetch(
        `http://localhost:3300/api/pets?page=${currentPage}&limit=${limit}&search=${search}`
      );
      const data = await response.json();
      // console.log("Data  pet slice : ", data);
      return { pets: data.pets, totalPages: data.totalPages };
    } catch (error) {
      console.error("Error fetching pets:", error);
      throw error;
    }
  }
);

export const addPet = createAsyncThunk(
  "pets/addPet",
  async (newPet, { rejectWithValue }) => {
    // console.log("newPet", newPet);
    try {
      const response = await fetch(`http://localhost:3300/api/pets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPet),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updatePet = createAsyncThunk(
  "pets/updatePet",
  async (formData, { rejectWithValue }) => {
    console.log("petId: ", formData._id);
    try {
      const response = await fetch(
        `http://localhost:3300/api/pets/${formData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deletePet = createAsyncThunk(
  "pets/deletePet",
  async (petId, { rejectWithValue }) => {
    try {
      await fetch(`http://localhost:3300/api/pets/${petId}`, {
        method: "DELETE",
      });
      return petId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const petSlice = createSlice({
  name: "pets",
  initialState,
  // reducers: {
  //   addPetToList: (state, action) => {
  //     state.value.push(action.payload);
  //   },
  //   deletePet: (state, action) => {
  //     state.value = state.value.filter((pet) => pet._id !== action.payload);
  //   },
  // },
  extraReducers(builder) {
    builder
      .addCase(fetchPets.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPets.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.value = action.payload.pets;
        state.totalPages = action.payload.totalPages; // Update total pages
      })
      .addCase(fetchPets.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addPet.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addPet.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.value.push(action.payload.data);
      })
      .addCase(addPet.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updatePet.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updatePet.fulfilled, (state, action) => {
        state.loading = false;
        const updatedPet = action.payload.data;
        console.log('updated pet :', updatedPet);
        state.value = state.value.map((pet) =>
          pet._id === updatedPet._id
            ? { ...pet, ...updatedPet }
            : pet
        );
      })

      .addCase(updatePet.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deletePet.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deletePet.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.value = state.value.filter((pet) => pet._id !== action.payload);
      })
      .addCase(deletePet.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addPetToList } = petSlice.actions;

export default petSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pet, PetStats } from '@/types';

interface PetState {
  pets: Pet[];
  selectedPet: Pet | null;
  loading: boolean;
  error: string | null;
}

const initialState: PetState = {
  pets: [],
  selectedPet: null,
  loading: false,
  error: null,
};

const petSlice = createSlice({
  name: 'pets',
  initialState,
  reducers: {
    setPets: (state, action: PayloadAction<Pet[]>) => {
      state.pets = action.payload;
      state.loading = false;
      state.error = null;
    },
    addPet: (state, action: PayloadAction<Pet>) => {
      state.pets.push(action.payload);
    },
    selectPet: (state, action: PayloadAction<Pet>) => {
      state.selectedPet = action.payload;
    },
    updatePetStats: (state, action: PayloadAction<{ petId: string; stats: Partial<PetStats> }>) => {
      const pet = state.pets.find(p => p.id === action.payload.petId);
      if (pet) {
        pet.stats = { ...pet.stats, ...action.payload.stats };
      }
      if (state.selectedPet?.id === action.payload.petId) {
        state.selectedPet.stats = { ...state.selectedPet.stats, ...action.payload.stats };
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setPets, addPet, selectPet, updatePetStats, setLoading, setError } = petSlice.actions;
export default petSlice.reducer;

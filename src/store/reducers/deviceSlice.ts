import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { RootState } from "../index";

export type deviceType = {
  id?: string;
  code: string;
  name: string;
  username: string;
  password: string;
  type: string;
  ip: string;
  isActive: boolean;
  isConnect: boolean;
  services: string[];
};

export const addDevice = createAsyncThunk(
  "device/add",
  async (values: deviceType) => {
    const newDoc = doc(collection(db, "devices"));
    await setDoc(newDoc, values);
    const Ref = doc(db, "device", newDoc.id);
    const Snap = await getDoc(Ref);
    return Snap;
  }
);

interface Ifilter {
  active: boolean | null;
  connect: boolean | null;
  keywords: string;
}

export const getAll = createAsyncThunk(
  "device/getAll",
  async (filter?: Ifilter) => {
    let devices: deviceType[] = [];

    const query = await getDocs(collection(db, "devices"));
    query.forEach((value) => {
      devices.push({
        id: value.id,
        ...(value.data() as deviceType),
      });
    });
    if (filter) {
      if (filter.active != null)
        devices = devices.filter((device) => device.isActive == filter.active);
      if (filter.connect != null)
        devices = devices.filter(
          (device) => device.isConnect == filter.connect
        );
      if (filter.keywords != "")
        devices = devices.filter(
          (device) =>
            device.code.toLowerCase().includes(filter.keywords.toLowerCase()) ||
            device.name.toLowerCase().includes(filter.keywords.toLowerCase()) ||
            device.ip.toLowerCase().includes(filter.keywords.toLowerCase())
        );
    }
    devices.reverse();
    return devices;
  }
);

export const get = createAsyncThunk("device/get", async (id: string) => {
  let device: deviceType;

  const deviceRef = doc(db, "devices", id);
  const deviceSnap = await getDoc(deviceRef);
  device = {
    id,
    ...(deviceSnap.data() as deviceType),
  };
  return device;
});

export const update = createAsyncThunk(
  "device/update",
  async ({ id, ...value }: deviceType) => {
    const ref = doc(db, "devices", id as string);
    await updateDoc(ref, { ...value });
  }
);

interface defaultState {
  loading: boolean;
  device: deviceType | null;
  devices: deviceType[];
  message: {
    fail: boolean;
    text: string | undefined;
  };
}

const initialState: defaultState = {
  loading: false,
  device: null,
  devices: [],
  message: {
    fail: false,
    text: "",
  },
};

const deviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addDevice.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addDevice.fulfilled, (state, action) => {
      if (action.payload.exists()) {
        state.message.fail = false;
        state.message.text = "Thêm thành công";
      } else {
        state.message.fail = true;
        state.message.text = "Đã xảy ra lỗi !";
      }
      state.loading = false;
    });
    builder.addCase(addDevice.rejected, (state, action) => {
      state.message.fail = true;
      state.message.text = action.error.message;
      state.loading = false;
    });

    builder.addCase(getAll.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAll.fulfilled, (state, action) => {
      if (action.payload) {
        state.devices = action.payload;
        state.message.fail = false;
        state.message.text = "";
      } else {
        state.message.fail = true;
        state.message.text = "Đã xảy ra lỗi !";
      }
      state.loading = false;
    });
    builder.addCase(getAll.rejected, (state, action) => {
      state.message.fail = true;
      state.message.text = action.error.message;
      state.loading = false;
    });

    builder.addCase(get.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(get.fulfilled, (state, action) => {
      if (action.payload) {
        state.device = action.payload;
        state.message.fail = false;
        state.message.text = "";
      } else {
        state.message.fail = true;
        state.message.text = "Đã xảy ra lỗi !";
      }
      state.loading = false;
    });
    builder.addCase(get.rejected, (state, action) => {
      state.message.fail = true;
      state.message.text = action.error.message;
      state.loading = false;
    });

    builder.addCase(update.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(update.fulfilled, (state, action) => {
      state.message.fail = false;
      state.message.text = "Cập nhật thành công";
      state.loading = false;
    });
    builder.addCase(update.rejected, (state, action) => {
      state.message.fail = true;
      state.message.text = action.error.message;
      state.loading = false;
    });
  },
});

const deviceReducer = deviceSlice.reducer;

export const deviceSelector = (state: RootState) => state.deviceReducer;

export const {} = deviceSlice.actions;

export default deviceReducer;

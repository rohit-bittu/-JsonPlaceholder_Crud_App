import React from 'react'

import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./Features/postSlice";

export const store = configureStore({
    reducer: {
       

        app: postSlice

    },

});
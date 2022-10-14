import * as toolkitRaw from "@reduxjs/toolkit"
import PerpustakaanSlice from "../action/actions"

const { configureStore } = toolkitRaw

export default configureStore({
    reducer : {
        perpustakaan : PerpustakaanSlice
    }
})
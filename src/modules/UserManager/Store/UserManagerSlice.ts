import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthUserDataInterface = {
	id: string,
	name: string,
	email: string,
	emailVerified: Date,
	userVerified: boolean
}

type AuthUserAuthorizationData = {
	roles: string[],
	permissions: string[],
}

export type UserManagerSliceDataInterface = {
	isLoggedIn?: boolean;
	authUser?: AuthUserDataInterface | null,
	authorization: AuthUserAuthorizationData
};


const authUserData: AuthUserDataInterface = {
	id: '1234567',
	name: 'S R Hasan',
	email: 'srhasan@gmail.com',
	emailVerified: new Date,
	userVerified: true
}

const initialState = {
	isLoggedIn: false,
	authUser: null,
	authorization: {
		roles: [],
		permissions: []
	}
} as UserManagerSliceDataInterface;

export const UserManagerSlice = createSlice({
	name: "userManagerSlice",
	initialState: initialState,
	reducers: {
		setAuthUserData: (state, action) => {
			state.isLoggedIn = action?.payload?.isLoggedIn || true;
			state.authUser = action?.payload?.authUser || null
		},

		setAuthUserAuthorizationData: (state, action) => {
			state.authorization.roles = action?.payload?.authorization.roles || [];
			state.authorization.permissions = action?.payload?.authorization.permissions || [];
		},
	},
});

export const {
	setAuthUserData,
	setAuthUserAuthorizationData
} = UserManagerSlice.actions;

export default UserManagerSlice.reducer;

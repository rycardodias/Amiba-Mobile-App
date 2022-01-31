// import LoadingScreen from "../components/LoadingScreen";
import { createContext, useEffect, useReducer } from "react";
import { Text } from "react-native";
import * as usersRequests from '../lib/requests/usersRequests'

const initialState = {
    isAuthenticated: false,
    isInitialized: false,
    user: null
};

const reducer = (state, action) => {
    switch (action.type) {
        case "INIT":
            {
                return {
                    isInitialized: true,
                    user: action.payload.user,
                    isAuthenticated: action.payload.isAuthenticated
                };
            }

        case "LOGIN":
            {
                return {
                    ...state,
                    isAuthenticated: true,
                    user: action.payload.user
                };
            }

        case "LOGOUT":
            {
                return {
                    ...state,
                    user: null,
                    isAuthenticated: false
                };
            }

        default:
            {
                return state;
            }
    }
};

const AuthContext = createContext({
    ...initialState, method: "JWT",
    login: (email, password) => Promise.resolve(),
    logout: () => { },
});

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const login = async (email, password) => {
        const response = await usersRequests.login(email, password)
        if (response.error || response.data.error) {
            return response
        }

        const info = await usersRequests.getUserByToken()

        dispatch({
            type: "LOGIN",
            payload: {
                user: info.data.data
            }
        });
        return response
    };

    const logout = async () => {
        await usersRequests.logout()
        dispatch({
            type: "LOGOUT"
        });
    };

    useEffect(() => {
        (async () => {
            try {
                const validToken = await usersRequests.validateToken()
                // console.log('validToken', validToken);
                if (validToken.data.data) {
                    const response = await usersRequests.getUserByToken() //@ts-ignore
                    dispatch({
                        type: "INIT",
                        payload: {
                            user: response.data.data,
                            isAuthenticated: true
                        }
                    });
                } else {
                    dispatch({
                        type: "INIT",
                        payload: {
                            user: null,
                            isAuthenticated: false
                        }
                    });
                }
            } catch (err) {
                console.error(err);
                dispatch({
                    type: "INIT",
                    payload: {
                        user: null,
                        isAuthenticated: false
                    }
                });
            }
        })();
    }, []);

    if (!state.isInitialized) {
        // return <LoadingScreen />;
        return <Text>em espera</Text>
    }
    // console.log("chegou", state);
    return <AuthContext.Provider value={{ ...state, method: "JWT", login, logout }}>
        {children}
    </AuthContext.Provider>;
};
export default AuthContext;
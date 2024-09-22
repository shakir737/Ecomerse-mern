
import { api } from "../api";
import { userLoggedIn, userRegistration } from "./authSlice";


 export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        registration: builder.mutation({
            query: (data) => ({
                url: "user/register",
                method: "POST",
                body: data,
               
            }),
            async onQueryStarted(arg, {queryFulfilled,dispatch}){
                try{
                    const result = await queryFulfilled;
                    dispatch(
                             userRegistration(
                                result.data.activationToken
                             )
                    )
                } catch (error) {
                    console.log("")
                }
            }
        }),
           activation: builder.mutation({
            query: ({activation_token, activation_code}) => ({
                url: "activation_user",
                method: "POST",
                body:{
                    activation_token,
                    activation_code
                },
            }),
           }),
           login: builder.mutation({
            query: (data) => ({
                url: "user/login",
                method: "POST",
                body:data,
                credentials: "include" ,
            }),
            async onQueryStarted(args, {queryFulfilled,dispatch}){
                try{
                    const result = await queryFulfilled;
                    console.log(result); 
                    dispatch(
                             userLoggedIn(
                                 result.data.token
                             )
                    )
                   
                } catch (error) {
                    console.log("error")
                }
            }
           }),

    }),
 });

 export const {useRegistrationMutation, useActivationMutation, useLoginMutation} = authApi;

import { api } from "../api";
import { userList } from "./userSlice";


 export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        usersList: builder.mutation({
            query: () => ({
                url: "user/all-users",
                method: "GET", 
        }),
            async onQueryStarted(arg, {queryFulfilled,dispatch}){
                try{
                    const result = await queryFulfilled;
                    dispatch(
                             userList(
                                result.data
                             )
                    )
                } catch (error) {
                    console.log("")
                }
            },
            getCountries: builder.query({
                query: () => "Countries",
                
              }),
        }),
         

    }),
 });

 export const {useUsersListMutation} = userApi;
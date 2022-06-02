Use: npm run dev
This will run the project



////// How to do an api call
import api from '../../api_hander/handler';




    let data = {
        ...{ auth: localStorage.getItem("token") },// if an auth is required
        ...BODYDATA//if you need to send body data
      };
    await api.handler
        .api_post(data, `ROUTE`)
        .then(async(response) => {
            if (response.success) {//success
               
            } else {//failed, though handled by server backend with custom fail response 
         console.log("handled error",response) 
            }
        })
        .catch(async(e) => {//failure not handled by custom backend function 
            console.log("Unhandled Error: ", e)
        });
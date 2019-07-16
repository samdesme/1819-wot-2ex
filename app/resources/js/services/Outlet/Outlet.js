import axios from 'axios';


class Outlet {
  
    

    async outletRequest(tokenRes, state) {

        return axios.request({
            baseURL: `https://eu-wap.tplinkcloud.com/?token=` + tokenRes + `&appName=Kasa_Android&termID=5CD852A5-125F-40E1-8D4A-B89B1A0E1F74&appVer=1.4.4.607&ospf=Android+6.0.1&netType=wifi&locale=
            en_US`,
            method: 'post',
            headers:{
                "Content-Type": "application/json",
               /*  "User-Agent": "Dalvik/2.1.0 (Linux; U; Android 6.0.1; XXPhoneModelXX)",
                "Connection": "Keep-Alive",
                "Host": "eu-wap.tplinkcloud.com" */
            },
            data: {
                "method":"passthrough",
                "params":{
                "deviceId":"80068F6F641D26B981D9F0BDBF83C83E1B87AD5E",
                "requestData":"{\"system\":{\"set_relay_state\":{\"state\":" + state + "}}}"
                }
            }
          });

    }

    async getToken() {

        let authEmail = "desmedtsam96@gmail.com";
        let authPass = "Yusamy123!";


        return axios.request({
            baseURL: 'https://wap.tplinkcloud.com',
            method: 'post',
            data: {
                    "method": "login",
                    "params": {
                    "appType": "Kasa_Android",
                    "cloudUserName": authEmail,
                    "cloudPassword": authPass,
                    "terminalUUID": "2adb9a64-3371-47e8-b1aa-cb78abb0d301"
                    }
            },
        })
       

    }

    async outletState(tokenRes) {

        return axios.request({
            baseURL: `https://eu-wap.tplinkcloud.com/?token=` + tokenRes,
            method: 'post',
            data: {
                "method": "passthrough",
                "params": {
                "deviceId": "80068F6F641D26B981D9F0BDBF83C83E1B87AD5E",
                "requestData": "{\"system\":{\"get_sysinfo\":null}}"
                }
            }
          });

    }

}

export default new Outlet();
import axios from 'axios';
import React, { useState } from 'react'

export default function Test() {

    const APIKEY = "7tE4l7%2BP2KhME22BOHYDV48d6%2F05Gbu4fkBxpNPmVnppo9A7PJ8rfmWpRIKNFnUTV6EWtnP8fOVDF795f8TukQ%3D%3D"

    const [ServiceKey, setServiceKey] = useState(APIKEY);
    const [sgId, setSgId] = useState("20240410");
    const [sgTypecode, setSgTypecode] = useState("2")
    const [response, setResponse] = useState('');

    const fetchRegistrationStatus = async () => {
      const url = 'http://apis.data.go.kr/9760000/PofelcddInfoInqireService/getPoelpcddRegistSttusInfoInqire';
      try {
        const { data } = await axios.get(url, {
          params: {
            serviceKey: ServiceKey,
            sgId : "20240410",
            sgTypecode : "2",
            pageNo: "1",
            numOfRows: "10"
          }
        });
        setResponse(JSON.parse(JSON.stringify(data)));
        console.log(data)
        console.log(response)
      } catch (error) {
       console.log("Error", error)
      }
    };

    fetchRegistrationStatus()
  
  return (
    <div>Test</div>
  )
}




<response
>
<header
>
<resultCode
>
INFO-03
</resultCode
>
<resultMsg
>
데이터 정보가 없습니다. 입력 파라미터값을 확인해주시기 바랍니다.
</resultMsg
>
</header>
</response>
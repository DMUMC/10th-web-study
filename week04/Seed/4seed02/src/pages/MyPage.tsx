import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth.ts";
import { ResponseMyInfoDto } from "../types/auth.ts";


const MyPage = () => {
    const [data, setData] = useState<ResponseMyInfoDto>([]);
    ///useEffect를 빈 디펜던시를 사용 => 왜?...이제 알거라고 하셨는데 아직 모르겠슴.ㅠㅠ
    useEffect(() => {
        const getData = async () => {
            const response = await getMyInfo();
            console.log(response);

            setData(response);
        }

        getData();
    }, []);
    console.log(data.data.name);
    return (
        <div>
            {data.data.name}
        </div>
    )
}
//여기서 이거 뭐 커스텀 패치 활용해보라심

export default MyPage;
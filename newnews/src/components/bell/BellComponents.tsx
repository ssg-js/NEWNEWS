import { IoEarth } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import useBellDelete  from "@/hooks/bell/useBellDelete";
import { LoginState } from "@/states/LoginState";
import { useRecoilValue } from "recoil";
import styles from "@/styles/bell/BellComponents.module.scss";


interface Iprops{
    children : string,
    preNewsId: number,
    newsId: number | null | undefined,
}

export const BellComponents = ({ children, preNewsId, newsId } : Iprops) =>{
    const navigate = useNavigate()
    const BellDelete = useBellDelete()
    const isLogin = useRecoilValue(LoginState)
    const isLog = isLogin[0].id
    const preNews = preNewsId

    const onClickDeleteBell = () => {
        console.log(BellDelete.mutate({ userId: isLog, newsId : preNews}))
    }

    const onClickRead = () => {
        navigate('/detail', { state: { newsId: newsId, preNewsId: preNewsId }})
    }

    return (
        <div className={styles.bellGrid} onClick={() =>{ onClickRead() }}>
            <IoEarth className={styles.icons}/>
            <h4> 지난번에 보신 <span>{children}</span> 에 대한 연관된 뉴스가 있습니다</h4>
        </div>
    )
}
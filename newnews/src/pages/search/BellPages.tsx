import { Button } from "../../components/Button"
import styles from "../../styles/BellPages.module.scss"
import { BellHeader } from "../../components/BellHeader";

export function BellPages(){

    const body = document.querySelector('body')
    function onAllDelete(e:any) {
        console.log(e)
    }

    function onReadDelete(e:any) {
        console.log(e)
    }

    function onAllRead(e:any) {
        console.log(e)
    }
    
    return (
        <section>
            <BellHeader />
            <br />
            <div className={styles.buttonGrid}>
                <Button children={"전체 알림 삭제"} onClick={() => onAllDelete}/>
                <Button children={"읽은 알림 삭제"} onClick={() => onReadDelete}/>
                <Button children={"전체 읽음 처리"} onClick={() => onAllRead}/>
            </div>
            <br />
            <div>
                {/* 여기에 알림뜨게 하기 없으면 빈페이지 보여주기 */}
            </div>
        </section>
    )
}
import styles from "./Text.module.scss"
interface TextProps {
    content?: string | null | React.ReactNode
    type: "h5" | "h3" | "p" | "h1" | "h2"
    style?: React.CSSProperties
    isLoading?: boolean
}

const Text: React.FC<TextProps> = ({
    content,
    type,
    style,
    isLoading
}) => {
    switch (type) {
        case "p":
            return (
                isLoading ?
                    <p className={`${styles.p}`} style={style}>
                        <div className={`${"column"} ${"md-row-gap"}`}>
                            <div className={`${"loading-gradient"} ${"sm-rounded"}`} style={{ width: "100%", height: "20px"}}></div>
                            <div className={`${"loading-gradient"} ${"sm-rounded"}`} style={{ width: "70%", height: "20px"}}></div>
                            <div className={`${"loading-gradient"} ${"sm-rounded"}`} style={{ width: "40%", height: "20px"}}></div>
                        </div>
                    </p>
                    :    
                    <p style={style}>
                        {content && content}
                    </p>
                
            )
            
        case "h1":
            return (
                isLoading ?
                    <h1 className={`${styles.h1}`} style={style}>
                        <div className={`${"loading-gradient"} ${"sm-rounded"}`}></div>
                    </h1>
                    :    
                    <h1 style={style}>
                        {content && content}
                    </h1>
                    
            )

        case "h2":
            return (
                isLoading ?
                    <h2 className={`${"styled-title"} ${styles.h2}`} style={style}>
                        <div className={`${"loading-gradient"} ${"sm-rounded"}`}></div>
                    </h2>
                    :    
                    <h2 className={`${"styled-title"}`} style={style}>
                        {content && content}
                    </h2>

                    
            )            
            
        case "h3":
            return (
                isLoading ?
                    <h3 className={`${styles.h3}`} style={style}>
                        <div className={`${"loading-gradient"} ${"sm-rounded"}`}></div>
                    </h3>
                    :    
                    <h3 style={style}>
                        {content && content}
                    </h3>
            )  
        case "h5":
            return (
                isLoading ?
                    <h5 className={`${styles.h5}`} style={style}>
                        <div className={`${"loading-gradient"} ${"sm-rounded"}`}></div>
                    </h5>
                    :    
                    <h5 style={style}>
                        {content && content}
                    </h5>
            )
    }
}
export default Text;
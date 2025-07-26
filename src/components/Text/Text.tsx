import clsx from "clsx"
import styles from "./Text.module.scss"
interface TextProps {
    content?: string | null | React.ReactNode
    type: "h5" | "h3" | "p" | "h1" | "h2"
    style?: React.CSSProperties
    classes?: string
    isLoading?: boolean
}

const Text: React.FC<TextProps> = ({
    content,
    type,
    style,
    classes, 
    isLoading
}) => {
    switch (type) {
        case "p":
            return (
                isLoading ?
                    <p className={`${styles.p} ${"column"} ${"md-row-gap"} ${clsx(classes)}`} style={style}>
                        <span className={`${"loading-gradient"} ${"sm-rounded"}`} style={{ width: "100%", height: "20px"}}></span>
                        <span className={`${"loading-gradient"} ${"sm-rounded"}`} style={{ width: "70%", height: "20px"}}></span>
                        <span className={`${"loading-gradient"} ${"sm-rounded"}`} style={{ width: "40%", height: "20px"}}></span>
                    </p>
                    :    
                    <p className={`${styles.p} ${clsx(classes)}`} style={style}>
                        {content && content}
                    </p>
                
            )
            
        case "h1":
            return (
                isLoading ?
                    <h1 className={`${styles.h1} ${clsx(classes)}`} style={style}>
                        <span className={`${"loading-gradient"} ${"sm-rounded"}`}></span>
                    </h1>
                    :    
                    <h1 className={`${clsx(classes)}`} style={style}>
                        {content && content}
                    </h1>
                    
            )

        case "h2":
            return (
                isLoading ?
                    <h2 className={`${"styled-title"} ${styles.h2} ${clsx(classes)}`} style={style}>
                        <span className={`${"loading-gradient"} ${"sm-rounded"}`}></span>
                    </h2>
                    :    
                    <h2 className={`${"styled-title"} ${clsx(classes)}`} style={style}>
                        {content && content}
                    </h2>

                    
            )            
            
        case "h3":
            return (
                isLoading ?
                    <h3 className={`${styles.h3} ${clsx(classes)}`} style={style}>
                        <span className={`${"loading-gradient"} ${"sm-rounded"}`}></span>
                    </h3>
                    :    
                    <h3 style={style} className={`${clsx(classes)}`}>
                        {content && content}
                    </h3>
            )  
        case "h5":
            return (
                isLoading ?
                    <h5 className={`${styles.h5} ${clsx(classes)}`} style={style}>
                        <span className={`${"loading-gradient"} ${"sm-rounded"}`}></span>
                    </h5>
                    :    
                    <h5 style={style} className={`${clsx(classes)}`}>
                        {content && content}
                    </h5>
            )
    }
}
export default Text;
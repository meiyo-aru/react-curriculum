import clsx from "clsx"
import styles from "./Text.module.scss"
interface TextProps {
    content?: string | null | React.ReactNode // optional, can be string, null or React node
    type: "h5" | "h3" | "p" | "h1" | "h2" // type of text element
    style?: React.CSSProperties // optional, additional inline styles
    classes?: string // optional, additional classes to add
    isLoading?: boolean // optional, if true shows loading state
}

const Text: React.FC<TextProps> = ({
    content,
    type,
    style,
    classes, 
    isLoading
}) => {
    // Render based on type
    switch (type) {
        case "p":
            return (
                // paragraph with loading state
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
                // h1 with loading state
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
                // h2 with loading state
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
                // h3 with loading state
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
                // h5 with loading state
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
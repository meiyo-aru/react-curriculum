interface ParagraphProps {
    content?: string | null
    isLoading?: boolean
}

const Paragraph: React.FC<ParagraphProps> = ({
    content,
    isLoading
}) => {
    return (
        <p>
            {isLoading ?
                <div className={`${'column'} ${'md-row-gap'}`}>
                    <div className={`${'loading-gradient'} ${'sm-rounded'}`} style={{ width: '100%', height: '20px'}}></div>
                    <div className={`${'loading-gradient'} ${'sm-rounded'}`} style={{ width: '60%', height: '20px'}}></div>
                    <div className={`${'loading-gradient'} ${'sm-rounded'}`} style={{ width: '40%', height: '20px'}}></div>
                </div>
                :    
                content && content
            }
        </p>
    )
}
export default Paragraph;
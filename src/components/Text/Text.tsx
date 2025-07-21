interface TextProps {
    content?: string | null | React.ReactNode
    type: 'h5' | 'h3' | 'p' | 'h1' | 'h2'
    isLoading?: boolean
}

const Text: React.FC<TextProps> = ({
    content,
    type,
    isLoading
}) => {
    switch (type) {
        case 'p':
            return (
                <p>
                    {isLoading ?
                        <div className={`${'column'} ${'md-row-gap'}`}>
                            <div className={`${'loading-gradient'} ${'sm-rounded'}`} style={{ width: '100%', height: '20px'}}></div>
                            <div className={`${'loading-gradient'} ${'sm-rounded'}`} style={{ width: '70%', height: '20px'}}></div>
                            <div className={`${'loading-gradient'} ${'sm-rounded'}`} style={{ width: '40%', height: '20px'}}></div>
                        </div>
                        :    
                        content && content
                    }
                </p>
            )
            
        case 'h1':
            return (
                <h1>
                    {isLoading ?
                        <div className={`${'loading-gradient'} ${'sm-rounded'}`} style={{ width: '100%', height: '45px'}}></div>
                        :    
                        content && content
                    }
                </h1>
            )

        case 'h2':
            return (
                <h2 className="styled-title">
                    {isLoading ?
                        <div className={`${'loading-gradient'} ${'sm-rounded'}`} style={{ width: '70%', height: '35px'}}></div>
                        :    
                        content && content
                    }
                </h2>
            )            
            
        case 'h3':
            return (
                <h3>
                    {isLoading ?
                        <div className={`${'loading-gradient'} ${'sm-rounded'}`} style={{ width: '70%', height: '25px'}}></div>
                        :    
                        content && content
                    }
                </h3>
            )  
    }
}
export default Text;
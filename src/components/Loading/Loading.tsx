import Card from "../Card/Card"
import Text from "../Text/Text"

interface LoadingProps {
    title?: string
}
const Loading: React.FC<LoadingProps> = ({
    title
}) => {

return (
    <Card title={title} isLoading={true} boxShadow={true} content={
        <Card boxShadow={true} isLoading={true} type="card" content={
            <div className="column sm-row-gap">
                <div className="row flex md-column-gap md-row-gap">
                    <Text type="h3" isLoading={true}></Text>
                    <Card type="smCard" isLoading={true} cardClasses="bg-light-blue"></Card>
                    <Card type="smCard" isLoading={true} cardClasses="bg-green"></Card>
                </div>
                <Card isLoading={true} type="card" cardClasses="bg-light-grey center" content={
                    <div className="column sm-row-gap">
                        <div className="row flex">
                            <Text type="h5" isLoading={true} style={{flexGrow: "1"}}></Text>
                            <Text type="h5" isLoading={true} style={{flexGrow: "1"}}></Text>
                        </div>
                            <div className="row flex">
                            <Text type="h5" isLoading={true} style={{flexGrow: "1"}}></Text>
                            <Text type="h5" isLoading={true} style={{flexGrow: "1"}}></Text>
                        </div>
                    </div>
                }></Card>
            </div>
        }></Card>
    }></Card>
)
}
export default Loading
import { useEffect, useRef, useState } from 'react'
import SeeMore from '../../features/SeeMore/SeeMore'
import Card from '../Card/Card'
import type { AcademicTraining } from '../../types/AcademicTraining.ts'
import type { Experience } from '../../types/Experience.ts'
import type { Project } from '../../types/Project.ts'
import Text from '../Text/Text'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../store'
import { setSeeMoreClicked } from '../../features/SeeMore/SeeMoreSlice.ts'

import style from "./Item.module.scss"
import { MarkGithubIcon } from '@primer/octicons-react'
import type { ExtracurricularCourses } from '../../types/ExtracurricularCourses.ts'
import ShowMoreButton from '../../features/ShowMoreButton/ShowMoreButton.tsx'
import { setShowMoreClicked } from '../../features/ShowMoreButton/ShowMoreButtonSlice.ts'

interface ItemProps {
    items: AcademicTraining[] | Experience[] | Project[] | ExtracurricularCourses[] | undefined // array of items to be displayed
    componentId: string // unique identifier for the component, used for SeeMore and ShowMore buttons
    isLoading?: boolean // indicates if the data is still loading
}

const Item: React.FC<ItemProps> = ({ 
    items,
    componentId,
    isLoading
}) => {


    const [hoveredItemId, setHoveredItemId] = useState<number | null>(null) // to control if the mouse is over some item, to active SeeMore button
    const maxItems = 2 // maximum of itens to show before SeeMore button its clicked

    const expansiveContainersRef = useRef<HTMLDivElement[]>([])

    // function to set refs for all expansive containers, to control their max-height when SeeMore button is clicked
    const setExpansiveContainersRef = (element: HTMLDivElement) => {
        if (element)
            expansiveContainersRef.current.push(element)
    }

    // handlers to control which item is being hovered, its important to logic of SeeMore button
    const handleMouseEnter = (itemId:number) => {
        setHoveredItemId(itemId)
    }
    const handleMouseLeave = () => {
        setHoveredItemId(null)
    }
    
    const SeeMoreState = useSelector((state: RootState) => state.SeeMore) // global state to control which SeeMore is active
    const ShowMoreState = useSelector((state: RootState) => state.ShowMore) // global state to control which ShowMore is active
    const dispatch = useDispatch();

    // when seeMore button is clicked, adjust the max-height of the expansive containers based on <p> child content
    useEffect(() => {
        if(expansiveContainersRef.current) {
            expansiveContainersRef.current.forEach((container) => {
                const paragraph = container.querySelector('p');
                if (paragraph) {
                    container.style.maxHeight = container.classList.contains('active') ? `${paragraph.scrollHeight + 20}px` : '0px';
                }
            });
        }
    }, [SeeMoreState])

    if(!isLoading && items) {
        return(
            <Card title={componentId} boxShadow={true} isLoading={isLoading} onMouseLeave={() => handleMouseLeave()} content={
                <div className="column sm-row-gap">
                    {items?.map((item, index)=>(
                        // Render only the first 'maxItems' items unless ShowMore is active for this component
                        (index < maxItems || ShowMoreState.componentId === componentId) && 
                            <Card key={item.id} isLoading={isLoading} boxShadow={true} onMouseEnter={() => handleMouseEnter(item.id)} type="card" content={
                                <div className="column sm-row-gap">
                                    <div className="row flex sm-column-gap sm-row-gap space-between">
                                         {/* Title and tags/status */}
                                        <span className='row flex lg-column-gap sm-row-gap'>
                                            <Text type="h3" isLoading={isLoading} content={item.name}></Text>
                                            <span className="row flex sm-row-gap sm-column-gap">
                                                {'institution' in item ?
                                                    <>
                                                        <Card type="smCard" isLoading={isLoading} classes={`${'bg-grey'} ${"sm-rounded"}`} title={ item.level }></Card>
                                                        {'start_date' in item && 'end_date' in item && 
                                                            <Card type="smCard" isLoading={isLoading} classes={`${item.end_date ? "bg-green" : "bg-orange" } ${"sm-rounded"}`} title={ item.end_date ? "Completo" : "Cursando" }></Card>
                                                        }
                                                    </>
                                                    :
                                                    'enterprise' in item ?
                                                        <>
                                                            <Card type="smCard" isLoading={isLoading} classes={`${ 'bg-grey' } ${"sm-rounded"}`} title={ item.position }></Card>
                                                            {!item.end_date &&
                                                                <Card type="smCard" isLoading={isLoading} classes={`${ 'bg-green' } ${"sm-rounded"}`} title={ "Empregado aqui" }></Card>
                                                            }
                                                        </>
                                                        :
                                                        'github' in item &&
                                                            <Card type="smCard" isLoading={isLoading} classes={`${ !item.end_date ? 'bg-orange' : 'bg-green' } ${"sm-rounded"}`} title={ !item.end_date ? "Em desenvolvimento" : "Completo" }></Card>                                                    
                                                }
                                            </span>
                                        </span>
                                        {/* Github button */}
                                        {'github' in item &&
                                            <a href={item.github ? item.github : undefined} title={`${item.github ? "Clique para ser redirecionado para o Github do projeto" : "Github atualmente indisponível para esse projeto"}`}>
                                                <Card type='smCard' isLoading={isLoading} classes={`${item.github ? 'btn-github' : 'btn-inactive'} xl-rounded`} title={
                                                    <span style={{textWrap: "nowrap"}}>
                                                        <MarkGithubIcon size={24} />
                                                        <span style={{marginLeft: "6px"}}>
                                                            GitHub
                                                        </span>
                                                    </span>
                                                }></Card>
                                            </a>
                                        }
                                    </div>
                                    <div className="responsive-row">
                                        {/* Details like institution, enterprise, address, dates, resume and about */}
                                        <Card isLoading={isLoading} type="card" style={{zIndex: "3", flexGrow: "1"}} classes="bg-light-grey center" content={
                                            <>
                                                <div className="row sm-row-gap flex">
                                                        {'tags' in item &&
                                                            <div className="row sm-row-gap sm-column-gap flex" style={{width:"100%"}}>
                                                                <strong>Tags: </strong>
                                                                {item.tags?.split(",").map((tag) => (
                                                                    <Card key={tag} type="smCard" title={tag} isLoading={isLoading}></Card>
                                                                ))}
                                                            </div>
                                                        }                                                
                                                        <div className="column sm-column-gap sm-row-gap" style={{flexGrow: "1"}}>    
                                                            {'institution' in item &&
                                                                <Text type="h5" isLoading={isLoading} content={
                                                                    <>
                                                                        <strong>Instituição: </strong>{item.institution}
                                                                    </>
                                                                }></Text>
                                                            }
                                                            {'enterprise' in item &&
                                                                <Text type="h5" isLoading={isLoading} content={
                                                                    <>
                                                                        <strong>Empresa: </strong>{item.enterprise}
                                                                    </>
                                                                    }></Text>
                                                            }
                                                            {'address' in item &&
                                                                <Text type="h5" isLoading={isLoading} content={
                                                                    <>
                                                                        <strong>Localização: </strong>{item.address}
                                                                    </>
                                                                }></Text>
                                                            }
                                                        </div>
                                                        {
                                                            ('start_date' in item && 'end_date' in item) &&
                                                                <div className={`${'tags' in item ? 'row' : 'column'} sm-column-gap sm-row-gap flex`} style={{flexGrow: "1"}}>
                                                                        <Text type="h5" isLoading={isLoading} style={'tags' in item ? {flexGrow: "1"} : {}} content={
                                                                            <>
                                                                                <strong>Início: </strong>{item.start_date}
                                                                            </>
                                                                        }></Text>
                                                                        <Text type="h5" isLoading={isLoading} style={'tags' in item ? {flexGrow: "1"} : {}} content={
                                                                            <>
                                                                                <strong>Fim: </strong>{item.end_date ? item.end_date : "Até o momento"}
                                                                            </>
                                                                        }></Text>
                                                                </div>                                                    
                                                        }
                                                    
                                                        {'resume' in item &&
                                                            <div className={`${style.resume}`}>
                                                                <Text type="h5" content={<><strong>Resumo: </strong> {item.resume}</>}></Text>
                                                            </div>
                                                        }
                                                        <div ref={setExpansiveContainersRef} className={`${"expansive-container"} ${(SeeMoreState.componentId === componentId && SeeMoreState.seeMoreId === item.id) && "active"}`}>
                                                            <p id={`item-${item.id}`}>{item.about}</p>
                                                        </div>
                                                </div>
                                            </>
                                        }></Card>
                                        {/* SeeMore button */}
                                        <SeeMore componentId={componentId} seeMoreId={item.id} classes='bg-grey' isActive={hoveredItemId === item.id} onClick={() => {
                                            dispatch(setSeeMoreClicked({seeMoreId: item.id, componentId: componentId}))
                                            }}></SeeMore>
                                    </div>
                                </div>
                            }></Card>
                    ))}
                    {/* ShowMore button */}
                    {items.length > maxItems &&
                        <ShowMoreButton componentId={componentId} onClick={() => {dispatch(setShowMoreClicked({componentId: componentId}))}}></ShowMoreButton>
                    }
                </div>
            }></Card>
        )
    } else {
        // return loading skeleton
        return(
            <Card title={componentId} isLoading={true} boxShadow={true} content={
                <Card boxShadow={true} isLoading={true} type="card" content={
                    <div className="column sm-row-gap">
                        <div className="row flex md-column-gap md-row-gap">
                            <Text type="h3" isLoading={true}></Text>
                            <Card type="smCard" isLoading={true} classes="bg-grey"></Card>
                            <Card type="smCard" isLoading={true} classes="bg-green"></Card>
                        </div>
                        <Card isLoading={true} type="card" classes="bg-light-grey center" content={
                            <div className="column sm-row-gap">
                                <div className="row sm-column-gap sm-row-gap flex">
                                    <Text type="h5" isLoading={true} style={{flexGrow: "1"}}></Text>
                                    <Text type="h5" isLoading={true} style={{flexGrow: "1"}}></Text>
                                </div>
                                <div className="row sm-column-gap sm-row-gap flex">
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
}
export default Item
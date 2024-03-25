import { SearchType } from '../../../models/SearchTypes'
import './card.css'
interface CardProps
{
    item : any
    type : SearchType
}
const substringTool = (string : string, limit : number) =>
{
    if(string.length > limit) return `${string.substring(0, limit)}...`
    return string
}

export default function Card ({item, type} : CardProps) 
{
    return (
        <div className='card'>
            {item.images.length ? 
                <img className={`card-image ${type}`} src={item.images[1] ? item.images[1].url : item.images[0].url}/>
                :
                <div className={`card-image ${type}`}></div> }
            <div className='card-text'>
                <div className='card-text-title'>{substringTool(item.name, 17)}</div>
                <div className='card-text-type'>{item.type}</div>    
            </div>
        </div>
    )
} 
import './card.css'

export default function Card ({artist} : any) 
{
    return (
        <div className='card'>
            {artist.images.length ? <img className='card-image' src={artist.images[1] ? artist.images[1].url : artist.images[0].url}/> : <div className='card-image'></div> }
            <div className='card-text'>
                <div className='card-text-title'>{artist.name}</div>
                <div className='card-text-type'>{artist.type}</div>    
            </div>
        </div>
    )
} 
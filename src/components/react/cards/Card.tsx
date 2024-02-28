import './card.css'

export default function Card ({artist} : any) 
{
    console.log(artist)
    return (
        <div className='card'>
            {artist.images.length ? <img className='card-image' src={artist.images[1].url}/> : <div className='card-image'></div> }
            <div className='card-text'>
                <div className='card-text-title'>{artist.name}</div>
                <div className='card-text-type'>{artist.type}</div>    
            </div>
        </div>
    )
} 
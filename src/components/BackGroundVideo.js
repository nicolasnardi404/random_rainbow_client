import bgVideo from '../videos/BGvideo.mp4'
import '../App.css';

export default function BackGroundVideo(){
    return (
        <video autoPlay muted loop className="background-video">
        <source src={bgVideo} type="video/mp4" />
      </video>
    )
}
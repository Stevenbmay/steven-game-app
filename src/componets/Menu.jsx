import { useNavigate } from "react-router-dom";
import hang7 from './Hangman/HangmanImgs/hang7.PNG'
import typer from './menuImg/images.png'
import RPS from './menuImg/RPS.jpg'
import './menu.css'

const Menu = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h2 className='font30'>What Game</h2>
            <button onClick={() => navigate('/race')}><img className="img" src={typer} alt="typer-img" /></button>
            <button onClick={() => (navigate('/RPS'))}><img className="img" src={RPS} alt="RPS-img" /></button>
            <button onClick={() => (navigate('/hangman'))}><img className="img" src={hang7} alt="Hangman-img" /></button>
        </div>
    )
}


export default Menu;
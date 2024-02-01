
import '../components/Home/Home.css'
import { Link } from 'react-router-dom'
const Home = () => {
    // console.log(data);
    const Move = ()=>{
        <Link to='/Home/complete' />
    }
  return (
      <div>
    <div className='container'>
      <div>Winner never qite, Quitter Never win</div>
      <div>
    {/* your profile is {(data.data ? <span>complete</span>:<div><span>incomplete</span> <button> <Link to='/Home/Complete'>Complete Now</Link></button></div> 
    )} */}
    Your profile is incomplete <button> <Link to='/Home/Complete'>Complete Now</Link></button>
      </div>
      
    </div>
    <hr />
    </div>
  )
}

export default Home

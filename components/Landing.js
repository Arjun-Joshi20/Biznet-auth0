import Particles from 'react-particles-js';
import Tilt from 'react-tilt'
import {useRouter} from 'next/router'

function Landing() {

    const router = useRouter()

    return (
        <div className="bg-[#E51A4C] h-[50vw]" >
            <div class="animation-area">
              <ul class="box-area">
                <Tilt className="border-2 border-white rounded-full p-10 " >
                  <h1 className='text-center text-white landing-font mt-40 ' >BIZNET</h1>  
                  <h1 className='text-center subtext-font text-white' >Social Network for small businesses<br/></h1>
                </Tilt>
                <br/>
                  <a onClick={() => router.push('whyus')} className='text-center subtext-font text-white cursor-pointer ' >Get Started</a>
                  <a onClick={() => router.push('dashboard')} className='text-center subtext-font text-white cursor-pointer ' >Dashboard</a>
                  <li><img src='https://res.cloudinary.com/codegowdacloud/image/upload/v1629217888/undraw_uploading_go67_eqxyer.svg' ></img></li>
                  <li><img src='https://res.cloudinary.com/codegowdacloud/image/upload/v1629217888/undraw_Business_plan_re_0v81_f2brve.svg' ></img></li>
                  <li><img src='https://res.cloudinary.com/codegowdacloud/image/upload/v1629217888/undraw_shopping_eii3_srwbvg.svg' ></img></li>
                  <li><img src='https://res.cloudinary.com/codegowdacloud/image/upload/v1629217888/undraw_add_to_cart_vkjp_o4cfqe.svg' ></img></li>
                  <li><img src='https://res.cloudinary.com/codegowdacloud/image/upload/v1629220027/farmfresh/undraw_creative_team_r90h_wp8pny.svg' ></img></li>
                  <li><img src='https://res.cloudinary.com/codegowdacloud/image/upload/v1629219802/farmfresh/undraw_Chat_re_re1u_cmfygh.svg' ></img></li>
              </ul>
            </div>
        </div>
        
    )
}

export default Landing

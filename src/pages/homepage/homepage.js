import React from 'react'
import Logo from '../../assets/pesto_logo.png'
// import HeroImg from '../assets/hero-img.png'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import styles from './styles.module.css'

const Homepage = () => {

    const backgroundImage = 'url("/hero-img.png")';
    const backgroundStyles = {
        backgroundImage: backgroundImage,
        backgroundSize: 'cover', // Adjust based on your design requirements
        backgroundPosition: 'center', // Adjust based on your design requirements
        height: '400px', // Example height
        width: '100%', // Example width
    };

    const imageUrl = 'hero-img.png';

    return (
        <>
            <div className= {styles.container}>
                <div className= {styles.text}>
                    <h1>TASK MANAGEMENT</h1>
                    <p>Make a business plan or list of resolutions to achieve goals or achieve success.</p>
                    {/* <Box>
                        <Typography sx= {{ fontWeight: 600, fontSize: "48px" }}>
                            TASK MANAGEMENT
                        </Typography>  
                        <Typography sx= {{ fontWeight: 600, fontSize: "32px", maxWidth: "180px" }}>
                            Make a business plan or list of resolutions to achieve goals or achieve success.
                        </Typography>  
                    </Box> */}
                </div>
            </div>
        </>
    )
}

export default Homepage
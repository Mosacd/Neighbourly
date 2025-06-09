import pic1 from "@/assets/about pic1.png"
import pic2 from "@/assets/about pic2.png"

const About = () => {

    return(
        <div className="*:flex *:items-center *:justify-between max-w-[1117px] 2xl:max-w-[1396px] m-auto">
            <div className="mb-[120px]">
                <div className="max-w-[518px] 2xl:max-w-[688px]">
                    <h1 className="mb-[48px] noto-sans-semibold text-3xl 2xl:text-4xl ">Our Mission</h1>
                    <p className="noto-sans-regular text-lg 2xl:text-xl ">We believe in the power of people to create change. Our mission is to connect passionate volunteers with meaningful opportunities that make a real impact in communities. Together, we aim to build a kinder, stronger, and more supportive world—one act of service at a time.</p>
                </div>
            <img className="max-w-[518px] 2xl:max-w-[658px]" src={pic1} alt="" />
            </div>
            <div>
            <img className="max-w-[518px] 2xl:max-w-[658px]" src={pic2} alt="" />
             <div className="max-w-[518px] 2xl:max-w-[688px]">
                    <h1 className="mb-[48px] noto-sans-semibold text-3xl 2xl:text-4xl">Why Choose Us</h1>
                    <p className="noto-sans-regular text-lg 2xl:text-xl">We make volunteering simple, impactful, and meaningful. Whether you're looking to give back, gain experience, or be part of something bigger, we connect you with causes that matter. With a supportive team, flexible opportunities, and a shared passion for change, we make it easy for you to make a difference.</p>
                </div>
            </div>
        </div>
    )
}


export default About;
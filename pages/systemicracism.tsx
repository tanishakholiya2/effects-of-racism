import Head from "next/head";
import Link from "next/link";
import Header from "../components/header";
import money from '../public/money.png';
import housing from '../public/housing.png';
import education from '../public/education.png';
import healthcare from '../public/healthcare.png';

const SystemicRacism: React.FC = () => {
    return(
        <>
        <Header/>
        <h1> About Systemic Racism</h1>
        <p> 
            Systemic Racism refers to racism that is embedded in the laws and regulations. Systemic regulation shows up through wealth gaps, unemployment, housing, education, health care, and political representation.

Black families have a median net worth of 11,000 dollars while white families have 134,000 dollars. Additionally, white women have a wealth of 41,000 while black women only have $120

​Black unemployment is twice as high as white unemployment. Black college graduates are twice as likely to be unemployed after college than white graduates and people with white-sounding names are more likely to get callbacks for job interviews

Segregation from the past still disadvantages black people. Racist housing policies cause them to not be able to live in certain places which affects the quality of education, quality of healthcare, safety, food, and job quality.

Racism limits the political representation. 0.7% of white people are arrested while 4% of black people get arrested. Additionally, 13% of blacks are denied their right to vote.

Health care: Black babies are 2.5 times more likely to die before reaching 1 year old and Black mothers are 3 times more likely to die during pregnancy. Black, Hispanic, and Native American mothers are more likely to not receive proper care because of limited health care.
        </p>
        <img src={money.src} width="150px" height="150px" />
        <img src={housing.src} width="150px" height="150px" />
        <img src={education.src} width="175px" height="150px" />
        <img src={healthcare.src} width="150px" height="150px" />
        </>
    )
}
export default SystemicRacism;
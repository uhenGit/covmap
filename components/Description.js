import Link from "next/link";
import Image from 'next/image';
import DescStyle from '../styles/description.module.css';

const Description = () => {
    return (
        <section className='flex f-center f-column container'>
            <h2>What do We have here</h2>
            <article className='flex f-center f-column'>
                <p>
                    This application allows You to watch, track and compare some data about Covid-19 from all over the world.
                </p>
                <p>
                    Please note, that some countries (like Central African Republic - CAR) have very poor info about the virus.
                </p>
                <h3>Some instructions</h3>
                <h4>Navigate to <Link href='/data'>Data page:</Link></h4>
                <ul className={DescStyle.wrap}>
                    <li>
                        On <span className={DescStyle.imp}>Table Tab</span> You can:
                        <ul>
                            <li>
                                If You agree to use Your geo position, You'll see Covid data for Your current position country on top of the table, and nearest siblings data below
                            </li>
                            <li>
                                If You don't, You'll see a default country data
                            </li>
                            <li>
                                However, You can use search field above the table
                            </li>
                            <li>
                                By clicking on Country name cell, You can move it on the top of the table to see it's siblings data
                            </li>
                            <li>
                                Click on Cases cell toggle a info block, where You can choose another day data
                            </li>
                        </ul>
                        <Image src='/img/covtable.jpg' alt='Table tab description' width='500' height='300'/>
                    </li>
                    <li>
                        On <span className={DescStyle.imp}>Map Tab</span> You can see a map with some color markers:
                        <ul>
                            <li>
                                The color of marker border define current situation with new cases relatively to the population. If border has red color - situation may be dangerous. If color is yellow - situation is under control (or something like this).
                            </li>
                            <li>
                                Click on the color marker dislays some detales
                            </li>
                        </ul>
                        <Image src='/img/covmap.jpg' alt='Map tab description' width='500' height='300'/>
                    </li>
                    <li>
                        On <span className={DescStyle.imp}>Graphical Tab</span> You can see day dependent data
                        <ul>
                            <li>
                                By choosing a date, You can watch dynamic of new cases and deaths
                            </li>
                        </ul>
                        <img src='#' alt='Graphical tab description' />
                    </li>
                </ul>
            </article>
        </section>
    )
}
export default Description;
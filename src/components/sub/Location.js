import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faCarRear, faEnvelope, faLocationDot, faMapLocation, faPhone, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { faInstagram} from '@fortawesome/free-brands-svg-icons'

export default function Location() {
    let main = useRef(null);
    const {kakao} = window;
    const container = useRef(null);
    const [map, setMap] = useState(null);
    const [index, setIndex] = useState(0);
    const path = process.env.PUBLIC_URL;
    const info = [
        {
            title: 'Incheon Airport',
            latlng: new kakao.maps.LatLng(37.459272748230944, 126.45974962289725),
            imgSrc: path+'/img/map.png', 
            imageSize: new kakao.maps.Size(40, 40),
            imgPos: {offset: new kakao.maps.Point(116, 99)},
        },
        {
            title: 'Gimpo Airport',
            latlng: new kakao.maps.LatLng(37.54700467448257, 126.81579726787132),
            imgSrc: path+'/img/map.png', 
            imageSize: new kakao.maps.Size(40, 40),
            imgPos: {offset: new kakao.maps.Point(116, 99)},
        },
        {
            title: 'Jeju Airport',
            latlng: new kakao.maps.LatLng(33.50838718678488, 126.49697597643684),
            imgSrc: path+'/img/map.png', 
            imageSize: new kakao.maps.Size(40, 40),
            imgPos: {offset: new kakao.maps.Point(116, 99)},
        }
    ];
    const [mapInfo] = useState(info);
    useEffect(() => {
        main.current.classList.add('on');
    })
    useEffect(() => {
        container.current.innerHTML = '';
        const options = {
            center: mapInfo[0].latlng,
            level: 6
        }
        const map = new kakao.maps.Map(container.current, options);
        setMap(map);
        new kakao.maps.Marker({
            map: map,
            position: mapInfo[index].latlng,
            title: mapInfo[index].title,
            image: new kakao.maps.MarkerImage(mapInfo[0].imgSrc, mapInfo[0].imageSize, mapInfo[0].imgPos)
        })
        map.setCenter(mapInfo[index].latlng);
        const mapSet = () => map.setCenter(mapInfo[index].latlng);
        window.addEventListener('resize', mapSet);

        // 지도 타입 변경, 컨트롤러 표시
        const mapTypeControl = new kakao.maps.MapTypeControl();
        map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

        // 휠로 줌 기술 활성화 유무
        map.setZoomable(true);

        // 마우스 드래그 기능 활성화
        map.setDraggable(true);
        return () => window.removeEventListener('resize', mapSet);
    }, [index]);
    
    return(
        <main className="content location" ref={main}>
        <figure id="sub_main">
                <h1 className="txtFirst"> It's location</h1>
                <h1 className="txtSecond"> the people</h1>
                <p>Sample text. Click to select the text box. Click again or double click to start editing the text.</p>
            </figure>
            <div className="inner">
                <section className='box'>
                    <div className="d_box">
                        <FontAwesomeIcon icon={faLocationDot} className="icons"/>
                        <h2>OUR MAIN OFFICE</h2>
                        <p>271, Gonghang-ro, Incheon</p>
                        <p>Republic of Korea</p>
                    </div>
                    <div className="d_box">
                        <FontAwesomeIcon icon={faPhone} className="icons"/>
                        <h2>PHONE NUMBER</h2>
                        <p>403-889-4792</p>
                        <p>888-123-4567</p>
                    </div>
                    <div className="d_box">
                        <FontAwesomeIcon icon={faInstagram} className="icons"/>
                        <h2>INSTAGRAM</h2>
                        <p>Lorem ipsum dolor sit amet.</p>
                    </div>
                    <div className="d_box">
                        <FontAwesomeIcon icon={faEnvelope} className="icons"/>
                        <h2>EMAIL</h2>
                        <p>hello@there.com</p>
                    </div>
                </section>
                
                <section className='mapbox'>
                    <article>
                        <div className="contact">
                            <h1>Contact info</h1>
                            <div className="email">
                                <span>Email</span>
                                <input type="text" placeholder='enter a vaild email address' />
                            </div>
                            <div className="name">
                                <span>Name</span>
                                <input type="text" placeholder='enter your Name' />
                            </div>
                            <div className="message">
                                <span>Message</span>
                                <textarea placeholder='enter your message'></textarea>
                            </div>
                            <input type="checkbox" name="agreeCheck" id="agreeCheck" />
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores consequatur dolores, ipsam itaque fugiat placeat?</p>
                            <button type="submit">SUBMIT</button>
                        </div>
                        <div id="map" ref={container}></div>
                    </article>
                    <nav className="branch">
                        {mapInfo.map((data, idx) =>{
                            return <button key={idx} onClick={() => {setIndex(idx)}  }>{data.title}</button>
                        })}
                    </nav>
                </section>

                <section className="box_bottom">
                    <h2>The Most Prestigious Addresses in the World</h2>
                    <p>Fairmont Hotels understands luxury is more than opulent interiors, exquisite service and iconic addresses. True luxury is the gift of unforgettable experiences. It’s that moment when you see, hear, taste, touch or feel something as if for the very first time.</p>
                    <article>
                        <FontAwesomeIcon icon={faBed} className="bottom_icons"/>
                        <p>With a rich tradition of hospitality dating back to the end of the 19th century, we've never allowed ourselves to simply rest on our laurels.</p>
                    </article>
                    <article>
                        <FontAwesomeIcon icon={faMapLocation} className="bottom_icons"/>
                        <p>We’ve welcomed global leaders and been present at world-changing events. Our beach resorts have provided a haven for celebrities and our secluded mountain lodges have welcomed royalty.</p>
                    </article>
                    <article>
                        <FontAwesomeIcon icon={faCarRear} className="bottom_icons"/>
                        <p>From our castles in the Rockies to modern wonders in exotic places, each hotel celebrates, captures and connects to each destination’s distinctive spirit so we can share it with our valued guests.</p>
                    </article>
                    <article>
                        <FontAwesomeIcon icon={faUtensils} className="bottom_icons"/>
                        <p>Ready to indulge in major me-time? Choose to spend your days in the sun on the pristine sandy beaches of a tropical isle. Pacific, Atlantic or Caribbean, we’ve got it covered with resorts ready to pamper you.</p>
                    </article>
                </section>
            </div>
        </main>
    )
}

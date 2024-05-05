
import { useContext } from 'react';
import './projects.scss';
import { projectsData } from '../data/data-projects'
import Modal from '../Modal/Modal';
import { ModalContext } from '../../contexts/ModalContext';
import { useInView } from 'react-intersection-observer';
import { ScreenSizeContext } from '../../contexts/ScreenSizeContext';

import { GrGroup } from "react-icons/gr";
import { RxPerson } from "react-icons/rx";

import eventlite from '../../assets/images/eventlite.webp';
import showtime from '../../assets/images/showtime.webp';
import jisho from '../../assets/images/jishoMockup.svg';
import FY from '../../assets/images/FY.webp';




export const Card = ({ items }) => {
  const { modalStatus, setModalStatus, setModalData } = useContext(ModalContext);
  const { ref: projectRef, inView: projectIsVisible } = useInView();
  const { isDesktop } = useContext(ScreenSizeContext);
  console.log('desktopsize', isDesktop)

  const handleModalStatus = (item) => {
    setModalStatus(true);
    setModalData(item)
  }

  return items.map((item, index) => {

    return (

      <div key={index} className={`card card${index} ${isDesktop && projectIsVisible ? `showLeft index${index}` : ''} ${isDesktop && !projectIsVisible ? 'hiddenLeft' : ''}`} onClick={item.status === "active" ? () => handleModalStatus({ item }) : null} ref={projectRef}>

        <div className={`card__container card-box-style ${item.status === 'inactive' ? 'card-inactive' : ''}`}>
          {item.status === 'inactive' &&
            <div className='inactive-text'>
              <p>In Progress</p>
            </div>
          }

          {/* make this dynamic later */}
          <div className='card__image'>
            {item.image === "eventlite" && <img src={eventlite} alt={`${item.name} image`} />}
            {item.image === "showtime" && <img src={showtime} alt={`${item.name} image`} />}
            {item.image === "jisho" && <img src={jisho} alt={`${item.name} image`} />}
            {item.image === "FY" && <img src={FY} alt={`${item.name} image`} />}
          </div>

          <div className='card__content card-bg-color'>
            <h2 className='card-title'><div>{item.name} </div> {item.group ? <GrGroup /> : <RxPerson />
            }</h2>
            <p className='card-techstack'><span className='bold'>Tech Stack:  </span>{item.teckStack.join(', ')}</p>
            <p className='card-description'>{item.description}</p>
          </div>
        </div>
      </div>
    )
  }
  )

}

 const Projects = () => {
  const { ref: projectRef, inView: projectIsVisible } = useInView();


  return (
    <section className='projects' ref={projectRef}>

      <div className='projects__container'>

        <p className={`title space-bottom ${projectIsVisible ? 'showFadeIn' : 'hiddenFadeIn'}`}>Projects</p>

        <div className='projects__content'>
          <Card items={projectsData} />
        </div>

      </div>
    </section>
  )
}

export default Projects;

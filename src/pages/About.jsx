import INFO from '../data/user'


const About = () => (
  
    <div className='div-bg-table div-about'>
      <div className='div-bg div-bg-table'>
        <h1>{INFO.about.title}</h1>
        <h2>
          {INFO.about.description}
        </h2>
        <h2>
          {INFO.about.description_2}
        </h2>
        <h3>Name: {INFO.main.name}</h3>
        <h4>Studend ID: {INFO.main.studentid}</h4>
        <h4>Email: {INFO.main.email}</h4>
      </div>
    </div>
  
);
export default About;
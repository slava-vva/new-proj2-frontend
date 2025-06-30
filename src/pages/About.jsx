import INFO from '../data/user'

const About = () => (
  
    <div className='div-bg-table'>
      <div className='div-bg div-bg-table div-forecolor'>
        <h1>About Page</h1>
        <h2>
          Golf course App developed as part of assignment for course CI/CD
        </h2>
        <h2>
          according to corriculum PGDIT Software development in Auckland
          Institute of Studies
        </h2>
        <h3>Name: {INFO.main.name}</h3>
        <h4>Studend ID: {INFO.main.studentid}</h4>
        <h4>Email: {INFO.main.email}</h4>
      </div>
    </div>
  
);
export default About;
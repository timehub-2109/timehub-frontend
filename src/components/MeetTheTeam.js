import NonAuthNav from "./common/NonAuthNav";

const teammates = [
  {
    name: "Regina Donovan",
    image: "Regina.jpeg",
    linkedin: "https://www.linkedin.com/in/regina-donovan-82242040/",
    github: "https://github.com/rgdonovan",
  },
  {
    name: "Jose Agustin de la Puente",
    image: "Jose.jpg",
    linkedin: "https://www.linkedin.com/in/ja-puente/",
    github: "https://github.com/14jdelap",
  },
  {
    name: "Aneesh Patel",
    image: "Aneesh.jpeg",
    linkedin: "https://www.linkedin.com/in/aneesh-patel-62172b91/",
    github: "https://github.com/aneesh-patel",
  },
  {
    name: "Lorenzo de la Puente",
    image: "Lorenzo.jpeg",
    linkedin: "https://www.linkedin.com/in/lorenzo-de-la-puente-34a581177",
    github: "https://github.com/lorenzodelapuente",
  },
];

const teamList = teammates.map(teammate => {
  return (
    <li className="max-w-xs">
      <figure>
        <img className="object-contain w-auto mx-auto rounded shadow-xl"
          src={`${process.env.PUBLIC_URL}/images/team/${teammate.image}`}
          alt={teammate.name} />
        <figcaption className="text-center font-semibold text-md">{teammate.name}</figcaption>
      </figure>
      <div className="flex justify-center gap-2 h-20">
        <a className="object-contain w-7" 
          href={teammate.github}>
          <img className="object-contain mx-auto rounded shadow-xl"
            src={`${process.env.PUBLIC_URL}/images/team/github.png`}
            alt="a link to their github" />
        </a>
        <a className="object-contain w-7"
        href={teammate.linkedin}>
          <img className="object-contain mx-auto rounded shadow-md"
            src={`${process.env.PUBLIC_URL}/images/team/linkedin.png`}
            alt="a link to their linkedin" />
        </a>
      </div>
    </li>
  )
});


function Team() {
  return (
    <div className="text-gray-800 bg-gradient-to-b from-gray-100 to-white">
      <NonAuthNav />
      <div className="mx-auto max-w-4xl flex flex-col items-center pt-16">
        <h1 className="font-semibold text-4xl my-10">Meet The Team</h1>
        <ul className="mx-auto justify-center flex flex-wrap gap-8">
          {teamList}
        </ul>
      </div>
    </div>
  )
}

export default Team;
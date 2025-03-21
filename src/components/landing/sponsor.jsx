
const Sponsor = () => {
  const column = [
    {
      image:
        "https://images.ctfassets.net/0jnmtsdzg6p5/2tt3kfGr9bYVcUP1I00jpj/37c5d9a6995addebeb33dfeaac93beb7/united.svg",
    },
    {
      image:
        "https://images.ctfassets.net/0jnmtsdzg6p5/22X0je68EgPkShfygLb6qr/effc77e40886fa100f38c6a32938f8fc/Santander_1.svg",
    },
    {
      image:
        "https://images.ctfassets.net/0jnmtsdzg6p5/2GVOzfEvYQNbpLmmCJKikH/e672a251c1a16e6b34061360d90d8799/Unilever_1.svg",
    },
    {
      image:
        "https://images.ctfassets.net/0jnmtsdzg6p5/6vek90K3F9FHzDZXuSshw7/0302d05874116066d603ee423c2f3527/primerica.svg",
    },
    {
      image:
        "https://images.ctfassets.net/0jnmtsdzg6p5/3ijyT8e3IPAr53LZxREf2X/e46878ffb08f652974671cdfbaadfb8b/DE-Ducati_1.svg",
    },
    // {
    //   image:
    //     "https://images.ctfassets.net/0jnmtsdzg6p5/73IfZ3oaiCiHchy63PE8w3/23ecac36a85f7d0718592f08a418409c/flowserve.svg",
    // },
  ];

  return (
    <div className="sponsor-wraper container">
      {column.map((item, index) => (
        <div key={index} className="sponsor-cards">
          <img src={item?.image}  alt={`sponsor-${index}`}/>
        </div>
      ))}
    </div>
  );
};

export default Sponsor;

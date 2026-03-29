import React from 'react'
import { Heading } from "../common/Heading";
import { useFetch } from "../../hooks/useFetch";
import { Settings, CropRotate, ViewInAr, PieChart, Code, BarChart } from "@mui/icons-material"

const iconMap = {
  Settings: <Settings />,
  CropRotate: <CropRotate />,
  ViewInAr: <ViewInAr />,
  PieChart: <PieChart />,
  Code: <Code />,
  BarChart: <BarChart />
};

export const Services = () => {
  const { data: services, loading } = useFetch('/api/services');

  if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>;

  return (
  <>
    <section className='services'>
        <div className='container'>
            <Heading title='Services'/>
         <div className='content grid3'>
            {services.map((item, i) => (
                <div key={item.id || i} className='box' data-aos="flip-left">
                    <i>{iconMap[item.iconName] || <Settings/>}</i>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                </div>
            ))}
        </div>
        </div>
    </section>
  </>)
}

require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');

// Models
const Service = require('./models/Service');
const Portfolio = require('./models/Portfolio');
const Blog = require('./models/Blog');
const Testimonial = require('./models/Testimonial');

// Dummy Data (copied from frontend DummyData.js)
const services = [
  { id: 1, iconName: "Settings", title: "Creative Design", desc: "Successfully designed visually engaging websites that captivate users & achieve business objectives" },
  { id: 2, iconName: "CropRotate", title: "Clean Code", desc: "Written clean code that will ensure that my websites overall structure is manageable as it grows" },
  { id: 3, iconName: "ViewInAr", title: "Responsive Design", desc: "Proficient in HTML, CSS, JavaScript, ReactJs and responsive design principles. " },
  { id: 4, iconName: "PieChart", title: "Material UI", desc: "Specialized in creating user-friendly interfaces that provide a delightful browsing experience across all devices" },
  { id: 5, iconName: "Code", title: "Material UI Icons", desc: "Used material UI icons to convey meaningful information and also for branding reinforcement" },
  { id: 6, iconName: "BarChart", title: "Awesome Support", desc: "The most versatile and feature-oriented support plugin for react components" },
];

const portfolio = [
  { id: 1, cover: "../images/port1.jpg", name: "Brand", category: "marketing", title: "Alao Logo" },
  { id: 2, cover: "../images/port2.jpg", name: "Brand", category: "design", title: "Alao Logo" },
  { id: 3, cover: "../images/port3.jpg", name: "Brand", category: "development", title: "Alao Logo" },
  { id: 4, cover: "../images/port4.jpg", name: "Brand", category: "marketing", title: "Alao Logo" },
  { id: 5, cover: "../images/port5.jpg", name: "Brand", category: "design", title: "Alao Logo" },
  { id: 6, cover: "../images/port6.jpg", name: "Brand", category: "development", title: "Alao Logo" },
];

const testimonials = [
  { id: 1, text: "Working with Alao was an absolute pleasure. He was able to take our vision and turn it into a beautiful functional website that our customers love.", image: "./images/team-1.png", name: "Alabi Sola", post: "Front End Developer" },
  { id: 2, text: "I was blown away by the attention to detail that Alao brought to our project. He was able to create a seamless user experience that has really set us apart from our competitors", image: "./images/team-2.png", name: "Alex Tobi", post: "Back End Developer" },
  { id: 3, text: "I highly recommend Alao for any front end developement needs. He is incredibly knowledgeable and always willing to go the extra mile to ensure that the project is a success", image: "./images/team-3.png", name: "Alao Ore", post: "React Developer" },
];

const blog = [
  { id: 1, title: "Master These Awesome", date: "April 2, 2023", author: "Ayo Adeosun", desc: "Lorem Ipsum has been standard. Lorem Ipsum is simply text of the printing and typesetting industry. Lorem Ipsum has been...", cover: "./images/b1.png" },
  { id: 2, title: "Best Design Items to Appeal", date: "June 27, 2023", author: "Oke Amaka", desc: "Lorem Ipsum has been standard. Lorem Ipsum is simply text of the printing and typesetting industry. Lorem Ipsum has been...", cover: "./images/b2.png" },
  { id: 3, title: "The 20 Best Lightroom Presets", date: "July 7, 2023", author: "Matt Olawale", desc: "Lorem Ipsum has been standard. Lorem Ipsum is simply text of the printing and typesetting industry. Lorem Ipsum has been...", cover: "./images/b3.png" },
];

const seedDB = async () => {
  try {
    await connectDB();

    console.log('Clearing existing data...');
    await Promise.all([
      Service.deleteMany(),
      Portfolio.deleteMany(),
      Blog.deleteMany(),
      Testimonial.deleteMany()
    ]);

    console.log('Seeding new data...');
    await Promise.all([
      Service.insertMany(services),
      Portfolio.insertMany(portfolio),
      Blog.insertMany(blog),
      Testimonial.insertMany(testimonials)
    ]);

    console.log('✅ Base Data Seeded Successfully!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error Seeding Data: ${error.message}`);
    process.exit(1);
  }
};

seedDB();

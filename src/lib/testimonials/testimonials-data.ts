/**
 * Testimonials page content (Figma 3366:855), taken from the visible items of the
 * current site's testimonials page. Drupal `testimonials_data` only holds
 * placeholders, so this stays static until real entries exist there.
 */

export type Testimonial = {
  name: string;
  role?: string;
  quote?: string;
  /** File in /public/testimonials. */
  image: string;
  /** YouTube URL; shows the play button when present. */
  video?: string;
};

export type TestimonialTab = {
  id: string;
  label: string;
  items: Testimonial[];
};

export const TESTIMONIALS_INTRO =
  "Watching our dear students, recruiters and faculty members, mingle together with joy, fuels our passion, to raise our bar of academic excellence. Hear it from our students, alumni, parents and recruiters, themselves!";

export const TESTIMONIAL_TABS: TestimonialTab[] = [
  {
    id: "alumni",
    label: "Alumni",
    items: [
      {
        name: "Nikhil Bapat",
        role: "Partner, YAAP Digital Pvt. Ltd",
        quote:
          "The entire process of ideation or strategizing at WeSchool, helps me even today in my day-to-day job.",
        image: "nikhil-bapat.jpg",
        video: "https://www.youtube.com/watch?v=ptXtzZOJqNU",
      },
      {
        name: "Nishant Khalde",
        role: "Business Design 2019 - 21, WeSchool Mumbai",
        quote:
          "Our organisation wants to create a banking product to promote financial inclusion across India's villages and tier 3, tier 4 cities. We did research utilising the Design Thinking approach to better understand the users in this demographic, which allowed our organisation to fully comprehend the target segment. Understanding the target market in depth aided us in developing a user-centric banking product that will meet the consumers' financial and banking demands on a physical level. In addition to contributing my Design Thinking talents to the development of a banking product, I co-led a one-day Design Thinking session at Global Institute of Sports Business with a buddy from the Business Design 2018 - 20 batch. This program enabled me to educate young talent about the benefits of Design Thinking and introduce them to a new profession of Sports Business.",
        image: "01-1.png",
      },
      {
        name: "Nachiket Desai",
        quote:
          "The Reasons why a PGDM from WeSchool is a valuable investment, as explained by Nachiket Desai. Explore how our program goes beyond theoretical learning to provide hands-on experiences and industry insights.",
        image: "1.png",
        video: "https://www.youtube.com/watch?v=WQhLWCNmRfs",
      },
      {
        name: "Shubhangi Srivastava",
        role: "PGDM (Business Design) - 2019-2020",
        quote:
          "The 14-day introduction session predominantly focused on agile ideas and Design Thinking themes. Everyone was aware of them in theory, but we were also given some hands-on exercises to put them into practice. It was easier for me from the Batch to complete and present it on time because I had been proficient with many programs over the past two years and was familiar with the steps. In addition, I made use of it in the AI/ML Hackathon Application use case. It was also a seamless trip to be able to apply Design Thinking to translate the technical use case into a user prototype. It was a unique experience because this time we converted the data provided to develop code into how we could use it for the benefit of the users. Some of the lessons that were really beneficial to me were: I also take part in training classes for new hires, where I use the empathy technique to help the trainees better understand the new technical concept. Additionally, I've been aiding my mother in the development of course modules, presentations, and marketing content for the educational start-up with which she is involved. The Design Thinking technique was very useful in developing a course module and company agenda based on what today's parents want their children to learn. To summarise, I've always wanted to learn in a more practical manner because it allows me to learn and grasp things more quickly. And at the end of my journey, I finally had the chance to learn while doing. And this is how unintentionally Empathy, Design Thinking, SMED, FMEA, Visual Management, and Prototyping have been applied in both personal and professional life. The influence was just on the level of recognition among the group I was working with, whether it was in training or at a Hackathon. It provided me the courage to stand out in a crowd, to know things and be able to translate them into an idea, as well as credibility and acknowledgment from peers and seniors. They could translate their offerings to the customer base they were targeting with all of the presentations prepared for my mother. From my perspective, it's the extra hands-on ability to quickly adapt to any app, program, or platform and build or transform demand into a strategy.",
        image: "placeholder.png",
      },
      {
        name: "Sanchi Paingy",
        quote:
          "A holistic learning experience with Sanchi Paingy at WeSchool, where education goes beyond the classroom. She Explore a 360-degree approach to development, blending academic excellence with practical skills",
        image: "2.png",
        video: "https://www.youtube.com/watch?v=3fnQ82lIf18",
      },
      {
        name: "Biswaroop Mitra",
        quote:
          '"Explore Biswaroop Mitra\'s educational journey at WeSchool, where hands-on projects facilitated by faculty members played a crucial role. Understand how the education at WeSchool equips students with practical skills for project-based environments, including the transformative impact of programs like GCL."',
        image: "17.png",
        video: "https://www.youtube.com/watch?v=JUKmKX0spPw",
      },
      {
        name: "Sumit Kawarkhe",
        role: "Business Analyst Team Lead",
        quote:
          "I've built not just a professional but a personal relationship with WeSchool.",
        image: "maxresdefault.jpg",
        video: "https://www.youtube.com/watch?v=C_SLdOaVd0M",
      },
      {
        name: "Ankit Patwari",
        quote:
          "Our vision was enlarged. We focused on global business's, instead of just focusing on the Indian market.",
        image: "ankit-patwari.jpg",
        video: "https://www.youtube.com/watch?v=8CXFI0Eufbw",
      },
      {
        name: "Chintan Maniar",
        quote:
          "Gain invaluable insights into industry practices and trends at WeSchool, as shared by Chintan Maniar. Discover how our immersive approach bridges the gap between classroom learning and real-world scenarios.",
        image: "3.png",
        video: "https://www.youtube.com/watch?v=vhm4QfLr7e8",
      },
      {
        name: "Milin Rohinesh",
        quote:
          "Milin Rohinesh shares his inspiring journey at WeSchool, highlighting how the institute's diverse courses and immersive experiences have shaped his path. Join him as he reflects on the transformative two years that have equipped him with the skills and mindset to become a future leader in his field.",
        image: "13.png",
        video: "https://www.youtube.com/watch?v=uIpNNROq-M0",
      },
      {
        name: "Saket Koria",
        quote:
          "Experience the blend of practical learning and industry exposure at WeSchool with Saket Koria as your guide. Witness how our innovative programs offer a holistic learning experience, propelling you towards professional excellence.",
        image: "4.png",
        video: "https://www.youtube.com/watch?v=2NiRhe5e36Y",
      },
      {
        name: "Ameya Divekar",
        quote:
          "Experience the bridge between academia and the professional world through Ameya Divekar's perspective at WeSchool. Ameya highlights how WeSchool teaches students to evaluate various options and propositions, preparing them for diverse experiences and future challenges. The institution creates a seamless transition from classroom learning to real-world application, ensuring that students are well-equipped for their professional careers",
        image: "7.png",
        video: "https://www.youtube.com/watch?v=xRwzwgIZUBM",
      },
      {
        name: "Mekhala Lele",
        quote:
          "Discover how Welingkar transforms students for the industry through Mekhala Lele's journey. She describes her experience as life-changing, emphasizing her gratitude for the learning opportunities provided. Mekhala highlights the significance of Business Design introduced at Welingkar, which allowed her to learn, unlearn, and relearn firsthand on campus.",
        image: "8.png",
        video: "https://www.youtube.com/watch?v=LUffbwDQtrY",
      },
      {
        name: "Anuj Dound",
        quote:
          "Learning the Many Dimensions of Management | Anuj Dound, Join Anuj Dound in his journey of discovering the diverse aspects of management at Welingkar Institute. From Finance to Operations, explore how his learnings have shaped his professional career and added depth to his work. Discover the unique perspectives gained from visiting faculty and the high standards set for project quality",
        image: "19.png",
        video: "https://www.youtube.com/watch?v=r_ssKzId_No",
      },
      {
        name: "Rajesh Ramineni",
        role: "BigBasket DC - Manager",
        quote:
          "I joined WeSchool as an Aeronautical Engineer & left as a Design Thinker ready to take on the corporate world.",
        image: "rajesh-ramineni.jpg",
        video: "https://www.youtube.com/watch?v=PN-PT3M6yl8",
      },
      {
        name: "Aman Parakh",
        quote:
          "At WeSchool, we believe in nurturing leadership potential. Hear from our students about their experiences, like being the General Secretary of their batch, which helped them hone their leadership and interpersonal skills. Join us and discover what sets WeSchool apart.",
        image: "21.png",
        video: "https://www.youtube.com/watch?v=R5skfKRl20E",
      },
      {
        name: "Mandeep Gaba",
        quote:
          "Experience Mandeep's transformative journey at WeSchool, where he served as the General Secretary, honing his leadership and interpersonal skills.",
        image: "5.png",
        video: "https://www.youtube.com/watch?v=X3R64K8VKbM",
      },
      {
        name: "Sahil Gajria",
        quote:
          "Explore Mr. Sahil Gajria's transformative journey as an engineer at Welingkar. His two years on campus were not just about achieving a degree; they were about the enriching experiences and the connections made. Sahil emphasizes the importance of the journey, highlighting the diverse interactions with alumni and faculty from various backgrounds.",
        image: "9.png",
        video: "https://www.youtube.com/watch?v=Our06m6H94A",
      },
      {
        name: "Shashank Subramanian",
        quote:
          "Experience the transformative journey of pursuing a PGDM in Business Design from Welingkar through the eyes of our student. Discover how hands-on experience in organizing campus events became a significant learning opportunity, instilling principles of discipline, self-grooming, and real-life problem-solving.",
        image: "10.png",
        video: "https://www.youtube.com/watch?v=YmcaxeHYbp8",
      },
      {
        name: "Rachita Banka",
        quote:
          "Explore the enriching experience of Rachita Banka, a member of the Placement Committee at Welingkar. Discover how her role provided valuable insights into corporate interactions and the immense educational value she gained. Rachita expresses her gratitude to Welingkar for the transformative experience",
        image: "11.png",
        video: "https://www.youtube.com/watch?v=RTbhZcgLX4Q",
      },
      {
        name: "Neha Diwanji",
        quote:
          "From Classroom to Boardroom: A Welingkar Alumnus's Journey | Rajesh Suri - Rajesh's journey from the classroom to the boardroom is a testament to the transformative education at Welingkar. Learn how Welingkar equipped Rajesh with the skills and knowledge needed to excel in the corporate world.",
        image: "12.png",
        video: "https://www.youtube.com/watch?v=GrkW0EFPQ1s",
      },
      {
        name: "Kaustubh Joshi",
        quote:
          "\"Navigating Academics and Personal Growth at WeSchool | Kaustubh Joshi Join Kaustubh Joshi as he shares his experiences of academic challenges and personal growth at WeSchool. From classroom learning to practical applications, Kaustubh's journey is a testament to the transformative impact of WeSchool's holistic approach to education.\"",
        image: "14.png",
        video: "https://www.youtube.com/watch?v=xG_IVG_Z33k",
      },
      {
        name: "John Fernando",
        quote:
          '"everaging Opportunities at WeSchool | John Fernando Dive into John Fernando\'s experience at WeSchool, where he discovered a platform for personal and professional growth. Through networking and skill development, WeSchool empowered John to excel in both his personal and professional life."',
        image: "15.png",
        video: "https://www.youtube.com/watch?v=iu2q-obZIps",
      },
      {
        name: "Pablo Roychowdhury",
        quote:
          "Discover the transformative power of education at WeSchool through Pablo Roychowdhury's inspiring journey. His path to success is a testament to the profound impact of learning. Reflecting on his time at WeSchool, Pablo emphasizes the value of the lessons he learned, which have grown exponentially in significance over the past decade.",
        image: "6.png",
        video: "https://www.youtube.com/watch?v=24Jxbpqi7Pw",
      },
      {
        name: "Anand Badrinarayan",
        quote:
          "A Journey of Growth at WeSchool | Anand Badrinarayan Experience Anand Badrinarayan's journey of growth and transformation at WeSchool. Discover how his education and experiences at WeSchool have equipped him with the skills and knowledge to thrive in the professional world. Join us in celebrating Anand's success and the transformative impact of education at WeSchool.",
        image: "20.png",
        video: "https://www.youtube.com/watch?v=Urok1KsaRbs",
      },
      {
        name: "Ashish Nainan",
        quote:
          "haping Future Industry Leaders | Ashish Nainan, Join Ashish Nainan in exploring how Welingkar Institute focuses on creating well-rounded professionals. Learn how Welingkar's teachings go beyond mere specialization, aiming to make you an invaluable asset in any organization.",
        image: "18.png",
        video: "https://www.youtube.com/watch?v=4Cin-TnxJHk",
      },
      {
        name: "Aekta Panjwani",
        quote:
          "Follow the journey of Aekta Panjwani, a Welingkar alumna, as she reflects on the past ten years since graduation. Learn how Welingkar's unique learning environment helped shape her into the successful professional she is today.",
        image: "23.png",
        video: "https://www.youtube.com/watch?v=L3CbIq8Efxo",
      },
      {
        name: "Apoorva Mathur",
        role: "IBM - Marketing Analyst",
        quote:
          "The kind of learning and opportunities I've had at WeSchool have proven to be immensely useful as a career growth path.",
        image: "apoorva-mathur.jpg",
        video: "https://www.youtube.com/watch?v=x23cXwjAMQM",
      },
      {
        name: "Mahalakshmi. K",
        role: "Gujarat Borosil Limited Senior Executive - Market Development",
        quote:
          "The lectures we had, helped us know about the next thing that will drive businesses and give us the confidence of knowing we're going in the right direction.",
        image: "mahalakshmi-k.jpg",
        video: "https://www.youtube.com/watch?v=8JdMCq2a4rg",
      },
      {
        name: "Dhruv Joshi",
        role: "Infosys Ltd - Senior Intellectual Property Officer",
        quote:
          "It was wonderful to see my colleagues and myself gaining exposure to and being placed in top companies. That was the best part.",
        image: "dhruv-joshi.jpg",
        video: "https://www.youtube.com/watch?v=GKNJNqDVXYY",
      },
      {
        name: "Sayi Krishna",
        role: "ICICI Bank - Deputy Manager",
        quote:
          "The most important thing at WeSchool for me was what happened after class!",
        image: "sayi-krishna.jpg",
        video: "https://www.youtube.com/watch?v=s2B6ElMnNHU",
      },
      {
        name: "Ashwini Vasudevan",
        role: "Bare International - Sr. Operations Manager",
        quote:
          "Before I joined Welingkar, I already had 3.5 years of corporate experience and hence, for me, studying here was an opportunity to prepare myself to be a better manager. In these two years, I've been lucky to get an opportunity to work with some of the best brains in the system - Prof. Pradeep Pendse, Prof. Deepa Dixit and Prof. Kaustubh Dhargalkar. Each of them have their own unique styles and are immensely talented in their own right and working with them helped me imbibe some of their qualities. I also did get my share of wisdom by associating with our dynamic Director- Prof Dr. Uday Salunkhe, who, despite being super busy, was always available for guidance and a word of encouragement!",
        image: "placeholder.png",
      },
      {
        name: "Shreya Poojary",
        role: "ACC Ltd (Lafarge Holcim Group) - Deputy Manager Human Resources",
        quote:
          "I am proud to be a product of WeSchool- an institution which has produced some of the great professionals and entrepreneurs in the industry. What sets it apart is the excellent combination of brilliant faculty, world-class infrastructure, diversity of students and a focussed course curricula. The hallmark of it’s philosophy is enabling an all-round development and not just academic exposure for the students. Apart from laying down a solid foundation for my career, my two years at WeSchool have given me the unique advantage of challenging and discovering myself and thus making an unique mark in this competitive landscape.",
        image: "placeholder.png",
      },
      {
        name: "Priyanka Amar",
        role: "iKheti - Ecopreneur, Founder",
        quote:
          "Choosing the right MBA Program & the right college is a very important factor for it decides the growth of any student’s career. For me personally, the Business Design course of WeSchool played a very important role in shaping up my career. The out-of-the-box thinking, the faculty members and the cross-disciplinary approach of mixing Design & Management together is what has helped me grow as a successful Women Entrepreneur.",
        image: "placeholder.png",
      },
      {
        name: "Jason Glen Kotian",
        role: "XXL Branding and Creative Solutions - Founder - Director",
        quote:
          "The experience of interacting with leaders and visionaries like Kishore Biyani helped me to not just dream but to achieve. I grew in Zee and had edge over many of my counter parts (campus placement, moved on only 4 yrs back as A group head brand) and today run my own marketing firm and work with leading brands as a leader and a hard-working team member From experiencing 24 hour marathon sessions with our Director Dr Prof Uday Salunkhe to the international exposures... For me Welingkar has been a game changer! A special mention of Dr Salunkhe sir, Deepa Dixit Ma'am, Prof Pendse, Pramod Sir and Prof Venky.. their support has been immeasurable. Mind you- it's not just the theories but the personal grooming and exposure to the real world that made the faculties so special. Loads of gratitude.",
        image: "22.png",
        video: "https://www.youtube.com/watch?v=esB4GelDewY",
      },
      {
        name: "Nikhil",
        role: "SME - Vice President | Product Head",
        quote:
          "It gives me great pleasure to reflect back on my experience with Welingkar - my alma mater. “Encouraging us to be more independent and the freedom to think and act on our own’- This, I would say, is the best thing I felt during my 2 years at Welingkar. We got enough opportunities to develop analytical skills, leadership and proactive thinking through various programs and events. Student friendly faculty and supporting staff created a conducive academic eco-system for any student to thrive on it. The curriculum is designed to make the student corporate ready and more emphasis is given on learning through case studies, design thinking, perspective management, etc.",
        image: "placeholder.png",
      },
      {
        name: "Sareeta Bhatikar",
        role: "Vodafone India Limited - GM Business HR (Ops) & Emp Relations",
        quote:
          "I am proud to be a product of WeSchool- an institution which has produced some of the great professionals and entrepreneurs in the industry. What sets it apart is the excellent combination of brilliant faculty, world-class infrastructure, diversity of students and a focussed course curricula. The hallmark of it’s philosophy is enabling an all-round development and not just academic exposure for the students. Apart from laying down a solid foundation for my career, my two years at WeSchool have given me the unique advantage of challenging and discovering myself and thus making an unique mark in this competitive landscape.",
        image: "placeholder.png",
      },
      {
        name: "Hiren Shah",
        image: "hiren.jpg",
        video: "https://youtu.be/BZIdBSGv41s",
      },
      {
        name: "Akhil Anil Kumar",
        image: "akhil-anil.jpg",
        video: "https://youtu.be/gsiVjIK8Nj4",
      },
      {
        name: "Ashwin Menon",
        image: "ashwin-menon.jpg",
        video: "https://youtu.be/kxskbIBz5qM",
      },
      {
        name: "Abhijit Parab",
        role: "Ernst & Young LLP - Director| Advisory Services – Cyber security",
        quote:
          "I would say a 360 degree impact was made in my career for the 2 years spend in WeSchool. It opened different business dimensions which I would have never got been an Engineering graduate. I was fortunate to get the best of the faculties during my stint in WeSchool, which are still connected and guide me if I need any support. To sum up the E-biz course I took- it’s combined with the technology advancement & MBA specializations while giving us flavors of upcoming trends in traditional business management topics.",
        image: "placeholder.png",
      },
      {
        name: "Amruta Joshi",
        role: "Galaxy Coating Industry - Entrepreneur",
        quote:
          "My first step at Welingkar, made me realize the world of opportunities that lay in front of me. As I climbed the stairs on the first day, I could feel myself getting absorbed into the world of WE. Just a fresher completing my BTech but with no previous work experience in my stride, I had taken to pursuing Management but had no clue that this place actually creates an environment which simulates the actual outside corporate world.",
        image: "placeholder.png",
      },
      {
        name: "Chaitali Chande",
        role: "Factset Research Systems",
        quote:
          "I worked with J.P.Morgan Chase for a year before I joined WeSchool. While working as a part of the Asset Management backend support team, it made me realize that the only way to climb up the corporate ladder was to study further and move to a front end role. Hence, my decision to pursue my masters. WeSchool has played an instrumental role in connecting me to experienced and helpful faculty and at the same time giving me an opportunity to network with the budding leaders of today’s industry. The course has a very good batch mix with students from diverse backgrounds, which truly enhances the learning experience. It is well structured with enough time to study as well as network not only with batch mates but also with industry professionals. The college has a very well structured placement program through which I got placed at Factset Research Systems. I have been working here for more than six years, and currently hold the position of a Manager of the India Client Consulting team.",
        image: "placeholder.png",
      },
      {
        name: "Harikaran Ramakrishnan",
        role: "Head of Digital Business",
        quote:
          "The foundation for all the many achievements and accolades started at Welingkar in 2003. I still remember all the lessons I learnt at welingkar right from the 1st foundation fortnight where we had people like Jaydev Hattangadi teaching us how to act, or Mr. Barve training us on team work and coordination and later Dr. Uday Salunkhe himself taking us on an outbound trip to Karjat for management games. Games that started etching in our head importance of researching, planning, execution, coordination, team work and more. These were ofcourse just some impressions of the fortnight, but I can talk for hours about it.",
        image: "placeholder.png",
      },
      {
        name: "Jayesh Deshmukh",
        role: "Axis Bank - Business Analyst",
        quote:
          "\"Experience Jayesh Deshmukh's transformation at WeSchool, where he gained a unique edge through the development of his analytical mindset. Learn how WeSchool's teachings have influenced Jayesh's business strategies and professional success. \"",
        image: "16.png",
        video: "https://www.youtube.com/watch?v=ErUT0H8XbWQ",
      },
      {
        name: "Karan Janak Bavishi",
        role: "Credit Suisse - Brokerage, Clearing and Exchanges Efficiency team",
        quote:
          "My motive to join an MBA program was to bridge the gap between what I had studied at my graduation course and how to apply the knowledge acquired by working to further enhance my career. I got a chance to opt for an exchange program to Denmark at the renowned Copenhagen Business School. The experience not only makes you learn about global cultures but also make friends for a lifetime. Through the various inter- collegiate management competitions WeSchool supports, I have won second and third place at the annual Draft FCB Ulka competition. The faculties are extremely good and don't restrict the curriculum to the text book but also give real life examples to drive home the point.",
        image: "placeholder.png",
      },
      {
        name: "Minal Dhondge",
        role: "Aditya Birla Group - Leadership Associate",
        quote:
          "The 2 years in MMS have been an enriching experience for me. WeSchool provided me the opportunity to interact esteemed faculties and diverse peer set. During my tenure here, I got the opportunity to co-author a research paper on ‘Apprenticeship in India and world wide’ with an HR faculty. Lectures by visiting faculties from the Industry acquainted me with the contemporary industry practices. Outbound programs conducted by college imbibed teamwork and leadership qualities in me.",
        image: "placeholder.png",
      },
    ],
  },
  {
    id: "corporate",
    label: "Corporate",
    items: [
      {
        name: "Mr. Srinivas K S",
        role: "Biocon - Associate Director & Head Learning and Development",
        quote:
          "Our business managers, till today cherish their learnings from WeSchool.",
        image: "hqdefault-1.jpg",
        video: "https://youtu.be/Fp3qbuYIdgw",
      },
      {
        name: "Ms N Rama",
        role: "Elcita - CEO",
        quote:
          "The amount of interest and care the faculty takes for its students, is phenomenal.",
        image: "n-rama.jpg",
        video: "https://youtu.be/6XN_wYTy5ig",
      },
      {
        name: "Mr. Krish Shankar",
        role: "Infosys - Group Head Human Resource",
        quote:
          "I've found WeSchool students to be passionate, aware and overall have a great sense of curiosity.",
        image: "krish-shankar.jpg",
        video: "https://youtu.be/sNREffAd4OE",
      },
      {
        name: "Ms. Vidya Bai J",
        role: "Quess - DGM Learning & Development",
        quote:
          "Their ability to pick up work, learn and deliver at a great pace - that's a quality we appreciate.",
        image: "maxresdefault.jpg",
        video: "https://youtu.be/tXhGfejrBdE",
      },
      {
        name: "Mr. Shailesh Gaurav",
        role: "Syngene International AGM - HR",
        quote:
          "Apart from the theoretical knowledge, the exposure the students get at WeSchool is very different from other b-schools.",
        image: "shailesh-gaurav.jpg",
        video: "https://youtu.be/TDnwNs5f18s",
      },
    ],
  },
];

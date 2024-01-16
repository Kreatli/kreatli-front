import { Accordion, AccordionItem } from '@nextui-org/react';
import React from 'react';

const faqItems = [
  {
    question: 'How do I join Kreatli?',
    answer: 'Joining Kreatli is easy. Simply sign up as a YouTube creator or a professional, complete your profile, and start exploring opportunities or talent.',
  },
  {
    question: 'How are professionals verified on Kreatli?',
    answer: 'We prioritize the credibility and expertise of professionals on Kreatli. Our verification process involves a thorough review of each professional\'s qualifications and work samples. When creating a profile, professionals provide detailed information about their skills, work experience, and portfolios. Our team then carefully assesses this information to ensure that it aligns with the standards of our platform. This verification process helps maintain a community of skilled and reliable professionals, enhancing the quality of collaborations between creators and professionals.',
  },
  {
    question: 'Do I have to pay in order to apply for a job or find a professional?',
    answer: 'No, Kreatli is absolutely free of charge. Our platform allows you to explore job opportunities and connect with professionals without any upfront fees. That is why there is a Tier System in place that allows everyone to compete under the same fair circumstances. However, for those who want to accelerate the progress, we do offer a premium subscription and point purchase options. They unlock additional opportunities and enhance access to our platform\'s features.',
  },
  {
    question: 'Can I find job opportunities as a professional on Kreatli?',
    answer: 'Absolutely. Kreatli offers professionals a wide range of job opportunities posted by YouTube creators. Whether you\'re a video editor, thumbnail designer, scriptwriter, etc. you can find projects that match your skills.',
  },
  {
    question: 'How can I collaborate with a YouTube creator on Kreatli?',
    answer: 'It\'s simple. As a professional, you can apply for job postings that align with your expertise. If a creator is interested, they\'ll initiate a collaboration, and you can discuss project details and terms.',
  },
  {
    question: 'What benefits does the Tier System offer?',
    answer: 'The Kreatli Tier System is designed to enhance user engagement, recognize contributions, and provide rewards within the Kreatli community. Users can progress through different tiers by completing various tasks and achieving milestones, unlocking exclusive benefits, and gaining recognition.',
  },
  {
    question: 'Can I purchase points on Kreatli?',
    answer: 'Yes, you can buy points to boost your profile\'s visibility, increase your earning potential, and access more advanced features. Points can be used strategically to maximize your impact on the platform.',
  },
  {
    question: 'Is my personal information safe on Kreatli?',
    answer: 'Absolutely. We prioritize the security and privacy of our users. Your personal information is kept confidential and is only used for platform-related interactions.',
  },
  {
    question: 'What is Kreatli Premium?',
    answer: 'Kreatli Premium is a subscription that enhances your Kreatli experience. It offers increased daily point limits, point multipliers, and access to premium tiers, empowering you to make the most out of your collaboration journey.',
  },
];

export const Faq = () => {
  return (
    <div className="w-full text-left">
      <Accordion>
        {faqItems.map(({ question, answer }) => (
          <AccordionItem key={question} title={question} aria-label={question}>
            <span className="text-foreground-500">{answer}</span>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

import { Accordion, AccordionItem } from '@nextui-org/react';
import React from 'react';

const faqItems = [
  {
    question: 'How do I join Kreatli?',
    answer: 'Joining Kreatli is easy. Simply sign up as a creator or a clipper, complete your profile, and start exploring clipping campaigns or offering your clipping services.',
  },
  {
    question: 'How are clippers verified on Kreatli?',
    answer: 'We prioritize the credibility and expertise of clippers on Kreatli. Our verification process involves a thorough review of each clipper\'s qualifications, clip portfolio, and work samples. When creating a profile, clippers provide detailed information about their editing skills, experience with video clip creation, and portfolios showcasing their best work. Our team then carefully assesses this information to ensure that it aligns with the standards of our platform. This verification process helps maintain a community of skilled and reliable clippers, enhancing the quality of clipping services for creators.',
  },
  {
    question: 'Do I have to pay in order to post a clipping campaign or find a clipper?',
    answer: 'No, Kreatli is absolutely free of charge. Our platform allows you to post clipping campaigns, browse clipper services, and connect with clippers without any upfront fees. That is why there is a Tier System in place that allows everyone to compete under the same fair circumstances. However, for those who want to accelerate the progress, we do offer a premium subscription and point purchase options. They unlock additional opportunities and enhance access to our platform\'s features.',
  },
  {
    question: 'Can I find clipping campaigns as a clipper on Kreatli?',
    answer: 'Absolutely. Kreatli offers clippers two ways to find work: (1) Browse and apply to clipping campaigns posted by creators, or (2) Proactively offer your clipping services through service listings (similar to Upwork). This dual marketplace model gives you flexibility to find projects that match your skills and availability.',
  },
  {
    question: 'How can I work with creators on Kreatli?',
    answer: 'It\'s simple. As a clipper, you can either apply to clipping campaigns that align with your expertise, or create service listings to proactively offer your clipping services to creators. If a creator is interested, they\'ll initiate a collaboration, and you can discuss project details, clip requirements, and terms.',
  },
  {
    question: 'What benefits does the Tier System offer?',
    answer: 'The Kreatli Tier System is designed to enhance user engagement, recognize contributions, and provide rewards within the clipping marketplace. Users can progress through different tiers by completing various tasks, achieving milestones in clipping projects, and maintaining quality work. Unlock exclusive benefits and gain recognition in the clipper community.',
  },
  {
    question: 'Can I purchase points on Kreatli?',
    answer: 'Yes, you can buy points to boost your profile\'s visibility in the clipping marketplace, increase your earning potential, and access more advanced features. Points can be used strategically to maximize your impact on the platform and stand out to creators looking for clippers.',
  },
  {
    question: 'Is my personal information safe on Kreatli?',
    answer: 'Absolutely. We prioritize the security and privacy of our users. Your personal information is kept confidential and is only used for platform-related interactions within the clipping marketplace.',
  },
  {
    question: 'What is Kreatli Premium?',
    answer: 'Kreatli Premium is a subscription that enhances your Kreatli experience in the clipping marketplace. It offers increased daily point limits, point multipliers, and access to premium tiers, empowering you to make the most out of your clipping journey and connect with more creators.',
  },
];

export const Faq = () => {
  return (
    <div className="w-full text-left">
      <Accordion>
        {faqItems.map(({ question, answer }) => (
          <AccordionItem
            key={question}
            title={question}
            aria-label={question}
          >
            <span className="text-foreground-500">{answer}</span>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

import { GetServerSideProps } from "next";

const siteUrl = "https://kreatli.com";

const buildRobots = () => `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const robots = buildRobots();

  res.setHeader("Content-Type", "text/plain");
  res.write(robots);
  res.end();

  return {
    props: {},
  };
};

const Robots = () => null;

export default Robots;

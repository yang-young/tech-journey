import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';

type FeatureItem = {
  title: string;
  imageUrl: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Technical',
    imageUrl: 'img/technical.svg',
    description: (
      <>
        Documenting my technical journey with a relentless pursuit of excellence, exploring innovative solutions, and striving for mastery in development.
      </>
    ),
  },
  {
    title: 'Life',
    imageUrl: 'img/life.svg',
    description: (
      <>
        Reflections on living with intention, embracing challenges, and cultivating a meaningful and balanced life.
      </>
    ),
  },
  {
    title: 'Learn',
    imageUrl: 'img/learn.svg',
    description: (
      <>
        Chronicling my learning path with curiosity and dedication, eager to expand knowledge and share valuable insights.
      </>
    ),
  },
  // {
  //   title: 'Game',
  //   imageUrl: 'img/undraw_docusaurus_react.svg',
  //   description: (
  //     <>
  //       Extend or customize your website layout by reusing React. Docusaurus can
  //       be extended while reusing the same header and footer.
  //     </>
  //   ),
  // },
];

function Feature({title, imageUrl, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        {/* <Svg className={styles.featureSvg} role="img" /> */}

          <div className="text--center margin-bottom--lg">
            <img width={250}
              className={styles.featureImage}
              src={useBaseUrl(imageUrl)}
              alt={title}
            />
          </div>
                    
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

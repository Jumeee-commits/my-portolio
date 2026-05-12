import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { GitHub, Public, ArrowBack } from '@mui/icons-material';
import { useFetch } from '../../hooks/useFetch';

const styles = {
  container: {
    maxWidth: '1000px',
    margin: '80px auto',
    padding: '0 20px',
    fontFamily: "'Poppins', sans-serif",
  },
  backLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    color: 'var(--primaryColor)',
    textDecoration: 'none',
    marginBottom: '30px',
    fontWeight: '500',
    transition: '0.3s',
  },
  header: {
    marginBottom: '40px',
  },
  title: {
    fontSize: '2.5rem',
    color: 'var(--white)',
    marginBottom: '10px',
  },
  category: {
    color: 'var(--primaryColor)',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    fontSize: '0.9rem',
    fontWeight: '600',
  },
  mainContent: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '50px',
    alignItems: 'start',
  },
  imageBox: {
    width: '100%',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
  },
  image: {
    width: '100%',
    display: 'block',
  },
  detailsBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '25px',
  },
  description: {
    fontSize: '1.1rem',
    lineHeight: '1.8',
    color: 'var(--sliver)',
  },
  sectionTitle: {
    color: 'var(--white)',
    fontSize: '1.3rem',
    fontWeight: '600',
    marginBottom: '10px',
    borderLeft: '4px solid var(--primaryColor)',
    paddingLeft: '15px',
  },
  techStack: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
  },
  techTag: {
    background: 'var(--primaryBackground)',
    color: 'var(--primaryColor)',
    padding: '6px 16px',
    borderRadius: '50px',
    fontSize: '0.85rem',
    fontWeight: '500',
    border: '1px solid rgba(224,168,13,0.2)',
  },
  actions: {
    display: 'flex',
    gap: '20px',
    marginTop: '20px',
  },
  button: {
    padding: '12px 25px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    textDecoration: 'none',
    fontWeight: '600',
    transition: '0.3s',
  },
  primaryButton: {
    background: 'var(--primaryColor)',
    color: 'var(--black)',
  },
  secondaryButton: {
    border: '2px solid var(--primaryColor)',
    color: 'var(--primaryColor)',
  },
  '@media (max-width: 768px)': {
    mainContent: {
      gridTemplateColumns: '1fr',
    },
    title: {
      fontSize: '2rem',
    },
  }
};

export const PortfolioDetail = () => {
  const { id } = useParams();
  // We need to fetch a single item. We'll use useFetch but we need it to handle single items or 
  // just use the list and find it. For now, let's assume we can fetch by id.
  const { data: project, loading } = useFetch(`/api/portfolio/${id}`);

  if (loading) return <div style={{ textAlign: 'center', padding: '100px', color: '#fff' }}>Loading Project Details...</div>;
  if (!project || project.length === 0) return <div style={{ textAlign: 'center', padding: '100px', color: '#fff' }}>Project not found.</div>;

  const item = Array.isArray(project) ? project[0] : project;

  return (
    <div style={styles.container}>
      <Link to="/portfolio" style={styles.backLink}>
        <ArrowBack fontSize="small" /> Back to Portfolio
      </Link>

      <div style={styles.header}>
        <span style={styles.category}>{item.category}</span>
        <h1 style={styles.title}>{item.title}</h1>
      </div>

      <div style={styles.mainContent}>
        <div style={styles.imageBox}>
          <img src={item.cover} alt={item.title} style={styles.image} />
        </div>

        <div style={styles.detailsBox}>
          <div>
            <h2 style={styles.sectionTitle}>Overview</h2>
            <p style={styles.description}>
              {item.description || "No description provided for this project yet. Stay tuned for more details about the implementation and challenges faced during development."}
            </p>
          </div>

          {item.techStack && (
            <div>
              <h2 style={styles.sectionTitle}>Technologies</h2>
              <div style={styles.techStack}>
                {item.techStack.split(',').map((tech, index) => (
                  <span key={index} style={styles.techTag}>{tech.trim()}</span>
                ))}
              </div>
            </div>
          )}

          <div style={styles.actions}>
            {item.webLink && (
              <a href={item.webLink} target="_blank" rel="noreferrer" style={{...styles.button, ...styles.primaryButton}}>
                <Public /> Live Demo
              </a>
            )}
            {item.githubLink && (
              <a href={item.githubLink} target="_blank" rel="noreferrer" style={{...styles.button, ...styles.secondaryButton}}>
                <GitHub /> GitHub Repo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

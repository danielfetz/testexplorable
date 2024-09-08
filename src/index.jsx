import React, { useState, useCallback, useEffect, useRef } from 'react';

const DiagonalTransition = ({ isTransitioning, onTransitionEnd }) => {
  const transitionStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to bottom right, transparent 50%, #ffffff 50%)',
    backgroundSize: '250% 250%',
    backgroundPosition: isTransitioning ? '100% 100%' : '0 0',
    transition: 'background-position 0.5s ease-in-out',
    pointerEvents: 'none',
    zIndex: 1000,
    opacity: isTransitioning ? 1 : 0,
  };

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(onTransitionEnd, 500);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning, onTransitionEnd]);

  return <div style={transitionStyle} />;
};

const NavigationBar = ({ currentStage, onNavigate, isMusicPlaying, toggleMusic }) => {
  const stages = ['intro', 'scenario', 'matrix'];
  
  const navStyle = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fffaf0',
    padding: '10px',
    borderTop: '2px solid #4a4a4a',
    zIndex: 1001,
  };

  const pointStyle = (stage) => ({
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: stage === currentStage ? '#4a4a4a' : '#d3d3d3',
    margin: '0 10px',
    cursor: 'pointer',
  });

  const musicButtonStyle = {
    position: 'absolute',
    left: '20px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '24px',
  };

  return (
    <div style={navStyle}>
      <button onClick={toggleMusic} style={musicButtonStyle}>
        {isMusicPlaying ? '⏸' : '▶️'}
      </button>
      {stages.map((stage, index) => (
        <div
          key={stage}
          style={pointStyle(stage)}
          onClick={() => onNavigate(stage)}
        />
      ))}
    </div>
  );
};

const InteractiveExplanation = () => {
  const [stage, setStage] = useState('intro');
  const [choice, setChoice] = useState(null);
  const [endEconomicRelationship, setEndEconomicRelationship] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextStage, setNextStage] = useState(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef(null);

  const payoffs = {
    germany: {
      dontInvade: endEconomicRelationship ? -50 : 0,
      invade: endEconomicRelationship ? 0 : -50,
    },
    switzerland: {
      dontInvade: endEconomicRelationship ? -50 : 0,
      invade: -100,
    },
  };

  const handleStageChange = useCallback((newStage) => {
    if (isTransitioning || newStage === stage) return;
    setIsTransitioning(true);
    setNextStage(newStage);
  }, [isTransitioning, stage]);

  const handleTransitionEnd = useCallback(() => {
    setStage(nextStage);
    setIsTransitioning(false);
    setNextStage(null);
  }, [nextStage]);

  const toggleMusic = useCallback(() => {
    if (isMusicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsMusicPlaying(!isMusicPlaying);
  }, [isMusicPlaying]);

  useEffect(() => {
    audioRef.current = new Audio('https://github.com/ncase/trust/raw/gh-pages/assets/sounds/bg_music.mp3');
    audioRef.current.loop = true;
    return () => {
      audioRef.current.pause();
      audioRef.current = null;
    };
  }, []);

  const containerStyle = {
    fontFamily: '"Comic Sans MS", cursive, sans-serif',
    padding: '2rem',
    paddingBottom: '4rem',
    maxWidth: '800px',
    margin: '0 auto',
    marginBottom: '40px',
    backgroundColor: '#fffaf0',
    borderRadius: '15px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    position: 'relative',
    zIndex: 1,
  };

  const titleStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    textAlign: 'center',
    color: '#4a4a4a',
    textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
  };

  const textStyle = {
    fontSize: '1.1rem',
    lineHeight: '1.6',
    marginBottom: '1rem',
    textAlign: 'left',
  };

  const buttonStyle = {
    fontSize: '1.2rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#4a4a4a',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'block',
    margin: '1rem auto',
    fontFamily: 'inherit',
    width: '80%',
    maxWidth: '400px',
    textAlign: 'center',
  };

  const checkboxContainerStyle = {
    marginBottom: '1.5rem',
    fontSize: '1.2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const checkboxStyle = {
    marginRight: '0.5rem',
    width: '20px',
    height: '20px',
  };

  const tableStyle = {
    borderCollapse: 'separate',
    borderSpacing: '0',
    width: '100%',
    fontSize: '1.2rem',
  };

  const cellStyle = {
    border: '2px solid #4a4a4a',
    padding: '1rem',
    textAlign: 'center',
    position: 'relative',
    backgroundColor: '#fff',
  };

  const headerCellStyle = {
    ...cellStyle,
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
  };

  const leftHeaderCellStyle = {
    ...headerCellStyle,
    textAlign: 'left',
  };

  const sketchBorder = {
    position: 'absolute',
    top: '-5px',
    left: '-5px',
    right: '-5px',
    bottom: '-5px',
    border: '2px solid #4a4a4a',
    borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px',
    pointerEvents: 'none',
  };

  const renderIntro = () => (
    <>
      <p style={textStyle}>
        During World War II, Switzerland remained untouched while war ravaged throughout the European continent.
      </p>
      <p style={textStyle}>
        Sure, Switzerland was useful for Nazi Germany as purchaser of gold, and as a hiding place for stolen artworks and jewellery.
      </p>
      <p style={textStyle}>
        But Switzerland purchased even larger quantities of gold from Allied powers, and from 1942 onwards was home to a US intelligence agency base. Therefore one has to wonder why Nazi Germany never followed through with its countless plans to invade Switzerland when they still realistically could before being embattled to such an extent that they couldn't spare any troops.
      </p>
      <p style={textStyle}>
        So how did Switzerland, a country so despised by Hitler, because it had all the characters he so hated: decentralized political power, no great leader fetish - how did it manage to not get invaded?
      </p>
      <p style={textStyle}>
        It can be explained by a combination of military/economic deterrence, economic concessions to Germany and good fortune as larger events during the war delayed an invasion. But <em>deterrence</em> is what interests us today. So, to understand all of this...
      </p>
      <button style={buttonStyle} onClick={() => handleStageChange('scenario')}>
        Next
      </button>
    </>
  );

  const renderScenario = () => (
    <>
      <p style={textStyle}>
        It's 1939. Germany starts its invasion of Poland.
        What would you do as Switzerland if your goal is keeping 
        your neutral status and not get involved in the war?
      </p>
      <button style={buttonStyle} onClick={() => { setChoice(1); handleStageChange('matrix'); }}>
        1. Mobilize troops and stop trade
      </button>
      <button style={buttonStyle} onClick={() => { setChoice(2); handleStageChange('matrix'); }}>
        2. Not mobilize troops and stop trade
      </button>
      <button style={buttonStyle} onClick={() => { setChoice(3); handleStageChange('matrix'); }}>
        3. Mobilize troops and continue trade
      </button>
      <button style={buttonStyle} onClick={() => { setChoice(4); handleStageChange('matrix'); }}>
        4. Not mobilize troops and continue trade
      </button>
    </>
  );

  const renderMatrix = () => (
    <>
      <div style={checkboxContainerStyle}>
        <label>
          <input
            type="checkbox"
            checked={endEconomicRelationship}
            onChange={(e) => setEndEconomicRelationship(e.target.checked)}
            style={checkboxStyle}
          />
          Switzerland ends economic relationship
        </label>
      </div>
      
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={headerCellStyle}><div style={sketchBorder}></div></th>
            <th style={headerCellStyle}><div style={sketchBorder}></div>Don't Invade</th>
            <th style={headerCellStyle}><div style={sketchBorder}></div>Invade</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th style={leftHeaderCellStyle}><div style={sketchBorder}></div>Germany</th>
            <td style={cellStyle}><div style={sketchBorder}></div>{payoffs.germany.dontInvade}</td>
            <td style={cellStyle}><div style={sketchBorder}></div>{payoffs.germany.invade}</td>
          </tr>
          <tr>
            <th style={leftHeaderCellStyle}><div style={sketchBorder}></div>Switzerland</th>
            <td style={cellStyle}><div style={sketchBorder}></div>{payoffs.switzerland.dontInvade}</td>
            <td style={cellStyle}><div style={sketchBorder}></div>{payoffs.switzerland.invade}</td>
          </tr>
        </tbody>
      </table>
    </>
  );

  return (
    <>
      <div style={containerStyle}>
        <h2 style={titleStyle}>Switzerland in World War II</h2>
        {stage === 'intro' && renderIntro()}
        {stage === 'scenario' && renderScenario()}
        {stage === 'matrix' && renderMatrix()}
      </div>
      <NavigationBar 
        currentStage={stage} 
        onNavigate={handleStageChange}
        isMusicPlaying={isMusicPlaying}
        toggleMusic={toggleMusic}
      />
      <DiagonalTransition isTransitioning={isTransitioning} onTransitionEnd={handleTransitionEnd} />
    </>
  );
};

export default InteractiveExplanation;

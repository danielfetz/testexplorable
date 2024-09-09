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

const SwitzerlandMap = ({ stopBanking }) => (
  <svg viewBox="0 0 100 100" style={{ width: '100%', maxWidth: '400px', margin: '0 auto', display: 'block' }}>
    <path
      d="M22.5,37.5 C22.5,37.5 20,35 17.5,35 C15,35 12.5,37.5 10,37.5 C7.5,37.5 7.5,35 7.5,32.5 C7.5,30 10,27.5 12.5,25 C15,22.5 17.5,22.5 20,20 C22.5,17.5 25,15 27.5,15 C30,15 32.5,17.5 35,17.5 C37.5,17.5 40,15 42.5,15 C45,15 47.5,17.5 50,17.5 C52.5,17.5 55,15 57.5,15 C60,15 62.5,17.5 65,17.5 C67.5,17.5 70,15 72.5,15 C75,15 77.5,17.5 80,20 C82.5,22.5 85,25 87.5,27.5 C90,30 92.5,32.5 92.5,35 C92.5,37.5 90,40 87.5,42.5 C85,45 82.5,47.5 80,50 C77.5,52.5 75,55 72.5,57.5 C70,60 67.5,62.5 65,65 C62.5,67.5 60,70 57.5,72.5 C55,75 52.5,77.5 50,80 C47.5,82.5 45,85 42.5,85 C40,85 37.5,82.5 35,82.5 C32.5,82.5 30,85 27.5,85 C25,85 22.5,82.5 20,80 C17.5,77.5 15,75 12.5,72.5 C10,70 7.5,67.5 7.5,65 C7.5,62.5 10,60 12.5,57.5 C15,55 17.5,52.5 20,50 C22.5,47.5 25,45 25,42.5 C25,40 22.5,37.5 22.5,37.5 Z"
      fill="#fffaf0"
      stroke="#4a4a4a"
      strokeWidth="1"
    />
    {!stopBanking && (
      <g>
        <text x="50" y="50" fontSize="8" textAnchor="middle">
          <tspan x="50" dy="0">💰</tspan>
          <animateMotion
            path="M20,50 H80"
            dur="2s"
            repeatCount="indefinite"
          />
        </text>
        <text x="50" y="50" fontSize="8" textAnchor="middle">
          <tspan x="50" dy="0">💵</tspan>
          <animateMotion
            path="M80,50 H20"
            dur="2s"
            repeatCount="indefinite"
          />
        </text>
      </g>
    )}
  </svg>
);

const ActionButton = ({ onClick, children, isActive, isLarge }) => (
  <button
    onClick={onClick}
    style={{
      fontSize: isLarge ? '1.2rem' : '1rem',
      padding: '0.5rem 1rem',
      backgroundColor: isActive ? '#4a4a4a' : 'white',
      color: isActive ? 'white' : '#4a4a4a',
      border: '2px solid #4a4a4a',
      borderRadius: '5px',
      cursor: 'pointer',
      margin: '0.5rem',
      fontFamily: 'inherit',
      transition: 'all 0.3s ease',
      boxShadow: isActive ? '0 0 10px rgba(0,0,0,0.5)' : 'none',
      width: '100%',
      textAlign: 'left',
    }}
  >
    {children}
  </button>
);

const InteractiveExplanation = () => {
  const [stage, setStage] = useState('intro');
  const [choice, setChoice] = useState(null);
  const [endEconomicRelationship, setEndEconomicRelationship] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextStage, setNextStage] = useState(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef(null);

  const [stopBanking, setStopBanking] = useState(false);
  const [stopTrade, setStopTrade] = useState(false);
  const [mobilizeTroops, setMobilizeTroops] = useState(false);

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

  const handleContinue = () => {
    let choice;
    if (mobilizeTroops && (stopBanking || stopTrade)) {
      choice = 1; // Mobilize troops and stop trade
    } else if (!mobilizeTroops && (stopBanking || stopTrade)) {
      choice = 2; // Not mobilize troops and stop trade
    } else if (mobilizeTroops && !stopBanking && !stopTrade) {
      choice = 3; // Mobilize troops and continue trade
    } else {
      choice = 4; // Not mobilize troops and continue trade
    }
    setChoice(choice);
    handleStageChange('matrix');
  };

  const pageStyle = {
    fontFamily: '"Comic Sans MS", cursive, sans-serif',
    backgroundColor: '#fffaf0',
    minHeight: '100vh',
    padding: '2rem',
    paddingBottom: '4rem',
  };

  const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    marginBottom: '40px',
    position: 'relative',
    zIndex: 1,
  };

  const titleStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    textAlign: 'center',
    color: '#4a4a4a',
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
    <div style={{ textAlign: 'center' }}>
      <p style={textStyle}>
        It's 1939. Germany starts its invasion of Poland.
        What would you do as Switzerland if your goal is keeping 
        your neutral status and not get involved in the war?
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
        <div style={{ width: '40%', marginRight: '2rem' }}>
          <ActionButton onClick={() => setStopBanking(!stopBanking)} isActive={stopBanking}>
            Stop banking and financial transactions
          </ActionButton>
          <ActionButton onClick={() => setStopTrade(!stopTrade)} isActive={stopTrade}>
            Stop cross-border trade
          </ActionButton>
          <ActionButton onClick={() => setMobilizeTroops(!mobilizeTroops)} isActive={mobilizeTroops} isLarge>
            Mobilize troops
          </ActionButton>
        </div>
        <div style={{ width: '60%' }}>
          <SwitzerlandMap stopBanking={stopBanking} />
        </div>
      </div>
      <button style={{...buttonStyle, marginTop: '2rem'}} onClick={handleContinue}>
        Continue
      </button>
    </div>
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
    <div style={pageStyle}>
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
    </div>
  );
};

export default InteractiveExplanation;
